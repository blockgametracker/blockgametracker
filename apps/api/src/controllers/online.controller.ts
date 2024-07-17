import { Controller, Get, Param } from "@nestjs/common"
import { PrometheusService } from "../services/prometheus.service"
import type {
    ApiQueryRangeResponse,
    ApiQueryResponse,
    MinecraftEdition,
} from "@repo/gateway"

/** Handles requests targeted at specific servers. */
@Controller("online")
export class OnlineController {
    constructor(private readonly prometheusService: PrometheusService) {}

    /** Returns the number of players on a given server-edition pair right now. */
    @Get(":server/:edition")
    async getOnlineServer(
        @Param("server") server: string,
        @Param("edition") edition: MinecraftEdition,
    ): Promise<ApiQueryResponse> {
        const query = `min(sum by(pod) (minecraft_status_players_online_count{server_slug="${server}", server_edition="${edition}"}))`
        const res = await this.prometheusService.query(query)
        const result = res.data.result[0]

        return {
            data: {
                x: Number.parseInt(result.value[0].toFixed(0)),
                y: Number.parseInt(result.value[1]),
            },
        }
    }

    /** Returns the number of players on a given server-edition pair over a provided timeframe. */
    @Get(":server/:edition/:start/:step/:end")
    async getOnlineServerRange(
        @Param("server") server: string,
        @Param("edition") edition: MinecraftEdition,
        @Param("start") start: string,
        @Param("step") step: string,
        @Param("end") end: string,
    ): Promise<ApiQueryRangeResponse> {
        const query = `min(sum by(pod) (minecraft_status_players_online_count{server_slug="${server}", server_edition="${edition}"}))`
        const res = await this.prometheusService.queryRange(
            query,
            start,
            step,
            end,
        )

        return {
            data: res.data.result[0].values.map(([x, y]) => {
                return {
                    x: Number.parseInt(x.toFixed(0)),
                    y: Number.parseInt(y),
                }
            }),
        }
    }
}
