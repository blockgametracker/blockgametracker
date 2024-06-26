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

/** A query related to a server. */
interface ServerQuery {
    server_slug: string
}

/** A query response for a single time and server. */
interface ApiServerQuery extends ServerQuery {
    data: ApiQuery
}

/** A query response over a timeframe for a specific server. */
interface ApiServerQueryRange extends ServerQuery {
    data: ApiQuery[]
}

/** A query related to an AS. */
interface ASQuery {
    name: string
    number: string
}

/** The query response for a single time and AS. */
interface ApiASQuery extends ASQuery {
    name: string
    number: string
    data: ApiQuery
}

/** The query response over a timeframe for a specific server. */
interface ApiASQueryRange extends ASQuery {
    data: ApiQuery[]
}

/** The response to a server-based query at a single time. */
export type ApiServerQueryResponse = BaseApiResponse<ApiServerQuery[]>

/** The response to a server-based query over a timeframe. */
export type ApiServerQueryRangeResponse = BaseApiResponse<ApiServerQueryRange[]>

/** The response to a server-based query over a timeframe. */
export type ApiQueryRangeResponse = BaseApiResponse<ApiQuery[]>

/** The response to an AS-based query at a single time. */
export type ApiASQueryResponse = BaseApiResponse<ApiASQuery[]>

/** The response to an AS-based query over a timeframe. */
export type ApiASQueryRangeResponse = BaseApiResponse<ApiASQueryRange[]>

/** The identifying information of a server we track. */
export interface ServerIdentifier {
    server_slug: string
}

/** The meta information on a server we track. */
export interface ServerInfo extends ServerIdentifier {
    server_host: string
}

/** A response which contains a server's name only. */
export type ApiServerNameResponse = BaseApiResponse<ServerIdentifier[]>

/** A response which contains a server's full information. */
export type ApiServerInfoResponse = BaseApiResponse<ServerInfo[]>

/** A Minecraft edition. */
export enum MinecraftEdition {
    JAVA = "java",
    BEDROCK = "bedrock",
}

/** A unit of time. */
type TimeUnit = "s" | "m" | "h" | "d" | "m" | "y"

/** A plus, minus, or nothing at all. */
type PN = "+" | "-" | ""

/** The timeframe of a Prometheus query. */
export type QueryTimeFrame = `${PN}${number}${TimeUnit}`

/** The server object. */
export interface Server {
    name: string
    slug: string
    platform: MinecraftEdition
    hostname: string
    icon: string
}

/** Statistics stored on an Autonomous System (AS). */
export interface AS {
    as_name: string
    as_number: string
}
