"use client"

import { Graph } from "@/components/graphs/graph"
import { getTicks } from "@/utils/graphUtils"
import { ServerInfo } from "./serverInfo"
import { URLParams, buildURL } from "@/utils/urlBuilder"
import { ServerData } from "@/utils/parsedData"
import { ServerStatistics } from "./serverStatistics"
import { getPeakDate } from "@/utils/dataUtils"
import { getColor, lightTheme } from "@/utils/colorUtils"
import { Dropdown } from "../layout/dropdown/dropdown"
import { DropdownLink } from "../layout/dropdown/dropdownLink"
import { DropdownButton } from "../layout/dropdown/dropdownButton"

interface Props {
    urlParams: URLParams
    serverData: ServerData
    loaded: boolean
}

export const ServerCard = async ({ urlParams, serverData, loaded }: Props) => {
    const ticks = getTicks(serverData, 6)
    const peak = getPeakDate(serverData.data)
    const minY = Math.min(...serverData.data.map((item) => item.y))

    const graphData = [
        {
            id: serverData.server_slug,
            data: serverData.data,
            color: getColor(0),
        },
    ]

    //TODO probably change the way this redirects
    const handleClick = () => {
        sessionStorage.setItem(
            `${serverData.server_edition}SelectedServers`,
            serverData.server_slug,
        )
        window.location.href = `/compare/${buildURL(urlParams)}`
    }

    return (
        <>
            <ServerInfo
                edition={urlParams.edition}
                serverData={serverData}
                className="p-4"
            >
                <Dropdown
                    id={`dropdown-${serverData.server_slug?.toLowerCase()}`}
                    icon="ellipsis_vertical"
                    className="ml-auto"
                >
                    <DropdownLink
                        href={`/servers/${urlParams.edition}/${serverData.server_slug}${buildURL(urlParams)}`}
                    >
                        Server dashboard
                    </DropdownLink>
                    <DropdownButton onClick={() => handleClick()}>
                        Compare server
                    </DropdownButton>
                </Dropdown>
            </ServerInfo>

            <div
                id={`server-${serverData.server_slug}-graph`}
                className="w-full h-48 p-4"
            >
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
        </>
    )
}
