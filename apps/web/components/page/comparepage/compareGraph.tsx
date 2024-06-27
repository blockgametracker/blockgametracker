import { PropsWithChildren } from "react"
import { URLParams } from "@/utils/urlBuilder"
import { ContainerTitle } from "@/components/layout/container/containerTitle"
import { Container } from "@/components/layout/container/container"
import { TickResult, computeServerData, getTicks } from "@/utils/graphUtils"
import { ServerData } from "@/utils/parsedData"
import { Graph } from "../../graphs/graph"
import { Icon } from "@/components/icon"

interface Props extends PropsWithChildren {
    data: ServerData[]
    urlParams: URLParams
}

export const CompareGraph = ({ data, urlParams }: Props) => {
    const graphData = data.map((data) => {
        return {
            id: data.server_name,
            color: data.color,
            data: data.data,
        }
    })

    let ticks: TickResult = {
        ticksX: data[0] ? getTicks(data[0], 6).ticksX : [""],
        ticksY: data[0] ? getTicks(computeServerData(data), 0).ticksY : [0],
    };

    return (
        <Container className="flex flex-col w-full tablet:h-[88vw]">
            <ContainerTitle>
                <p>Selected servers overview</p>
            </ContainerTitle>
            <div className="w-full h-full p-4">
                {data.length !== 0 ? (
                    <Graph
                        data={graphData}
                        ticksX={ticks.ticksX}
                        ticksY={ticks.ticksY}
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
        </Container>
    )
}
