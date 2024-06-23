import { Controller, Get, Param } from "@nestjs/common"
import type {
    AS,
    ApiASQueryRangeResponse,
    ApiASQueryResponse,
} from "@repo/gateway"
import { PrometheusService } from "src/services/prometheus.service"

/** Ensembles data for each Autonomous System (AS). */
@Controller("as")
export class ASController {
    constructor(private readonly prometheusService: PrometheusService) {}

    /** Returns the number of players using each AS for the given edition. */
    @Get("breakdown/:edition")
    async getBreakdown(
        @Param("edition") edition: string,
    ): Promise<ApiASQueryResponse> {
        const query = `max by(as_name, as_number, server_edition) (sum by(as_name, as_number, pod) (minecraft_status_players_online_count{server_edition="${edition}"}))`
        const res = await this.prometheusService.query<AS>(query)

        return {
            data: res.data.result.map((result) => {
                return {
                    name: result.metric.as_name,
                    number: result.metric.as_number,
                    data: {
                        x: result.value[0],
                        y: Number.parseInt(result.value[1]),
                    },
                }
            }),
        }
    }

    /** Returns the number of players using each AS for the given edition over the given timeframe. */
    @Get("breakdown/:edition/:start/:step")
    async getBreakdownRange(
        @Param("edition") edition: string,
        @Param("start") start: string,
        @Param("step") step: string,
    ): Promise<ApiASQueryRangeResponse> {
        const query = `max by(as_name, as_number, server_edition) (sum by(as_name, as_number, pod) (minecraft_status_players_online_count{server_edition="${edition}"}))`
        const res = await this.prometheusService.queryRange<AS>(
            query,
            start,
            step,
        )

        return {
            data: res.data.result.map((result) => {
                return {
                    name: result.metric.as_name,
                    number: result.metric.as_number,
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
