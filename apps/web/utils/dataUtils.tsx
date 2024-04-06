import {
    ApiQuery,
    MinecraftEdition,
    QueryStart,
    QueryStep,
    ServerInfo,
    getEnsembledBreakdownInRange,
    getOnlineInRange,
    getServers,
} from "@repo/gateway"

export interface ServerData {
    server_name: string
    id: string
    data: any
}

export const getTotalEnsembled = async (
    edition: MinecraftEdition,
    start: QueryStart,
    step: QueryStep,
) => {
    const onlineInRange = await getEnsembledBreakdownInRange(
        edition,
        start,
        step,
    )
    return onlineInRange.data.map((server) => {
        return {
            server_name: server.server_name,
            id: server.server_name,
            data: convertTime(server.data),
        }
    })
}

export const getOnline = async (
    server: ServerInfo,
    edition: MinecraftEdition,
    start: QueryStart,
    step: QueryStep,
) => {
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

const padTimeUnit = (unit: number) => unit.toString().padStart(2, "0")

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

export function calculateAverage(data: ApiQuery[]): number {
    const total = data.reduce((acc, curr) => acc + curr.y, 0)
    return Math.round(total / data.length)
}

export function getPeak(data: ApiQuery[]): number {
    let peak = Number.MIN_SAFE_INTEGER
    data.forEach((point) => {
        if (point.y > peak) {
            peak = point.y
        }
    })
    return peak
}

export async function getServer(
    serverName: string,
): Promise<ServerInfo | null> {
    const servers = await getServers("java")
    const foundServer = servers.data.find(
        (server) => server.server_name === serverName,
    )
    return foundServer || null
}