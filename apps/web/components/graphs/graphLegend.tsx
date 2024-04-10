import { DarkContainer } from "@/components/layout/content"
import type { ServerData } from "@/utils/parsedData"
import { Fragment } from "react"
import { LegendItem } from "./legendItem"

interface Props {
    data: ServerData[]
}

export const GraphLegend = ({ data }: Props) => (
    <DarkContainer className="col-span-6 tablet:col-span-1 h-full w-full flex flex-col overflow-scroll">
        {data.map((server, index) => (
            <Fragment key={index}>
                <LegendItem server={server} index={index} />
            </Fragment>
        ))}
    </DarkContainer>
)
