import { Container, Section } from "@/components/layout/content"
import { Layout } from "@/components/layout"
import { Graph } from "@/components/graphs/graph"
import { getTotalEnsembled } from "@/utils/dataFetcher"
import { GRAPH_COLORS, TickResult, getTicks } from "@/utils/graphUtils"
import { GraphLegend } from "@/components/graphs/graphLegend"
import type { PageParams } from "@/utils/next"
import type { Metadata } from "next"
import { getURLParams } from "@/utils/urlBuilder"
import { MinecraftEdition } from "@repo/gateway"
import { ComputedServerData } from "@/utils/parsedData"

export const metadata: Metadata = {
    // TODO
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
    const urlServers: string[] =
        searchParams?.servers?.split(",").map((server) => server.trim()) || []

    const urlParams = getURLParams(
        searchParams?.range,
        searchParams?.edition,
        searchParams?.servers,
        searchParams?.showServers,
    )

    const servers = await getTotalEnsembled(
        urlParams.edition as MinecraftEdition,
        urlParams.rangeParams.start,
        urlParams.rangeParams.step,
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
        <Layout page="Compare">
            <Section className="w-full h-full">
                <h2 className="text-3xl">Compare servers</h2>
                <div className="flex flex-col w-full h-full gap-4">
                    <Container className="p-4 col-span-6 w-full h-2/3 tablet:h-1/2">
                        {selectedServers.length !== 0 ? (
                            <Graph
                                data={selectedServers}
                                colors={GRAPH_COLORS}
                                ticksX={ticks.ticksX}
                                ticksY={ticks.ticksY}
                                fill={false}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <p>Select servers to start comparing</p>
                            </div>
                        )}
                    </Container>
                    <GraphLegend
                        urlParams={urlParams}
                        servers={servers}
                        selectedServers={selectedServers}
                    />
                </div>
            </Section>
        </Layout>
    )
}

export default Compare
