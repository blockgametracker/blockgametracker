import { Controller, Get, Param } from "@nestjs/common"
import { PrometheusService } from "src/services/prometheus.service"
import type { ServerInfo } from "types/prometheus"

/** Provides information on the servers for which data is collected. */
@Controller("servers")
export class ServersController {
    constructor(private readonly prometheusService: PrometheusService) {}

    /** Returns the servers we collect data on for a given edition. */
    @Get(":edition")
    async getServers(@Param("edition") edition: string) {
        const query = `max(minecraft_status_players_online_count{server_edition="${edition}"}) by (server_name, server_host, server_version)`
        const res = await this.prometheusService.query<ServerInfo>(query)

        return {
            data: res.data.result.map((result) => result.metric),
        }
    }
}
