import { QueryStart, QueryStep } from "@repo/gateway"

/** Selectable ranges for data to be presented. */
export enum DataRange {
    HOUR = "hour",
    DAY = "day",
    WEEK = "week",
    MONTH = "month",
    YEAR = "year",
}

/** Parameters associated with a set `DataRange`. */
export interface DataRangeParams {
    range: DataRange
    start: QueryStart
    step: QueryStep
}

/** Converts a search parameter to a `DataRange`. */
export const searchParamToRange = (param?: string) => {
    switch (param) {
        case "year":
            return DataRange.YEAR
        case "month":
            return DataRange.MONTH
        case "week":
            return DataRange.WEEK
        case "hour":
            return DataRange.HOUR
        default:
            return DataRange.DAY
    }
}

/** Returns the range parameters for a given `DataRange`. */
export const getRangeParams = (range: DataRange): DataRangeParams => {
    switch (range) {
        case DataRange.HOUR:
            return {
                range: range,
                start: "-1h",
                step: "30s",
            }
        case DataRange.YEAR:
            return {
                range: range,
                start: "-1y",
                step: "1d",
            }
        case DataRange.MONTH:
            return {
                range: range,
                start: "-30d",
                step: "12h",
            }
        case DataRange.WEEK:
            return {
                range: range,
                start: "-7d",
                step: "1h",
            }
        default:
            return {
                range: range,
                start: "-24h",
                step: "4m",
            }
    }
}

/** Returns the `DataRange` in a readable format. */
export const rangeToText = (range: DataRange) =>
    range.charAt(0).toUpperCase() + range.slice(1)
