/** The base response returned from the API. */
export interface BaseApiResponse<T> {
    data: T
}

/** A singular query result. */
export interface ApiResult {
    y: number
}

/** A singular query output. */
export interface ApiQuery extends ApiResult {
    x: number
}

/** A query response for a single time. */
export type ApiQueryResponse = BaseApiResponse<ApiQuery>

/** A query response for a single time and server. */
interface ApiServerQuery {
    server_name: string
    data: ApiQuery
}

/** A query response over a timeframe for a specific server. */
interface ApiServerQueryRange {
    server_name: string
    data: ApiQuery[]
}

/** The response to a server-based query at a single time. */
export type ApiServerQueryResponse = BaseApiResponse<ApiServerQuery[]>

/** The response to a server-based query over a timeframe. */
export type ApiServerQueryRangeResponse = BaseApiResponse<ApiServerQueryRange[]>

/** The response to a query over a timeframe. */
export type ApiQueryRangeResponse = BaseApiResponse<ApiQuery[]>

/** The name of a server we track. */
export interface ServerName {
    server_name: string
}

/** The meta information on a server we track. */
export interface ServerInfo extends ServerName {
    server_host: string
}

/** A response which contains a server's name only. */
export type ApiServerNameResponse = BaseApiResponse<ServerName[]>

/** A response which contains a server's full information. */
export type ApiServerInfoResponse = BaseApiResponse<ServerInfo[]>

/** A Minecraft edition. */
export type MinecraftEdition = "java" | "bedrock"

/** A unit of time. */
type TimeUnit = "s" | "m" | "h" | "d" | "m" | "y"

/** The `start` attribute of a Prometheus query. */
export type QueryStart = `-${number}${TimeUnit}`

/** The `step` attribute of a Prometheus query. */
export type QueryStep = `${number}${TimeUnit}`
