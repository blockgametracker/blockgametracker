import Tag from "../tag"
import { Container, DarkContainer } from "../layout/content"
import Graph from "../graphs/graph"
import React from "react"
import { ServerData, calculateAverage, getPeak } from "@/utils/dataUtils"
import { getTicks, greenGraph } from "../../utils/graphUtils"
import { ServerButton } from "./serverButton"
import { ServerInfo } from "./serverInfo"
import { URLParams, buildURL } from "@/utils/urlBuilder"

const ServerCard = async ({
    urlParams,
    serverData,
}: {
    urlParams: URLParams
    serverData: ServerData
}) => {
    const ticks = getTicks(serverData, 3, 4)
    const dataMapped = [serverData]

    return (
        <DarkContainer
            id="servers"
            className={`fade flex gap-4 w-full ${urlParams.compact ? "flex-row" : "flex-col"}`}
        >
            <ServerInfo platform={urlParams.platform} serverData={serverData}>
                {urlParams.compact && (
                    <ServerStatistics
                        compact={urlParams.compact}
                        serverData={serverData}
                    />
                )}

                <div
                    className={`inline-flex gap-2 ${!urlParams.compact && "ml-auto"}`}
                >
                    <ServerButton
                        arialabel="Compare server"
                        href="/compare"
                        iconName="compare"
                    />
                    <ServerButton
                        arialabel="Open server"
                        href={`/server/${urlParams.platform}/${serverData.server_name.replace(" ", "_")}${buildURL(urlParams.rangeParams, urlParams.compact, urlParams.platform)}`}
                        iconName="fullscreen"
                    />
                </div>
            </ServerInfo>

            {!urlParams.compact && (
                <div className="w-full h-48">
                    <Graph
                        data={dataMapped}
                        fill={true}
                        ticksX={ticks.ticksX}
                        ticksY={ticks.ticksY}
                        colors={greenGraph}
                    />
                </div>
            )}
            {!urlParams.compact && (
                <ServerStatistics
                    compact={urlParams.compact}
                    serverData={serverData}
                />
            )}
        </DarkContainer>
    )
}

const ServerStatistics = ({
    compact,
    serverData,
}: {
    compact: boolean
    serverData: ServerData
}) => {
    const players_avarage = calculateAverage(serverData.data)
    const players_peak = getPeak(serverData.data)
    const online = serverData.data[serverData.data.length - 1].y

    return (
        <div
            className={`flex flex-col phone:flex-row gap-4 justify-between rounded-md divide-y-2 phone:divide-y-0 phone:divide-x-2 px-0 divide-darkOverlay border-darkOverlay ${compact ? "ml-auto" : "pt-4 pb-2 border-t-2"}`}
        >
            <Tag text="Current" color={greenGraph[0]}>
                {online}
            </Tag>
            <Tag text="Mean" color="#9b7af3">
                {players_avarage}
            </Tag>
            <Tag text="Max" color="#ffcd4c">
                {players_peak}
            </Tag>
        </div>
    )
}

export default ServerCard
