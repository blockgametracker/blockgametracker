import {
    MinecraftEdition,
    QueryTimeFrame,
    Server,
    getASBreakdownInRange,
    getEnsembledBreakdownInRange,
    getOnlineInRange,
    getServerBySlug,
    getServers,
} from "@repo/gateway"
import type { ASData, ServerData } from "./parsedData"
import { convertTime } from "./dataUtils"
import { getColor } from "./colorUtils"

/** Returns the total number of players, ensembled by versoin, based on start and step times. */
export const getTotalEnsembled = async (
    edition: MinecraftEdition,
    start: QueryTimeFrame,
    step: QueryTimeFrame,
): Promise<ServerData[]> => {
    const onlineInRange = await getEnsembledBreakdownInRange(
        edition,
        start,
        step,
        "0d",
    )

    if (!onlineInRange || !onlineInRange.data) {
        return []
    }
    onlineInRange.data.sort((a, b) => {
        const lastAY = a.data[a.data.length - 1]?.y || 0
        const lastBY = b.data[b.data.length - 1]?.y || 0
        return lastBY - lastAY
    })

    return await Promise.all(
        onlineInRange.data.map(async (server, index) => {
            const serverData = await getServerBySlug(
                edition,
                server.server_slug,
            )
            return {
                server_edition: edition,
                server_slug: server.server_slug,
                server_name: serverData?.name ?? "Unknown",
                hostname: serverData?.hostname ?? "Unknown",
                data: convertTime(server.data),
                icon: serverData?.icon ?? "",
                color: getColor(index),
            }
        }),
    )
}

export const getASTotalEnsembled = async (
    edition: MinecraftEdition,
    start: QueryTimeFrame,
    step: QueryTimeFrame,
): Promise<ASData[]> => {
    const onlineInRange = await getASBreakdownInRange(
        edition,
        start,
        step,
        "0d",
    )

    if (!onlineInRange || !onlineInRange.data) {
        return []
    }
    onlineInRange.data.sort((a, b) => {
        const lastAY = a.data[a.data.length - 1]?.y || 0
        const lastBY = b.data[b.data.length - 1]?.y || 0
        return lastBY - lastAY
    })

    return await Promise.all(
        onlineInRange.data.map(async (server, index) => {
            return {
                name: server.name,
                number: server.number,
                data: convertTime(server.data),
                color: getColor(index),
            }
        }),
    )
}

/** Gets the players online in a given range. */
export const getOnline = async (
    server: Server,
    edition: MinecraftEdition,
    start: QueryTimeFrame,
    step: QueryTimeFrame,
): Promise<ServerData> => {
    const onlineInRange = await getOnlineInRange(
        server.slug,
        edition,
        start,
        step,
        "0d",
    )

    return {
        server_edition: edition,
        server_slug: server.slug,
        server_name: server.name,
        hostname: server.hostname,
        data: convertTime(onlineInRange!.data),
        icon: server.icon,
        color: getColor(0)
    }
}

/** Gets the information of a server with given name. */
export async function getServer(serverName: string): Promise<Server | null> {
    const servers = await getServers()
    return (
        (servers && servers.find((server) => server.name === serverName)) ||
        null
    )
}
