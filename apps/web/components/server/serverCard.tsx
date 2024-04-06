import Tag from "../tag"
import { Container, DarkContainer } from "../layout/content"
import Graph from "../graphs/graph"
import React from "react"
import {
    ServerData,
    calculateAverage,
    getPeak,
} from "@/utils/dataUtils"
import { getTicks, greenGraph } from "../../utils/graphUtils"
import { ServerButton } from "./serverButton"
import { DataRangeParams } from "@/utils/dataRange"
import { ServerInfo } from "./serverInfo"

const ServerCard = async ({
    serverData,
    rangeParams,
}: {
    serverData: ServerData
    rangeParams: DataRangeParams
}) => {
    const online = serverData.data[serverData.data.length - 1].y
    const ticks = getTicks(serverData, 3, 4)
    const players_avarage = calculateAverage(serverData.data)
    const players_peak = getPeak(serverData.data)

    const dataMapped = [
        serverData
    ]

    return (
        <DarkContainer id="servers" className="fade flex flex-col gap-4 w-full">
            <ServerInfo server={serverData}>
                <div className="ml-auto inline-flex gap-2">
                    <ServerButton
                        arialabel="Compare server"
                        href="/compare"
                        iconName="compare"
                    />
                    <ServerButton
                        arialabel="Open server"
                        href={`/server/${serverData.server_name.replace(" ", "_")}?range=${rangeParams.range}`}
                        iconName="fullscreen"
                    />
                </div>
            </ServerInfo>

            <div className="w-full h-48">
                <Graph
                    data={dataMapped}
                    fill={true}
                    ticksX={ticks.ticksX}
                    ticksY={ticks.ticksY}
                    colors={greenGraph}
                />
            </div>

            <Container className="flex flex-col phone:flex-row gap-4 justify-between rounded-md divide-y-2 phone:divide-y-0 phone:divide-x-2 pl-0 pr-0 pt-2 pb-2 divide-darkOverlay">
                <Tag text="Current" color={greenGraph[0]}>
                    {online}
                </Tag>
                <Tag text="Mean" color="#9b7af3">
                    {players_avarage}
                </Tag>
                <Tag text="Max" color="#ffcd4c">
                    {players_peak}
                </Tag>
            </Container>
        </DarkContainer>
    )
}

export default ServerCard
