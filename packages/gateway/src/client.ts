import type {
    ApiQueryRangeResponse,
    ApiQueryResponse,
    ApiServerInfoResponse,
    ApiServerQueryRangeResponse,
    ApiServerQueryResponse,
    MinecraftEdition,
    QueryStart,
    QueryStep,
} from "./types/api"

/** Returns the JSON response to a request at the given endpoint. */
const request = async <T>(endpoint: string) => {
    const res = await fetch(`${process.env.API_URL}/${endpoint}`, {
        //@ts-ignore shut up
        next: {
            revalidate: 10,
        },
    })
    const json = await res.json()
    return json as T
}

/** Returns a cumulative total number of players on a given edition. */
export const getEnsembledTotal = async (edition: MinecraftEdition) =>
    await request<ApiQueryResponse>(`ensemble/${edition}/total`)

/** Returns a breakdown of the number of players on each registered server for a given edition. */
export const getEnsembledBreakdown = async (edition: MinecraftEdition) =>
    await request<ApiServerQueryResponse>(`ensemble/${edition}/breakdown`)

/** Returns a breakdown of the number of players on each registered server for a given edition within a timeframe. */
export const getEnsembledBreakdownInRange = async (
    edition: MinecraftEdition,
    start: QueryStart,
    step: QueryStep,
) =>
    await request<ApiServerQueryRangeResponse>(
        `ensemble/${edition}/breakdown/${start}/${step}`,
    )

/** Returns the number of players on a given server-edition pair right now. */
export const getOnline = async (server: string, edition: MinecraftEdition) =>
    await request<ApiQueryResponse>(`online/${server}/${edition}`)

/** Returns the number of players on a given server-edition pair over a provided timeframe. */
export const getOnlineInRange = async (
    server: string,
    edition: MinecraftEdition,
    start: QueryStart,
    step: QueryStep,
) =>
    await request<ApiQueryRangeResponse>(
        `online/${server}/${edition}/${start}/${step}`,
    )

/** Returns the servers we collect data on for a given edition. */
export const getServers = async (edition: MinecraftEdition) =>
    await request<ApiServerInfoResponse>(`servers/${edition}`)
