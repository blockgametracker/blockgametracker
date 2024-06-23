import { PropsWithChildren } from "react"
import { URLParams } from "@/utils/urlBuilder"
import { ContainerTitle } from "@/components/layout/container/containerTitle"
import { Container } from "@/components/layout/container/container"
import { GRAPH_COLORS, TickResult, getTicks } from "@/utils/graphUtils"
import { ComputedServerData, ServerData } from "@/utils/parsedData"
import { Graph } from "../../graphs/graph"
import { Icon } from "@/components/icon"
import { GraphLegend } from "../../graphs/graphLegend"

interface Props extends PropsWithChildren {
    data: ServerData[]
    urlParams: URLParams
}

export const CompareGraph = ({ data, urlParams }: Props) => {
    let ticks: TickResult = {
        ticksX: data[0] ? getTicks(data[0], 6).ticksX : [""],
        ticksY: data[0]
            ? getTicks(
                  data.reduce(
                      (acc, curr) => {
                          acc.data.push(
                              ...curr.data.map((serverData) => {
                                  return {
                                      x: serverData.x,
                                      y: serverData.y,
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
        <Container className="flex flex-col w-full h-full">
            <ContainerTitle>
                <p>Selected servers overview</p>
            </ContainerTitle>
            <div className="w-full h-full p-4">
                {data.length !== 0 ? (
                    <Graph
                        data={data}
                        colors={GRAPH_COLORS}
                        ticksX={ticks.ticksX}
                        ticksY={ticks.ticksY}
                        fill={false}
                        start={urlParams.start}
                        loaded
                    />
                ) : (
                    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
                        <Icon
                            iconName="icon"
                            className="w-6 h-6 fill-mainColor"
                        />
                        <p>No data found, select servers to start comparing</p>
                    </div>
                )}
            </div>
            <GraphLegend
                className="p-4 gap-4 flex flex-row border-t-2 border-darkOverlay"
                servers={data.map((item) => item.server_name)}
                colors={GRAPH_COLORS}
            />
        </Container>
    )
}
