import { ServerData } from "@/components/server/serverCard"
import { DataRange } from "./dataRange"

export const graphColors = [
    "#35f03f",
    "#9b7af3",
    "#ffcd4c",
    "#ee3232",
    "#ee6ae0",
    "#6ae9ee",
]

export const greenGraph = ["#35f03f"]

export const redGraph = ["#ee3232"]

export const theme = {
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

interface TickResult {
    ticksX: number[]
    ticksY: number[]
}

// Function to calculate ticks for a chart
export function getTicks(
    serverData: ServerData[],
    stepX: number,
    range: DataRange,
): TickResult {
    // Calculate the length of the data array
    const dataLength = serverData[0].data.length

    // Calculate step size for x-axis ticks
    stepX = Math.ceil(dataLength / stepX)

    // Generate x-axis tick values
    const ticksX: number[] = []
    const ticksY: number[] = []
    for (let i = 0; i < dataLength; i += stepX) {
        ticksX.push(serverData[0].data[i].x)
    }

    ticksX.push(serverData[0].data[serverData[0].data.length - 1].x)

    return { ticksX, ticksY }
}
