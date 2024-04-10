import {
    ApiQuery,
    ApiResult,
    MinecraftEdition,
    QueryStart,
    QueryStep,
    ServerInfo,
    getEnsembledBreakdownInRange,
    getOnlineInRange,
    getServers,
} from "@repo/gateway"
import type { ServerData } from "./parsedData"

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

/** Pads the time unit to ensure it has a leading zero, if needed. */
export const padTimeUnit = (unit: number) => unit.toString().padStart(2, "0")

/** Converts epoch time to the ordinal time metric used on graphs. */
export const convertTime = (server: ApiQuery[]) =>
    server.map((data) => {
        let time = new Date(data.x * 1000)
        const secs = padTimeUnit(time.getSeconds())
        const hrs = padTimeUnit(time.getHours())
        const mins = padTimeUnit(time.getMinutes())
        const day = padTimeUnit(time.getDate())
        const month = padTimeUnit(time.getMonth())
        const year = time.getFullYear()

        return {
            x: `${year}-${month}-${day} ${hrs}:${mins}:${secs}`,
            y: data.y,
        }
    })

/** Calculates the average of an array of `ApiResult`. */
export function calculateAverage(data: ApiResult[]) {
    const total = data.reduce((acc, curr) => acc + curr.y, 0)
    return Math.round(total / data.length)
}

/** Returns the peak of an array of `ApiResult`. */
export const getPeak = (data: ApiResult[]) =>
    Math.max(...data.map((point) => point.y))

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
