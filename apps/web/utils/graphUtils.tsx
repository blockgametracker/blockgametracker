import { Theme } from "@nivo/core"
import type { ServerData } from "./parsedData"

/** Available colours on the graph. */
export const GRAPH_COLORS = [
    "#2dcf35",
    "#9b7af3",
    "#ffcd4c",
    "#ee3232",
    "#ee6ae0",
    "#6ae9ee",
]

/** Available colours for a green graph. */
export const greenGraph = ["#2dcf35"]

/** Available colours for a red graph. */
export const redGraph = ["#d12b2b"]

/** The nivo graph theme. */
export const theme: Theme = {
    background: "#0f0f11",
    grid: {
        line: {
            stroke: "#202024",
        },
    },
    axis: {
        ticks: {
            line: {
                stroke: "#202024",
            },
            text: {
                fill: "#7e7e7e",
            },
        },
    },
    crosshair: {
        line: {
            stroke: "#dadada",
            strokeWidth: 1,
        },
    },
}

/** The ticked output of a time-series set of data. */
interface TickResult {
    ticksX: string[]
    ticksY: number[]
}

/** Calculates ticks for a chart. */
export function getTicks(
    serverData: ServerData,
    stepX: number,
    stepY: number,
): TickResult {
    const minY = Math.min(...serverData.data.map((item) => item.y))
    const maxY = Math.max(...serverData.data.map((item) => item.y))

    const ticksX: string[] = []
    const ticksY = calculateBetween(minY, maxY, stepY)
    const dataLength = serverData.data.length
    const maxLength = Math.ceil(dataLength / stepX)

    for (let i = 0; i < dataLength; i += maxLength) {
        ticksX.push(serverData.data[i].x)
    }

    ticksX.push(serverData.data[serverData.data.length - 1].x)

    return { ticksX, ticksY }
}

/** Generates the ticks which should be considered between `minY` and `maxY`. */
function calculateBetween(minY: number, maxY: number, step: number): number[] {
    const interval = (maxY - minY) / step
    const values: number[] = [minY, maxY]

    for (let i = 1; i <= step - 1; i++) {
        values.push(Math.round(minY + i * interval))
    }

    return values
}
