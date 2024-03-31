import React from "react"
import { ServerData } from "../server/serverCard"
import { DarkContainer } from "../content"
import { graphColors } from "../../utils/graphUtils"

export const GraphLegend = ({ data }: { data: any[] }) => (
    <DarkContainer className="col-span-6 tablet:col-span-1 h-full w-full flex flex-col overflow-scroll">
        {data.map((server: any, index: any) => (
            <React.Fragment key={index}>
                <LegendItem server={server} index={index} />
            </React.Fragment>
        ))}
    </DarkContainer>
)

export const LegendItem = ({
    server,
    index,
}: {
    server: ServerData
    index: number
}) => {
    const color = graphColors[index % graphColors.length]

    return (
        <div className="inline-flex gap-2 items-center pt-2 pb-2">
            <p style={{ color: `${color}` }}>■</p>
            <p className="whitespace-nowrap">{server.id}</p>
        </div>
    )
}
