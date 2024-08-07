import { Controller, Get, Param } from "@nestjs/common"
import type {
    ApiQueryResponse,
    ApiServerQueryRangeResponse,
    ApiServerQueryResponse,
    MinecraftEdition,
    ServerIdentifier,
} from "@repo/gateway"
import { PrometheusService } from "src/services/prometheus.service"

/** Ensembles data from multiple servers into a single endpoint. */
@Controller("ensemble")
export class EnsembleController {
    constructor(private readonly prometheusService: PrometheusService) {}

    /** Returns a cumulative total number of players on a given edition. */
    @Get(":edition/total")
    async getTotal(
        @Param("edition") edition: MinecraftEdition,
    ): Promise<ApiQueryResponse> {
        const query = `max by (server_edition) (sum by(pod) (minecraft_status_players_online_count{server_edition="${edition}"}))`
        const res = await this.prometheusService.query(query)
        const result = res.data.result[0]

        return {
            data: {
                x: result.value[0],
                y: Number.parseInt(result.value[1]),
            },
        }
    }

    /** Returns a breakdown of the number of players on each registered server for a given edition. */
    @Get(":edition/breakdown")
    async getBreakdown(
        @Param("edition") edition: MinecraftEdition,
    ): Promise<ApiServerQueryResponse> {
        const query = `avg by(server_slug, server_edition) (sum by(server_slug, pod) (minecraft_status_players_online_count{server_edition="${edition}"})[5m])`
        const res = await this.prometheusService.query<ServerIdentifier>(query)

        return {
            data: res.data.result.map((result) => {
                return {
                    server_slug: result.metric.server_slug,
                    data: {
                        x: result.value[0],
                        y: Number.parseInt(result.value[1]),
                    },
                }
            }),
        }
    }

    /** Returns a breakdown of the number of players on each registered server for a given edition within a timeframe. */
    @Get(":edition/breakdown/:start/:step/:end")
    async getBreakdownRange(
        @Param("edition") edition: MinecraftEdition,
        @Param("start") start: string,
        @Param("step") step: string,
        @Param("end") end: string,
    ): Promise<ApiServerQueryRangeResponse> {
        const query = `avg by(server_slug, server_edition) (sum by(server_slug, pod) (minecraft_status_players_online_count{server_edition="${edition}"}))`
        const res = await this.prometheusService.queryRange<ServerIdentifier>(
            query,
            start,
            step,
            end,
        )

        return {
            data: res.data.result.map((result) => {
                return {
                    server_slug: result.metric.server_slug,
                    data: result.values.map((value) => {
                        return {
                            x: Number.parseInt(value[0].toFixed(0)),
                            y: Number.parseInt(value[1]),
                        }
                    }),
                }
            }),
        }
    }
}
