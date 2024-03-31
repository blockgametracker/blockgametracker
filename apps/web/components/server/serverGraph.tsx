import { ServerData } from "@/components/server/serverCard"
import { getOnlineInRange } from "@repo/gateway"
import { convertTime } from "@/utils/dataUtils"
import Graph from "@/components/graphs/graph"
import { getTicks, greenGraph } from "@/utils/graphUtils"

const ServerGraph = async ({ hostname }: { hostname: string }) => {
    const onlineInRange = await getOnlineInRange(hostname, "java", "-1d", "2m")

    const serverArray: ServerData[] = [
        {
            id: hostname,
            data: convertTime(onlineInRange.data),
        },
    ]
    const ticks = getTicks(serverArray, 8)

    return (
        <Graph
            data={serverArray}
            fill={true}
            ticksX={ticks.ticksX}
            ticksY={ticks.ticksY}
            colors={greenGraph}
        />
    )
}

export default ServerGraph
