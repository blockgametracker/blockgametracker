/** The base response returned by Prometheus. */
export interface BaseResponse<T> {
    status: string
    data: {
        resultType: string
        result: T[]
    }
    stats: {
        seriesFetched: string
        executionTimeMsec: number
    }
}

/** The base of a data-based result from Prometheus. */
export interface BaseResult<Metric> {
    metric: Metric
}

/** A singular query. */
interface Query<Metric, Key, Value> extends BaseResult<Metric> {
    value?: [Key, Value]
}

/** A query over a given timeframe. */
interface QueryRange<Metric, Key, Value> extends BaseResult<Metric> {
    values?: [Key, Value][]
}

/** The response from a singular query. */
export type QueryResponse<Metric, Key, Value> = BaseResponse<
    Query<Metric, Key, Value>
>

/** The response from a query over a given timeframe. */
export type QueryRangeResponse<Metric, Key, Value> = BaseResponse<
    QueryRange<Metric, Key, Value>
>

/** The name of a server we track. */
export interface ServerName {
    server_name: string
}

/** The meta information on a server we track. */
export interface ServerInfo extends ServerName {
    server_host: string
    server_version: string
}
