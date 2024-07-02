import { Container } from "@/components/layout/container/container"
import { Graph } from "@/components/graphs/graph"
import { getTicks } from "@/utils/graphUtils"
import { ServerButton } from "./serverButton"
import { ServerInfo } from "./serverInfo"
import { URLParams, buildURL } from "@/utils/urlBuilder"
import { ServerData } from "@/utils/parsedData"
import { ServerStatistics } from "./serverStatistics"
import { getPeakDate } from "@/utils/dataUtils"
import { getColor, lightTheme } from "@/utils/colorUtils"
import { Dropdown } from "../layout/dropdown/dropdown"
import { DropdownLink } from "../layout/dropdown/dropdownLink"

interface Props {
    urlParams: URLParams
    serverData: ServerData
    loaded: boolean
}

export const ServerCard = async ({ urlParams, serverData, loaded }: Props) => {
    const ticks = getTicks(serverData, 6)
    const peak = getPeakDate(serverData.data)
    const minY = Math.min(...serverData.data.map((item) => item.y))

    const graphData = [{
        id: serverData.server_slug,
        data: serverData.data,
        color: getColor(0)
    }]

    return (
        <Container
            id="servers"
            className={`relative fade flex w-full divide-y-2 divide-whiteBorder dark:divide-darkBorder p-0 flex-col shadow-md dark:shadow-none`}
        >
            <ServerInfo
                edition={urlParams.edition}
                serverData={serverData}
                className="p-4"
            >
                <div className={`inline-flex gap-2 ml-auto`}>
                    <Dropdown icon="ellipsis_vertical">
                        <DropdownLink href={`/servers/${urlParams.edition}/${serverData.server_slug}${buildURL(urlParams)}`}>Server dashboard</DropdownLink>
                        <DropdownLink href={`/compare/`}>Compare server</DropdownLink>
                    </Dropdown>
                </div>
            </ServerInfo>

            <div className="w-full h-48 p-4">
                <Graph
                    data={graphData}
                    fill={true}
                    areaBaselineValue={minY}
                    ticksX={ticks.ticksX}
                    ticksY={ticks.ticksY}
                    peak={peak.x}
                    start={urlParams.start}
                    loaded={loaded}
                />
            </div>
            <ServerStatistics serverData={serverData} />
        </Container>
    )
}
