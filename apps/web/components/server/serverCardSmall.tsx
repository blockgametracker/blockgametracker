import { DarkContainer } from "../content"
import Graph from "../graphs/graph"
import React from "react"
import { ServerInfo as ServerInfoData, getOnlineInRange } from "@repo/gateway"
import { calculatePercentageChange, convertTime } from "@/utils/dataUtils"
import { greenGraph, redGraph } from "../../utils/graphUtils"
import { ServerData } from "./serverCard"
import { DataRangeParams } from "@/utils/dataRange"
import { ServerInfo } from "./serverInfo"

export const server = async ({
    server,
    rangeParams,
}: {
    server: ServerInfoData
    rangeParams: DataRangeParams
}) => {
    const onlineInRange = await getOnlineInRange(
        server.server_name,
        "java",
        rangeParams.start,
        rangeParams.step,
    )
    const serverArray: ServerData[] = [
        {
            id: server.server_name,
            data: convertTime(onlineInRange.data),
        },
    ]

    const percentage = calculatePercentageChange(onlineInRange.data)

    return (
        <DarkContainer id="servers" className="fade flex flex-row gap-4 w-full max-w-96">
            <ServerInfo server={server} percentage={percentage} />

            <div className="ml-auto w-1/3 h-16">
                <Graph
                    data={serverArray}
                    fill={true}
                    ticksX={[]}
                    ticksY={false}
                    colors={percentage >= 0 ? greenGraph : redGraph}
                />
            </div>
        </DarkContainer>
    )
}

export default server
