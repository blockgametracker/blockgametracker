import { Controller, Get, Param } from "@nestjs/common"
import { PrometheusService } from "../services/prometheus.service"

/** Handles requests targeted at specific servers. */
@Controller("online")
export class OnlineController {
    constructor(private readonly prometheusService: PrometheusService) {}

    /** Returns the number of players on a given server-edition pair right now. */
    @Get(":server/:edition")
    async getOnlineServer(
        @Param("server") server: string,
        @Param("edition") edition: string,
    ) {
        const query = `min(sum by(pod) (minecraft_status_players_online_count{server_name="${server}", server_edition="${edition}"}))`
        const res = await this.prometheusService.query(query)
        const result = res.data.result[0]

        return {
            data: {
                x: result.value[0].toFixed(0),
                y: Number.parseInt(result.value[1]),
            },
        }
    }

    /** Returns the number of players on a given server-edition pair over a provided timeframe. */
    @Get(":server/:edition/:start/:step")
    async getOnlineServerRange(
        @Param("server") server: string,
        @Param("edition") edition: string,
        @Param("start") start: string,
        @Param("step") step: string,
    ) {
        const query = `min(sum by(pod) (minecraft_status_players_online_count{server_name="${server}", server_edition="${edition}"}))`
        const res = await this.prometheusService.queryRange(query, start, step)

        return {
            data: res.data.result[0].values.map(([x, y]) => {
                return { x: x.toFixed(0), y: Number.parseInt(y) }
            }),
        }
    }
}
