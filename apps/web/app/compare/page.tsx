import { Container } from "@/components/layout/container"
import { Layout } from "@/components/layout"
import { Graph } from "@/components/graphs/graph"
import { getTotalEnsembled } from "@/utils/dataFetcher"
import { GRAPH_COLORS, TickResult, getTicks } from "@/utils/graphUtils"
import type { PageParams } from "@/utils/next"
import type { Metadata } from "next"
import { MinecraftEdition } from "@repo/gateway"
import { ComputedServerData } from "@/utils/parsedData"
import { GraphServers } from "@/components/graphs/graphServers"
import { Icon } from "@/components/icon"
import { Filters } from "@/components/filter/filters"
import { getURLParams } from "@/utils/urlBuilder"
import { Content } from "@/components/layout/content"

export const metadata: Metadata = {
    title: "Compare | blockgametracker",
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

    const selectedServers = servers.filter((server) => {
        if (server === null) return null

        if (urlServers.includes(server.server_slug))
            return {
                server_name: server.server_name,
                server_slug: server.server_slug,
                hostname: server.hostname,
                data: server.data,
            }
    })

    let ticks: TickResult = {
        ticksX: selectedServers[0]
            ? getTicks(selectedServers[0], 6).ticksX
            : [""],
        ticksY: selectedServers[0]
            ? getTicks(
                selectedServers.reduce(
                    (acc, curr) => {
                        acc.data.push(
                            ...curr.data.map((data) => {
                                return {
                                    x: data.x,
                                    y: data.y,
                                }
                            }),
                        )
                        return acc
                    },
                    { data: [] } as ComputedServerData,
                ),
                0,
            ).ticksY
            : [0],
    }

    return (
        <Layout
            page="Compare"
            className="flex flex-col tablet:flex-row w-full tablet:h-full justify-end tablet:overflow-hidden"
            urlParams={urlParams}
        >
            <Filters urlParams={urlParams} />

            <Content>
                <Container className="p-4 w-full h-96 tablet:h-full">
                    {selectedServers.length !== 0 ? (
                        <Graph
                            data={selectedServers}
                            colors={GRAPH_COLORS}
                            ticksX={ticks.ticksX}
                            ticksY={ticks.ticksY}
                            fill={false}
                            start={urlParams.start}
                            loaded
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col gap-4 items-center justify-center animate-pulse">
                            <Icon
                                iconName="icon"
                                className="w-6 h-6 fill-mainColor"
                            />
                            <p>Select servers to start comparing</p>
                        </div>
                    )}
                </Container>

                <GraphServers urlParams={urlParams} servers={servers} />
            </Content>
        </Layout>
    )
}

export default Compare
