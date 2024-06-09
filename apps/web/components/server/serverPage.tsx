import { getTicks, greenGraph } from "@/utils/graphUtils"
import { MinecraftEdition } from "@repo/gateway"
import { Graph } from "@/components/graphs/graph"
import { StatisticSmall } from "@/components/statistic/small"
import { getOnline, getServer } from "@/utils/dataFetcher"
import { Container } from "../layout/container"
import { ServerSection } from "./serverSection"
import { ServerStatistics } from "./serverStatistics"
import { getPeakDate } from "@/utils/dataUtils"
import { ServerInfo } from "./serverInfo"
import { ServerButton } from "./serverButton"
import { Filters } from "../filter/filters"
import { URLParams, buildURL } from "@/utils/urlBuilder"

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
        props.urlParams.start,
        props.urlParams.step,
    )
    const online = serverData.data[serverData.data.length - 1]
    const ticks = getTicks(serverData, 8)
    const dataMapped = [serverData]
    const peak = getPeakDate(serverData.data)
    const minY = Math.min(...serverData.data.map((item) => item.y))

    return (
        <>
            <Filters urlParams={props.urlParams} />
            
            <Container className="flex flex-col w-full h-96 tablet:w-4/6 tablet:h-full divide-y-2 divide-darkOverlay">
                <div className="flex w-full h-full p-4">
                    <Graph
                        data={dataMapped}
                        fill={true}
                        ticksX={ticks.ticksX}
                        ticksY={ticks.ticksY}
                        colors={greenGraph}
                        areaBaselineValue={minY}
                        peak={peak.x}
                        start={props.urlParams.start}
                        loaded
                    />
                </div>
                <ServerStatistics serverData={serverData} />
            </Container>

            <Container className="flex flex-col w-full tablet:w-1/6 h-fit border-r-2 divide-y-2 divide-darkOverlay bg-darkFill border-darkOverlay shrink-0">
                <div className="flex flex-row p-4 items-center">
                    <ServerInfo serverData={serverData} edition={props.urlParams.edition} />
                    <ServerButton
                        className="ml-auto"
                        ariaLabel="Compare server"
                        href={`/compare/${buildURL(props.urlParams, { servers: [serverData.server_slug.toLowerCase()] })}`}
                        iconName="compare"
                    />
                </div>
                <div className="flex flex-col px-4 divide-y-2 divide-darkOverlay">
                    <ServerSection title="Server information" icon="information">
                        <StatisticSmall title="Players" value={online.y.toLocaleString()} />
                        <StatisticSmall title="Host" value={server.hostname} />
                        <StatisticSmall title="Edition" value={props.edition.charAt(0).toUpperCase() + props.edition.slice(1)} />
                    </ServerSection>
                    <ServerSection title="Data information" icon="graph">
                        <StatisticSmall title="Data range" value={props.urlParams.start.toString().replace("-", "")} />
                        <StatisticSmall title="Data step" value={props.urlParams.step} />
                        <StatisticSmall title="Data points" value={serverData.data.length} />
                    </ServerSection>
                </div>
            </Container>
        </>
    )
}
