import { DarkContainer, Section } from "@/components/layout/content"
import { Layout } from "@/components/layout"
import { Graph } from "@/components/graphs/graph"
import { getTotalEnsembled } from "@/utils/dataFetcher"
import { GRAPH_COLORS, getTicks } from "@/utils/graphUtils"
import { GraphLegend } from "@/components/graphs/graphLegend"
import { getRangeParams, searchParamToRange } from "@/utils/dataRange"
import type { PageParams } from "@/utils/next"
import type { Metadata } from "next"
import { getURLParams } from "@/utils/urlBuilder"

export const metadata: Metadata = {
    // TODO
    title: "Compare | Blockgametracker",
}

const Compare = async ({ searchParams }: PageParams) => {
    const urlServers: string[] = searchParams?.servers?.split(',').map(server => server.trim()) || []

    const urlParams = getURLParams(
        searchParams?.range,
        searchParams?.edition,
        searchParams?.compact,
        urlServers,
    )

    const servers = await getTotalEnsembled(
        "java",
        urlParams.rangeParams.start,
        urlParams.rangeParams.step,
    )

    const filteredServers = servers.filter(server => {
        if(server === null)
            return null
        const serverName = server.server_name
        if (urlServers.includes(serverName))
            return {
                server_name: server.server_name,
                id: server.server_name,
                data: server.data
            }
    });

    const ticks = getTicks(servers[0], 3)

    return (
        <Layout page="Compare">
            <Section className="w-full h-full">
                <h2 className="text-3xl">Compare servers</h2>
                <div className="grid grid-cols-6 w-full h-full gap-4">
                    <DarkContainer className="col-span-6 tablet:col-span-5 w-full h-full overflow-hidden">
                        <Graph
                            data={filteredServers}
                            colors={GRAPH_COLORS}
                            ticksX={ticks.ticksX}
                            ticksY={ticks.ticksY}
                            fill={false}
                        />
                    </DarkContainer>
                    <GraphLegend urlParams={urlParams} servers={servers} />
                </div>
            </Section>
        </Layout>
    )
}

export default Compare
