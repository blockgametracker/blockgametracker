import { getTicks, greenGraph } from "@/utils/graphUtils"
import { URLParams, buildURL } from "@/utils/urlBuilder"
import { MinecraftEdition } from "@repo/gateway"
import { Graph } from "@/components/graphs/graph"
import { Section, DarkContainer } from "@/components/layout/content"
import { StatisticSmall } from "@/components/statistic/small"
import { StatisticLarge } from "@/components/statistic/large"
import { ServerButton } from "../button/serverButton"
import { ServerInfo } from "./serverInfo"
import { getOnline, getServer } from "@/utils/dataFetcher"

interface Props {
    serverName: string
    edition: string
    urlParams: URLParams
}

export const ServerPage = async (props: Props) => {
    const server = await getServer(props.serverName)
    if (!server) return null

    const serverData = await getOnline(
        server,
        props.edition as MinecraftEdition,
        props.urlParams.rangeParams.start,
        props.urlParams.rangeParams.step,
    )
    const online = serverData.data[serverData.data.length - 1]
    const ticks = getTicks(serverData, 8)
    const dataMapped = [serverData]

    return (
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
                            edition={props.urlParams.edition}
                        >
                            <ServerButton
                                className="ml-auto"
                                ariaLabel="Compare server"
                                href={`/compare/${buildURL(props.urlParams.rangeParams, props.urlParams.compact, props.urlParams.edition, [props.serverName], null)}`}
                                iconName="compare"
                            />
                        </ServerInfo>
                    </DarkContainer>

                    <DarkContainer>
                        <h1>General information</h1>
                        <StatisticSmall title="Players" value={online.y} />
                        <StatisticSmall title="Host" value={server.hostname} />
                    </DarkContainer>
                </div>
            </div>
        </Section>
    )
}
