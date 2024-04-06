import {
    DataRangeParams,
    getRangeParams,
    searchParamToRange,
} from "./dataRange"

export interface URLParams {
    rangeParams: DataRangeParams
    platform: string
    compact: boolean
}

export function getURLParams(
    rangeParams?: string,
    platform?: string,
    compact?: string,
) {
    const dateRange = searchParamToRange(rangeParams)

    return {
        rangeParams: getRangeParams(dateRange),
        platform: platform || "java",
        compact: compact === "true" || false,
    }
}

export function buildURL(
    rangeParams: DataRangeParams,
    compact?: any,
    platform?: any,
) {
    return `?range=${rangeParams.range}${getValue("compact", compact)}${getValue("platform", platform)}`
}

export const getValue = (setting?: string, value?: any) => {
    if (value !== null) if (value !== undefined) return `&${setting}=${value}`
    return ""
}
