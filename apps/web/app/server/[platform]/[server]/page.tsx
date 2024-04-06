import React from "react"

import { DarkContainer, Section } from "@/components/layout/content"
import Layout from "@/components/layout"
import { PageParams } from "@/utils/next"
import { getOnline, getServer } from "@/utils/dataUtils"
import { ServerInfo } from "@/components/server/serverInfo"
import { ServerButton } from "@/components/server/serverButton"
import { StatisticBig, StatisticSmall } from "@/components/statistic"
import { getTicks, greenGraph } from "@/utils/graphUtils"
import Graph from "@/components/graphs/graph"
import { URLParams, getURLParams } from "@/utils/urlBuilder"
import { MinecraftEdition } from "@repo/gateway"

const Home = ({
    params,
    searchParams,
}: PageParams<{ server: string; platform: string }>) => {
    const serverName = params.server.replace("_", " ")

    const urlParams = getURLParams(
        searchParams?.range,
        searchParams?.platform,
        searchParams?.compact,
    )

    return (
        <ServerPage
            serverName={serverName}
            platform={params.platform}
            urlParams={urlParams}
        />
    )
}

interface Props {
    serverName: string
    platform: string
    urlParams: URLParams
}

const ServerPage = async (props: Props) => {
    const server = await getServer(props.serverName)
    if (server === null) return

    const serverData = await getOnline(
        server,
        props.platform as MinecraftEdition,
        props.urlParams.rangeParams.start,
        props.urlParams.rangeParams.step,
    )
    const online = serverData.data[serverData.data.length - 1]
    const ticks = getTicks(serverData, 8, 10)
    const dataMapped = [serverData]

    return (
        <Layout page={props.serverName}>
            <Section className="w-full tablet:h-full">
                <div className="flex flex-col tablet:flex-row gap-4 w-full tablet:h-full">
                    <DarkContainer className="w-full h-96 tablet:w-4/5 tablet:h-full ">
                        <Graph
                            data={dataMapped}
                            fill={true}
                            ticksX={ticks.ticksX}
                            ticksY={ticks.ticksY}
                            colors={greenGraph}
                        />
                    </DarkContainer>

                    <div className="flex flex-col w-full tablet:w-1/5 tablet:h-full gap-4">
                        <DarkContainer>
                            <ServerInfo
                                serverData={serverData}
                                platform={props.urlParams.platform}
                            >
                                <ServerButton
                                    className="ml-auto"
                                    arialabel="Compare server"
                                    href="/compare"
                                    iconName="compare"
                                />
                            </ServerInfo>
                        </DarkContainer>

                        <DarkContainer>
                            <h1>General information</h1>
                            <StatisticSmall title="Players" value={online.y} />
                            <StatisticSmall title="Ping" value="-" />
                            <StatisticSmall
                                title="Host"
                                value={server.server_host}
                            />
                            <StatisticSmall title="Port" value="-" />
                        </DarkContainer>

                        <div className="w-full grid grid-cols-2 gap-4">
                            <StatisticBig
                                iconName="clock"
                                title="Avarage 1 day"
                                value="-"
                            />
                            <StatisticBig
                                iconName="clock"
                                title="Avarage 1 week"
                                value="-"
                            />
                            <StatisticBig
                                iconName="clock"
                                title="Avarage 1 month"
                                value="-"
                            />
                            <StatisticBig
                                iconName="clock"
                                title="Avarage 1 year"
                                value="-"
                            />
                        </div>
                    </div>
                </div>
            </Section>
        </Layout>
    )
}

export default Home
