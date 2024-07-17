import { Graph } from "@/components/graphs/graph"
import { Container } from "@/components/layout/container/container"
import { ContainerTitle } from "@/components/layout/container/containerTitle"
import { TickResult, computeServerData, getTicks } from "@/utils/graphUtils"
import { ASData, GraphData } from "@/utils/parsedData"
import { URLParams } from "@/utils/urlBuilder"

interface Props {
    data: ASData[]
    urlParams: URLParams
}

export const ASStatsGraph = ({ data, urlParams }: Props) => {
    const graphData: GraphData[] =
        data.map((item) => {
            return {
                id: item.name,
                color: item.color,
                data: item.data,
            }
        }) ?? []

    let ticks: TickResult = {
        ticksX: data[0] ? getTicks(data[0], 6).ticksX : [""],
        ticksY: data[0] ? getTicks(computeServerData(data), 0).ticksY : [0],
    }

    return (
        <Container className="flex flex-col w-full tablet:h-[88vw] tablet:overflow-hidden">
            <ContainerTitle icon="graph">
                <p>Playercount (per AS, per edition)</p>
            </ContainerTitle>
            <div className="h-96 tablet:h-full">
                <Graph
                    data={graphData}
                    ticksX={ticks.ticksX}
                    ticksY={ticks.ticksY}
                    start={urlParams.start}
                    className="p-4"
                    fill={true}
                    loaded
                />
            </div>
        </Container>
    )
}
