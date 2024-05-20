import { Container, DarkContainer } from "@/components/layout/content"
import { Graph } from "@/components/graphs/graph"
import { getTicks, greenGraph } from "@/utils/graphUtils"
import { ServerButton } from "../button/serverButton"
import { ServerInfo } from "./serverInfo"
import { URLParams, buildURL } from "@/utils/urlBuilder"
import { ServerData } from "@/utils/parsedData"
import { ServerStatistics } from "./serverStatistics"
import { getPeakDate } from "@/utils/dataUtils"

interface Props {
    urlParams: URLParams
    serverData: ServerData
}

export const ServerCard = async ({ urlParams, serverData }: Props) => {
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
                <div
                    className={`inline-flex gap-2 ml-auto`}
                >
                    <ServerButton
                        ariaLabel="Compare server"
                        href={`/compare/${buildURL(urlParams.rangeParams, null, urlParams.edition, [serverData.server_name], null)}`}
                        iconName="compare"
                    />
                    <ServerButton
                        ariaLabel="Open server"
                        href={`/server/${urlParams.edition}/${serverData.server_name.replace(" ", "_")}${buildURL(urlParams.rangeParams, null, urlParams.edition, urlParams.servers, null)}`}
                        iconName="fullscreen"
                    />
                </div>
            </ServerInfo>

            {!urlParams.compact && (
                <div className="w-full h-48 p-4">
                    <Graph
                        data={dataMapped}
                        fill={true}
                        areaBaselineValue={minY}
                        ticksX={ticks.ticksX}
                        ticksY={ticks.ticksY}
                        colors={greenGraph}
                        peak={peak.x}
                        dataRange={urlParams.rangeParams.range}
                    />
                </div>
            )}
            <ServerStatistics
                compact={urlParams.compact}
                serverData={serverData}
            />
        </Container>
    )
}
