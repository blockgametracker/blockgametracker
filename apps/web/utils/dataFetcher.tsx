import {
    MinecraftEdition,
    QueryStart,
    QueryStep,
    ServerInfo,
    getEnsembledBreakdownInRange,
    getOnlineInRange,
    getServers,
} from "@repo/gateway"
import type { ServerData } from "./parsedData"
import { convertTime } from "./dataUtils"

/** Returns the total number of players, ensembled by versoin, based on start and step times. */
export const getTotalEnsembled = async (
    edition: MinecraftEdition,
    start: QueryStart,
    step: QueryStep,
): Promise<ServerData[]> => {
    const onlineInRange = await getEnsembledBreakdownInRange(
        edition,
        start,
        step,
    )

    onlineInRange.data.sort((a, b) => {
        const lastAY = a.data[a.data.length - 1]?.y || 0
        const lastBY = b.data[b.data.length - 1]?.y || 0
        return lastBY - lastAY
    })

    return onlineInRange.data.map((server) => {
        return {
            server_name: server.server_name,
            id: server.server_name,
            data: convertTime(server.data),
        }
    })
}

/** Gets the players online in a given range. */
export const getOnline = async (
    server: ServerInfo,
    edition: MinecraftEdition,
    start: QueryStart,
    step: QueryStep,
): Promise<ServerData> => {
    const onlineInRange = await getOnlineInRange(
        server.server_name,
        edition,
        start,
        step,
    )

    return {
        server_name: server.server_name,
        id: server.server_name,
        data: convertTime(onlineInRange.data),
    }
}

/** Gets the information of a server with given name. */
export async function getServer(
    serverName: string,
): Promise<ServerInfo | null> {
    const servers = await getServers("java")
    const foundServer = servers.data.find(
        (server) => server.server_name === serverName,
    )
    return foundServer || null
}
