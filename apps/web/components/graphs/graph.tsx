import { ServerInfo } from "@repo/gateway"
import { DarkContainer } from "../content"
import { Server, ServerData } from "../server"

export const graphColors = [
    "#35f03f",
    "#9b7af3",
    "#ffcd4c",
    "#ee3232",
    "#ee6ae0",
    "#6ae9ee",
]

export const theme = {
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

export const LegendItem = ({
    server,
    index,
}: {
    server: ServerData
    index: number
}) => {
    const color = graphColors[index % graphColors.length]

    return (
        <DarkContainer className="inline-flex gap-2 items-center pt-2 pb-2">
            <p
                style={{ color: `${color}` }}
            >■</p>
            <p className="whitespace-nowrap">{server.id}</p>
        </DarkContainer>
    )
}