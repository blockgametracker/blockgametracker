import { Controller, Get, Param } from "@nestjs/common"
import type { MinecraftEdition, Server } from "@repo/gateway"
import { DataSourceService } from "src/services/ds.service"

/** Provides information on the servers for which data is collected. */
@Controller("servers")
export class ServersController {
    constructor(private readonly dataSourceService: DataSourceService) {}

    /** Returns the servers we collect data on. */
    @Get("")
    async getServers(): Promise<Server[]> {
        return await this.dataSourceService.getServers()
    }

    /** Returns the servers we collect data on for a given edition. */
    @Get(":edition")
    async getServersByEdition(
        @Param("edition") edition: MinecraftEdition,
    ): Promise<Server[]> {
        return await this.dataSourceService.getServersByEdition(edition)
    }

    /** Returns the servers we collect data on for a given edition and slug. */
    @Get(":edition/:slug")
    async getServerBySlug(
        @Param("edition") edition: MinecraftEdition,
        @Param("slug") slug: string,
    ): Promise<Server> {
        return await this.dataSourceService.getServerBySlug(edition, slug)
    }
}
