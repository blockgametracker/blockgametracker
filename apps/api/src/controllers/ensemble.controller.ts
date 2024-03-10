import { Controller, Get, Param } from "@nestjs/common"
import { PrometheusService } from "src/services/prometheus.service"
import type { ServerName } from "types/prometheus"

/** Ensembles data from multiple servers into a single endpoint. */
@Controller("ensemble")
export class EnsembleController {
    constructor(private readonly prometheusService: PrometheusService) {}

    /** Returns a cumulative total number of players on a given edition. */
    @Get(":edition/total")
    async getTotal(@Param("edition") edition: string) {
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
    async getBreakdown(@Param("edition") edition: string) {
        const query = `avg by(server_name, server_edition) (sum by(server_name, pod) (minecraft_status_players_online_count{server_edition="${edition}"})[5m])`
        const res = await this.prometheusService.query<ServerName>(query)

        return {
            data: res.data.result.map((result) => {
                return {
                    server_name: result.metric.server_name,
                    data: {
                        x: result.value[0],
                        y: Number.parseInt(result.value[1]),
                    },
                }
            }),
        }
    }

    /** Returns a breakdown of the number of players on each registered server for a given edition within a timeframe. */
    @Get(":edition/breakdown/:start/:step")
    async getBreakdownRange(
        @Param("edition") edition: string,
        @Param("start") start: string,
        @Param("step") step: string,
    ) {
        const query = `avg by(server_name, server_edition) (sum by(server_name, pod) (minecraft_status_players_online_count{server_edition="${edition}"}))`
        const res = await this.prometheusService.queryRange<ServerName>(
            query,
            start,
            step,
        )

        return {
            data: res.data.result.map((result) => {
                return {
                    server_name: result.metric.server_name,
                    data: result.values.map((value) => {
                        return {
                            x: value[0].toFixed(0),
                            y: Number.parseInt(value[1]),
                        }
                    }),
                }
            }),
        }
    }
}
