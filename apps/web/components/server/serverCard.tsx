import { Container } from "@/components/layout/container"
import { Graph } from "@/components/graphs/graph"
import { getTicks, greenGraph } from "@/utils/graphUtils"
import { ServerButton } from "./serverButton"
import { ServerInfo } from "./serverInfo"
import { URLParams, buildURL } from "@/utils/urlBuilder"
import { ServerData } from "@/utils/parsedData"
import { ServerStatistics } from "./serverStatistics"
import { getPeakDate } from "@/utils/dataUtils"

interface Props {
    urlParams: URLParams
    serverData: ServerData
    loaded: boolean
}

export const ServerCard = async ({ urlParams, serverData, loaded }: Props) => {
    const ticks = getTicks(serverData, 6)
    const dataMapped = [serverData]
    const peak = getPeakDate(serverData.data)
    const minY = Math.min(...serverData.data.map((item) => item.y))

    return (
        <Container
            id="servers"
            className={`fade flex w-full divide-y-2 divide-darkOverlay p-0 flex-col`}
        >
            <ServerInfo
                edition={urlParams.edition}
                serverData={serverData}
                className="p-4"
            >
                <div className={`inline-flex gap-2 ml-auto`}>
                    <ServerButton
                        rel="nofollow"
                        ariaLabel="Compare server"
                        href={`/compare/${buildURL(urlParams, { servers: [serverData.server_slug.toLowerCase()] })}`}
                        iconName="compare"
                        className="hidden phone:flex"
                    />
                    <ServerButton
                        ariaLabel="Open server"
                        href={`/server/${urlParams.edition}/${serverData.server_slug}${buildURL(urlParams)}`}
                        iconName="fullscreen"
                    />
                </div>
            </ServerInfo>

            <div className="w-full h-48 p-4">
                <Graph
                    data={dataMapped}
                    fill={true}
                    areaBaselineValue={minY}
                    ticksX={ticks.ticksX}
                    ticksY={ticks.ticksY}
                    colors={greenGraph}
                    peak={peak.x}
                    start={urlParams.start}
                    loaded={loaded}
                />
            </div>
            <ServerStatistics serverData={serverData} />
        </Container>
    )
}
