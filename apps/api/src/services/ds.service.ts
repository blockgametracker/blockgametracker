import { NotFoundException } from "@nestjs/common"
import { MinecraftEdition, Server } from "@repo/gateway"

/** Interacts with the DataSource API. */
export class DataSourceService {
    /** Sends a request to a given endpoint with a record-based request body, returning the JSON-formatted response. */
    async request(
        endpoint: string,
        method: "GET" | "POST",
        body?: Record<string, string>,
    ) {
        const res = await fetch(`${process.env.DSAPI_URL}/${endpoint}`, {
            method: method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${btoa(
                    `${process.env.DSAPI_USER}:${process.env.DSAPI_PASS}`,
                )}`,
            },
            body: body ? new URLSearchParams(body) : undefined,
        })

        // If the response is not ok, the server does not exist
        if (!res.ok) throw new NotFoundException()

        return await res.json()
    }

    /** Returns the servers we collect data on. */
    async getServers(): Promise<Server[]> {
        return await this.request("servers", "GET")
    }

    /** Returns the servers we collect data on for a given edition. */
    async getServersByEdition(edition: MinecraftEdition): Promise<Server[]> {
        return await this.request(`servers/${edition}`, "GET")
    }

    /** Returns the servers we collect data on for a given edition and slug. */
    async getServerBySlug(
        edition: MinecraftEdition,
        slug: string,
    ): Promise<Server> {
        return await this.request(`servers/${edition}/${slug}`, "GET")
    }
}
