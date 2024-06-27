import { Theme } from "@nivo/core"
import type { ASData, ComputedServerData, ServerData } from "./parsedData"

export const COLOR_MAX = "#ea501d"
export const COLOR_MEAN = "#2565ee"
export const COLOR_CURRENT = "#2dcf35"

/** The ticked output of a time-series set of data. */
export interface TickResult {
    ticksX: string[]
    ticksY: number[]
}

/** The nivo graph theme. */
export const theme: Theme = {
    background: "#0e0e10",
    grid: {
        line: {
            stroke: "#262629",
            strokeDasharray: "4, 4",
            strokeWidth: 1,
        },
    },
    axis: {
        ticks: {
            line: {
                stroke: "#262629",
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

/** The nivo graph theme. */
export const barChartTheme: Theme = {
    background: "#0e0e10",
    grid: {
        line: {
            stroke: "#262629",
            strokeDasharray: "4, 4",
            strokeWidth: 1,
        },
    }
}

/** Calculates Y ticks for a chart. */
function getTicksY(minY: number, maxY: number) {
    var range = maxY - minY
    var magnitude = Math.pow(10, Math.floor(Math.log10(range)))
    var significantDigit = range / magnitude

    const interval =
        magnitude / (significantDigit <= 1.5 ? 5 : magnitude <= 3 ? 2 : 1)

    const labels = [0] // start with 0 for values which are that low

    for (
        let label = Math.ceil(minY / interval) * interval;
        label <= maxY;
        label += interval
    ) {
        labels.push(Number(label.toFixed(0)))
    }

    return labels
}

/** Calculates ticks for a chart. */
export function getTicks(
    serverData: ComputedServerData,
    stepX: number,
): TickResult {
    const valuesY = serverData.data.map((item) => item.y)
    const maxY = Math.max(...valuesY)
    const minY = Math.min(...valuesY)

    const ticksX: string[] = []
    const ticksY = getTicksY(minY, maxY)

    const dataLength = serverData.data.length
    const maxLength = Math.ceil(dataLength / stepX)

    for (let i = Math.floor(maxLength / 2); i < dataLength; i += maxLength) {
        ticksX.push(serverData.data[i].x)
    }

    return { ticksX, ticksY }
}

// Function to compute server data
export function computeServerData(data: (ServerData | ASData)[]): ComputedServerData {
    return data.reduce((acc, curr) => {
        acc.data.push(...curr.data.map(serverData => ({ x: serverData.x, y: serverData.y })));
        return acc;
    }, { data: [] } as ComputedServerData);
}