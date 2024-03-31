import Tag from "../tag"
import { Container, DarkContainer } from "../content"
import Graph from "../graphs/graph"
import React from "react"
import { ServerInfo as ServerInfoData, getOnlineInRange } from "@repo/gateway"
import {
    calculateAverage,
    calculatePercentageChange,
    convertTime,
    getPeak,
} from "@/utils/dataUtils"
import { getTicks, greenGraph, redGraph } from "../../utils/graphUtils"
import { ServerButton } from "./serverButton"
import { DataRangeParams } from "@/utils/dataRange"
import { ServerInfo } from "./serverInfo"

export interface Server {
    name: string
    ip: string
    icon: string
    version: string
    players_current: number
    players_record: number
    players_peak: number
}

export interface ServerData {
    id: string
    data: any
}

const ServerCard = async ({
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

    const online = onlineInRange.data[onlineInRange.data.length - 1].y

    const serverArray: ServerData[] = [
        {
            id: server.server_name,
            data: convertTime(onlineInRange.data),
        },
    ]

    const ticks = getTicks(serverArray, 8)

    const players_avarage = calculateAverage(onlineInRange.data)
    const players_peak = getPeak(onlineInRange.data)
    const percentage = calculatePercentageChange(onlineInRange.data)

    return (
        <DarkContainer id="servers" className="fade flex flex-col gap-4 w-full">
            <ServerInfo server={server} percentage={percentage}>
                <div className="ml-auto inline-flex gap-2">
                    <ServerButton
                        arialabel="Compare server"
                        href="/compare"
                        iconName="compare"
                    />
                    <ServerButton
                        arialabel="Open server"
                        href={`/server/${server.server_name.replace(" ", "_")}`}
                        iconName="fullscreen"
                    />
                </div>
            </ServerInfo>

            <div className="w-full h-48">
                <Graph
                    data={serverArray}
                    ticksX={ticks.ticksX}
                    ticksY={ticks.ticksY}
                    fill={true}
                    colors={percentage >= 0 ? greenGraph : redGraph}
                />
            </div>

            <Container className="flex flex-col phone:flex-row gap-4 justify-between rounded-md divide-y-2 phone:divide-y-0 phone:divide-x-2 pl-0 pr-0 pt-2 pb-2 divide-darkOverlay">
                <Tag
                    text="Current"
                    color={percentage >= 0 ? "#68fa46" : "#ee3232"}
                >
                    {online}
                </Tag>
                <Tag text="Mean" color="#9b7af3">
                    {Math.round(players_avarage)}
                </Tag>
                <Tag text="Max" color="#ffcd4c">
                    {players_peak}
                </Tag>
            </Container>
        </DarkContainer>
    )
}

export default ServerCard
