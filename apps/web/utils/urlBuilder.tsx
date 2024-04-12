import {
    DataRangeParams,
    getRangeParams,
    searchParamToRange,
} from "./dataRange"

/** The URL parameters provided to the page. */
export interface URLParams {
    rangeParams: DataRangeParams
    edition: string
    compact: boolean
    servers: string[]
}

/** Returns the URL Params for the given internally stored data. */
export function getURLParams(
    rangeParams?: string,
    edition?: string,
    compact?: string,
    servers?: string[],
) {
    const dateRange = searchParamToRange(rangeParams)

    return {
        rangeParams: getRangeParams(dateRange),
        edition: edition ?? "java",
        compact: compact === "true",
        servers: servers ?? []
    }
}

/** Builds the URL given the parameters provided. */
export function buildURL(
    rangeParams: DataRangeParams,
    compact: boolean | null,
    edition: string | null,
    servers: string[] | null
) {
    const params = new URLSearchParams({
        rangeParams: rangeParams.range,
    })

    if (compact) params.append("compact", `${compact}`)
    if (edition) params.append("edition", edition)
    if (servers) params.append("servers", servers.join(","))

    return `?${params.toString()}`
}
