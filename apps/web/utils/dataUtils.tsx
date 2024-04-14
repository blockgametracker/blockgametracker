import {
    ApiQuery,
    ApiResult,
} from "@repo/gateway"
import { ParsedApiQuery } from "./parsedData"

/** Pads the time unit to ensure it has a leading zero, if needed. */
export const padTimeUnit = (unit: number) => unit.toString().padStart(2, "0")

/** Converts epoch time to the ordinal time metric used on graphs. */
export const convertTime = (server: ApiQuery[]) =>
    server.map((data) => {
        let time = new Date(data.x * 1000)
        const secs = padTimeUnit(time.getSeconds())
        const hrs = padTimeUnit(time.getHours())
        const mins = padTimeUnit(time.getMinutes())
        const day = padTimeUnit(time.getDate())
        const month = padTimeUnit(time.getMonth())
        const year = time.getFullYear()

        return {
            x: `${year}-${month}-${day} ${hrs}:${mins}:${secs}`,
            y: data.y,
        }
    })

/** Calculates the average of an array of `ApiResult`. */
export function calculateAverage(data: ApiResult[]) {
    const total = data.reduce((acc, curr) => acc + curr.y, 0)
    return Math.round(total / data.length)
}

/** Returns the peak of an array of `ApiResult`. */
export const getPeak = (data: ApiResult[]) =>
    Math.max(...data.map((point) => point.y))

/** Returns the peak of an array of `ApiResult`. */
export const getPeakDate = (data: ParsedApiQuery[]): ParsedApiQuery => {
    const y = getPeak(data)
    const x = data.find((point) => point.y === y)?.x || ""
    return { x, y};
}