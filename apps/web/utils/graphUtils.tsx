import { ServerData } from "./dataUtils"

export const graphColors = [
    "#2dcf35",
    "#9b7af3",
    "#ffcd4c",
    "#ee3232",
    "#ee6ae0",
    "#6ae9ee",
]

export const greenGraph = ["#2dcf35"]

export const redGraph = ["#d12b2b"]

export const theme = {
    background: "#0b0b0c",
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
    serverData: ServerData,
    stepX: number,
    stepY: number,
): TickResult {
    const minY = Math.min(...serverData.data.map((item: any) => item.y))
    const maxY = Math.max(...serverData.data.map((item: any) => item.y))

    const ticksX: number[] = []
    const ticksY = calculateBetween(minY, maxY, stepY)

    // Calculate the length of the data array
    const dataLength = serverData.data.length

    // Calculate step size for x-axis ticks
    stepX = Math.ceil(dataLength / stepX)

    for (let i = 0; i < dataLength; i += stepX) {
        ticksX.push(serverData.data[i].x)
    }

    ticksX.push(serverData.data[serverData.data.length - 1].x)

    return { ticksX, ticksY }
}

function calculateBetween(minY: number, maxY: number, step: number): number[] {
    const interval = (maxY - minY) / step // Divide the range into equal intervals
    const values: number[] = [minY, maxY]

    for (let i = 1; i <= step - 1; i++) {
        values.push(Math.round(minY + i * interval)) // Calculate the value at each interval
    }

    return values
}
