import { Container } from "../content"
import { Server } from "../server"
import { HeaderGraph } from "./headerGraph"

import data from "@/components/graphs/data.json"

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

export const Header = () => (
    <div className="col-span-2 flex flex-col gap-4">
        <Container className="w-full h-96 col-span-3 overflow-visible">
            <HeaderGraph data={data} />
        </Container>
        <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-4">
            {data.slice(0, 6).map((server, index) => (
                <Container className="p-4 pt-2 pb-2 " key={index}>
                    <LegendItem
                        server={server}
                        color={graphColors[index % graphColors.length]}
                    />
                </Container>
            ))}
        </div>
    </div>
)

export const LegendItem = ({
    server,
    color,
}: {
    server: Server
    color: String
}) => (
    <div className="inline-flex gap-4 items-center">
        <div
            className="flex w-8 h-8 rounded-md items-center justify-center"
            style={{ backgroundColor: `${color}30` }}
        >
            <p className="font-semibold" style={{ color: `${color}` }}>
                #1
            </p>
        </div>
        <div className="flex flex-col">
            <h2>{server.name}</h2>
            <p>Players: {server.players_current}</p>
        </div>
    </div>
)
