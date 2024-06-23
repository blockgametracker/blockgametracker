import { getTicks, greenGraph } from "@/utils/graphUtils"
import { Graph } from "@/components/graphs/graph"
import { Container } from "../../layout/container/container"
import { ServerStatistics } from "../../server/serverStatistics"
import { getPeakDate } from "@/utils/dataUtils"
import { URLParams } from "@/utils/urlBuilder"
import { ServerData } from "@/utils/parsedData"
import { ContainerTitle } from "@/components/layout/container/containerTitle"

interface Props {
    serverData: ServerData
    urlParams: URLParams
}

export const ServerPage = async ({ serverData, urlParams }: Props) => {
    const ticks = getTicks(serverData, 8)
    const dataMapped = [serverData]
    const peak = getPeakDate(serverData.data)
    const minY = Math.min(...serverData.data.map((item) => item.y))

    return (
        <Container className="flex flex-col w-full h-96 tablet:w-full tablet:h-full">
            <ContainerTitle>
                <p>{serverData.server_name} overview</p>
            </ContainerTitle>
            <div className="flex w-full h-96 tablet:h-full p-4 border-b-2 border-darkOverlay">
                <Graph
                    data={dataMapped}
                    fill={true}
                    ticksX={ticks.ticksX}
                    ticksY={ticks.ticksY}
                    colors={greenGraph}
                    areaBaselineValue={minY}
                    peak={peak.x}
                    start={urlParams.start}
                    loaded
                />
            </div>
            <ServerStatistics serverData={serverData} />
        </Container>
    )
}
