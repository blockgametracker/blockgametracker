import {
    MinecraftEdition,
    QueryStart,
    QueryStep,
    Server,
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
    server: Server,
    edition: MinecraftEdition,
    start: QueryStart,
    step: QueryStep,
): Promise<ServerData> => {
    const onlineInRange = await getOnlineInRange(
        server.name,
        edition,
        start,
        step,
    )

    return {
        server_name: server.name,
        id: server.name,
        hostname: server.hostname,
        data: convertTime(onlineInRange.data),
    }
}

/** Gets the information of a server with given name. */
export async function getServer(
    serverName: string,
): Promise<Server | null> {
    const servers = await getServers()
    const foundServer = servers.find(
        (server) => server.name === serverName,
    )
    return foundServer || null
}
