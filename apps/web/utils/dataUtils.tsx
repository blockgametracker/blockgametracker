import { ApiQuery, ApiResult } from "@repo/gateway"
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
        const month = padTimeUnit(time.getMonth() + 1)
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
    return { x, y }
}

/** Returns the number of data points in a given time frame. */
export function calculateDataPoints(start: string, step: string): number {
    const timeToMinutes = (time: string): number => {
        const timeUnits: { [key: string]: number } = {
            s: 1 / 60,
            m: 1,
            h: 60,
            d: 1440,
            w: 10080,
            M: 43200,
            y: 525600,
        }

        const unit = time.slice(-1)
        const value = parseInt(time.slice(0, -1), 10)

        if (!timeUnits[unit]) {
            throw new Error(`Invalid time unit: ${unit}`)
        }

        return value * timeUnits[unit]
    }

    const rangeInMinutes = Math.abs(timeToMinutes(start))
    const stepInMinutes = timeToMinutes(step)

    const dataPoints = rangeInMinutes / stepInMinutes

    return Math.ceil(dataPoints)
}
