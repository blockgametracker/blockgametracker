import { Controller, Get, NotFoundException, Param } from "@nestjs/common"
import { PrometheusService } from "./prometheus.service"

@Controller()
export class AppController {
    constructor(private readonly prometheusService: PrometheusService) {}

    @Get()
    getHello(): string {
        return "Hello, World!"
    }

    @Get("online/:server/:edition")
    async getOnline(
        @Param("server") server: string,
        @Param("edition") edition: string,
    ) {
        const query = `min(sum by(pod) (minecraft_status_players_online_count{server_name="${server}", server_edition="${edition}"}))`
        const res = await this.prometheusService.query(query)

        if (res.data.result.length === 0) throw new NotFoundException()

        const result = res.data.result[0]

        return {
            data: {
                x: result.value[0],
                y: Number.parseInt(result.value[1]),
            },
        }
    }

    @Get("online/:server/:edition/:start/:step")
    async getOnlineRange(
        @Param("server") server: string,
        @Param("edition") edition: string,
        @Param("start") start: string,
        @Param("step") step: string,
    ) {
        const query = `min(sum by(pod) (minecraft_status_players_online_count{server_name="${server}", server_edition="${edition}"}))`
        const res = await this.prometheusService.queryRange(query, start, step)

        if (res.data.result.length === 0) throw new NotFoundException()

        const result = res.data.result[0]

        if (result.values === undefined) throw new NotFoundException()

        return {
            data: res.data.result[0].values.map(([x, y]) => {
                return { x: x, y: Number.parseInt(y) }
            }),
        }
    }
}
