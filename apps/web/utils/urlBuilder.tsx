import {
    DataRangeParams,
    getRangeParams,
    searchParamToRange,
} from "./dataRange"

/** The URL parameters provided to the page. */
export interface URLParams {
    rangeParams: DataRangeParams
    platform: string
    compact: boolean
}

/** Returns the URL Params for the given internally stored data. */
export function getURLParams(
    rangeParams?: string,
    platform?: string,
    compact?: string,
) {
    const dateRange = searchParamToRange(rangeParams)

    return {
        rangeParams: getRangeParams(dateRange),
        platform: platform ?? "java",
        compact: compact === "true",
    }
}

/** Builds the URL given the parameters provided. */
export function buildURL(
    rangeParams: DataRangeParams,
    compact: boolean | null,
    platform: string | null,
) {
    const params = new URLSearchParams({
        rangeParams: rangeParams.range,
    })

    if (compact) params.append("compact", `${compact}`)
    if (platform) params.append("platform", platform)

    return `?${params.toString()}`
}
