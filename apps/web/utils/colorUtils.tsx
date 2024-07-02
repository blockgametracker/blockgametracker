import { Theme } from "@nivo/core"

export const baseColors = [
    "#00e13f",
    "#835af3",
    "#ffc42f",
    "#ee3232",
    "#ee57de",
    "#55e8ee",
    "#1e4ad5",
    "#ff6918",
    "#bada55",
    "#ff00ff",
    "#ff1493",
    "#ffa500",
    "#800080",
    "#008000",
    "#000080",
]

export function getColor(index: number): string {
    const baseColor = baseColors[index % baseColors.length]
    const variationFactor = Math.floor(index / baseColors.length)
    return adjustColor(baseColor, variationFactor)
}

function adjustColor(color: string, factor: number): string {
    let r = parseInt(color.slice(1, 3), 16)
    let g = parseInt(color.slice(3, 5), 16)
    let b = parseInt(color.slice(5, 7), 16)

    r = Math.min(255, r + factor * 20)
    g = Math.min(255, g + factor * 20)
    b = Math.min(255, b + factor * 20)

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
}

/** The nivo dark graph theme. */
export const darkTheme: Theme = {
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

/** The nivo light graph theme. */
export const lightTheme: Theme = {
    background: "#ffffff",
    grid: {
        line: {
            stroke: "#dfdfdf",
            strokeDasharray: "4, 4",
            strokeWidth: 1,
        },
    },
    axis: {
        ticks: {
            line: {
                stroke: "#dfdfdf",
            },
            text: {
                fill: "#7e7e7e",
            },
        },
    },
    crosshair: {
        line: {
            stroke: "#6a6a6b",
            strokeWidth: 1,
        },
    },
}

/** The nivo dark bartchart theme. */
export const barChartTheme: Theme = {
    background: "#0e0e10",
    grid: {
        line: {
            stroke: "#262629",
            strokeDasharray: "4, 4",
            strokeWidth: 1,
        },
    },
}