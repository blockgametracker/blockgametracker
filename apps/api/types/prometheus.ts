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

export interface BaseResult {
    metric: object
}

interface Query<K, V> extends BaseResult {
    value?: [K, V]
}

interface QueryRange<K, V> extends BaseResult {
    values?: [K, V][]
}

export type QueryResponse<K, V> = BaseResponse<Query<K, V>>

export type QueryRangeResponse<K, V> = BaseResponse<QueryRange<K, V>>
