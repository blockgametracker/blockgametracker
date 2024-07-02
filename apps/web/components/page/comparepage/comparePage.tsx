"use client"

import { CompareItem, ServerData } from "@/utils/parsedData"
import { CompareItems } from "../../graphs/compareItems"
import { CompareCharts } from "./compareCharts"
import { CompareGraph } from "./compareGraph"
import { URLParams } from "@/utils/urlBuilder"
import { useState } from "react"
import { calculateAverage, getPeak } from "@/utils/dataUtils"
import { getColor } from "@/utils/colorUtils"

interface Props {
    servers: ServerData[]
    urlParams: URLParams
    playersJava: number
    playersBedrock: number
}

export const ComparePage = ({
    servers,
    urlParams,
    playersJava,
    playersBedrock,
}: Props) => {
    const [selectedServers, setSelectedServers] = useState<string[]>([]);

    let data: ServerData[] = servers
        .map((server, index) => ({
            server_edition: server.server_edition,
            server_name: server.server_name,
            server_slug: server.server_slug,
            hostname: server.hostname,
            data: server.data,
            icon: server.icon,
            color: getColor(index)
        }))

    data = data
        .filter(
            (server): server is ServerData =>
                server !== null && selectedServers.includes(server.server_slug),
        )

    const compareItems: CompareItem[] =
        servers.map((server) => ({
            slug: server.server_slug,
            name: server.server_name,
            current: server.data[server.data.length - 1].y,
            mean: calculateAverage(server.data),
            max: getPeak(server.data),
            icon: server.icon,
            color: server.color,
        })) ?? []

    return (
        <>
            <div className="w-full h-full flex flex-col gap-8 tablet:overflow-hidden">
                <CompareGraph
                    data={data}
                    urlParams={urlParams}
                />
                <CompareCharts
                    urlParams={urlParams}
                    data={data}
                    playersJava={playersJava}
                    playersBedrock={playersBedrock}
                />
            </div>
            <CompareItems
                sessionStorageID={`${urlParams.edition}SelectedServers`}
                compareItems={compareItems}
                selectedItems={selectedServers}
                setSelectedItems={setSelectedServers}
            />
        </>
    )
}
