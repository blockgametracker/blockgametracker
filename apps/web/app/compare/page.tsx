import { Layout } from "@/components/layout"
import { getTotalEnsembled } from "@/utils/dataFetcher"
import type { PageParams } from "@/utils/next"
import type { Metadata } from "next"
import { MinecraftEdition } from "@repo/gateway"
import { PieChartData, ServerData } from "@/utils/parsedData"
import { CompareServers } from "@/components/page/comparepage/compareServers"
import { Filters } from "@/components/filter/filters"
import { getURLParams } from "@/utils/urlBuilder"
import { CompareCharts } from "@/components/page/comparepage/compareCharts"
import { CompareGraph } from "@/components/page/comparepage/compareGraph"
import { getPlayerCountFromList } from "@/utils/dataUtils"

export const metadata: Metadata = {
    title: "Compare | blockgametracker",
    alternates: {
        canonical: "https://blockgametracker.gg/compare",
    },
    keywords: [
        "blockgame",
        "server compare",
        "minecraft",
        "minecraft server",
        "minecraft playercout",
        "player tracker",
        "minecraft list",
    ],
}

const Compare = async ({ searchParams }: PageParams) => {
    const urlParams = getURLParams(searchParams)
    const urlServers: string[] =
        searchParams?.servers?.split(",").map((server) => server.trim()) || []

    const servers = await getTotalEnsembled(
        urlParams.edition as MinecraftEdition,
        urlParams.start,
        urlParams.step,
    )

    const lineGraphData: ServerData[] = servers
        .filter(
            (server): server is ServerData =>
                server !== null && urlServers.includes(server.server_slug),
        )
        .map((server) => ({
            server_edition: server.server_edition,
            server_name: server.server_name,
            server_slug: server.server_slug,
            hostname: server.hostname,
            data: server.data,
            icon: server.icon,
        }))

    return (
        <Layout
            page="Compare"
            className="flex flex-col gap-8 overflow-hidden"
            urlParams={urlParams}
        >
            <div className="w-full h-full flex flex-row gap-8 overflow-hidden">
                <div className="w-full h-full flex flex-col gap-8 overflow-hidden">
                    <CompareGraph data={lineGraphData} urlParams={urlParams} />
                    <CompareCharts
                        data={lineGraphData}
                        urlServers={urlServers}
                    />
                </div>
                <CompareServers
                    urlParams={urlParams}
                    servers={servers}
                    urlServers={urlServers}
                />
            </div>
        </Layout>
    )
}

export default Compare
