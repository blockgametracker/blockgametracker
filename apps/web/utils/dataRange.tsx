import { QueryStart, QueryStep } from "@repo/gateway"

/** Selectable ranges for data to be presented. */
export enum DataRange {
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
        default:
            return DataRange.DAY
    }
}

/** Returns the range parameters for a given `DataRange`. */
export const getRangeParams = (range: DataRange): DataRangeParams => {
    switch (range) {
        case DataRange.YEAR:
            return {
                range: range,
                start: "-364d",
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
                start: "-6d",
                step: "1h",
            }
        default:
            return {
                range: range,
                start: "-23h",
                step: "4m",
            }
    }
}

/** Returns the `DataRange` in a readable format. */
export const rangeToText = (range: DataRange) =>
    range.charAt(0).toUpperCase() + range.slice(1)
