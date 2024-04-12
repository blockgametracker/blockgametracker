import { Theme } from "@nivo/core"
import type { ServerData } from "./parsedData"
import { calculateAverage } from "./dataUtils"

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

/** Calculates Y ticks for a chart. */
export function getTicksY(max: number): number[] {
    const ticksY: number[] = [];

    const step = 
        max < 10 ? 1 : 
        max < 100 ? 10 : 
        max < 500 ? 50 : 
        max < 1000 ? 100 : 
        max < 2500 ? 250 : 
        max < 10000 ? 1000 : 
        max < 25000 ? 2500 : 
        max < 100000 ? 5000 : 
        10000;

    for (let i = 0; i <= max; i += step) {
        ticksY.push(i);
    }
    return ticksY;
}

/** Calculates ticks for a chart. */
export function getTicks(
    serverData: ServerData,
    stepX: number,
): TickResult {
    const maxY = Math.max(...serverData.data.map((item) => item.y))

    const ticksX: string[] = []
    const ticksY = getTicksY(maxY)

    const dataLength = serverData.data.length
    const maxLength = Math.ceil(dataLength / stepX)

    for (let i = 0; i < dataLength; i += maxLength) {
        ticksX.push(serverData.data[i].x)
    }

    ticksX.push(serverData.data[serverData.data.length - 1].x)

    return { ticksX, ticksY }
}