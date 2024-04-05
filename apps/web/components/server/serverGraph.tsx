import { ServerData } from "@/components/server/serverCard"
import { getOnlineInRange } from "@repo/gateway"
import { convertTime } from "@/utils/dataUtils"
import Graph from "@/components/graphs/graph"
import { getTicks, greenGraph } from "@/utils/graphUtils"
import { DataRangeParams } from "@/utils/dataRange"

const ServerGraph = async ({
    hostname,
    rangeParams,
}: {
    hostname: string
    rangeParams: DataRangeParams
}) => {
    const onlineInRange = await getOnlineInRange(
        hostname,
        "java",
        rangeParams.start,
        rangeParams.step,
    )

    const serverArray: ServerData[] = [
        {
            id: hostname,
            data: convertTime(onlineInRange.data),
        },
    ]
    const ticks = getTicks(serverArray, 8, rangeParams.range)

    return (
        <Graph
            data={serverArray}
            fill={true}
            ticksX={ticks.ticksX}
            ticksY={true}
            colors={greenGraph}
        />
    )
}

export default ServerGraph