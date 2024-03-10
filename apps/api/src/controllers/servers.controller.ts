import { Controller, Get, Param } from "@nestjs/common"
import type {
    ApiServerNameResponse,
    MinecraftEdition,
    ServerName,
} from "@repo/gateway"
import { PrometheusService } from "src/services/prometheus.service"

/** Provides information on the servers for which data is collected. */
@Controller("servers")
export class ServersController {
    constructor(private readonly prometheusService: PrometheusService) {}

    /** Returns the servers we collect data on for a given edition. */
    @Get(":edition")
    async getServers(
        @Param("edition") edition: MinecraftEdition,
    ): Promise<ApiServerNameResponse> {
        const query = `max(minecraft_status_players_online_count{server_edition="${edition}"}) by (server_name, server_host, server_version)`
        const res = await this.prometheusService.query<ServerName>(query)

        return {
            data: res.data.result.map((result) => result.metric),
        }
    }
}
