import { getTicks, greenGraph } from "@/utils/graphUtils"
import { URLParams, buildURL } from "@/utils/urlBuilder"
import { MinecraftEdition } from "@repo/gateway"
import { Graph } from "@/components/graphs/graph"
import { Section } from "@/components/layout/section"
import { StatisticSmall } from "@/components/statistic/small"
import { getOnline, getServer } from "@/utils/dataFetcher"
import { Container } from "../layout/container"
import { ServerSection } from "./serverSection"
import { ServerStatistics } from "./serverStatistics"
import { getPeakDate } from "@/utils/dataUtils"
import { ServerInfo } from "./serverInfo"
import { ServerButton } from "../button/serverButton"

interface Props {
    serverSlug: string
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
    const peak = getPeakDate(serverData.data)
    const minY = Math.min(...serverData.data.map((item) => item.y))

    return (
        <>
            <Container className="flex flex-col w-full tablet:w-1/5 h-fit gap-4 border-r-2 divide-y-2 divide-darkOverlay bg-darkFill border-darkOverlay">
                <div className="flex flex-row p-4 items-center">
                    <ServerInfo serverData={serverData} edition={props.urlParams.edition} />
                    <ServerButton
                        className="ml-auto"
                        ariaLabel="Compare server"
                        href={`/compare/${buildURL(props.urlParams.rangeParams, props.urlParams.edition, [props.serverSlug], null)}`}
                        iconName="compare"
                    />
                </div>
                <div className="flex flex-col px-4 divide-y-2 divide-darkOverlay">
                    <ServerSection title="Server information" icon="information">
                        <StatisticSmall title="Players" value={online.y.toLocaleString()} />
                        <StatisticSmall title="Host" value={server.hostname} />
                        <StatisticSmall title="Edition" value={props.edition} />
                    </ServerSection>
                    <ServerSection title="Data information" icon="graph">
                        <StatisticSmall title="Data range" value={props.urlParams.rangeParams.start.toString().replace("-", "")} />
                        <StatisticSmall title="Data step" value={props.urlParams.rangeParams.step} />
                        <StatisticSmall title="Data points" value={serverData.data.length} />
                    </ServerSection>
                </div>
            </Container>
            
            <Container className="flex flex-col w-full h-96 tablet:w-4/5 tablet:h-full divide-y-2 divide-darkOverlay shrink-0">
                <div className="flex w-full h-full p-4">
                    <Graph
                        data={dataMapped}
                        fill={true}
                        ticksX={ticks.ticksX}
                        ticksY={ticks.ticksY}
                        colors={greenGraph}
                        areaBaselineValue={minY}
                        peak={peak.x}
                        dataRange={props.urlParams.rangeParams.range}
                        loaded
                    />
                </div>
                <ServerStatistics serverData={serverData} />
            </Container>
        </>
    )
}
