import { Section } from "@/components/content"
import Layout from "@/components/layout"
import { usePathname, useSearchParams } from "next/navigation"
import { ServerData } from "@/components/server/serverCard"
import { getOnlineInRange } from "@repo/gateway"
import { convertTime } from "@/utils/dataUtils"
import Graph from "@/components/graphs/graph"
import { greenGraph } from "@/utils/graphUtils"
import App from "next/app"

const Server = async ({ hostname }: { hostname: string }) => {
    const onlineInRange = await getOnlineInRange(hostname, "java", "-1d", "4m")

    const serverArray: ServerData[] = [
        {
            id: hostname,
            data: convertTime(onlineInRange.data),
        },
    ]

    return (
        <Graph
            data={serverArray}
            fill={true}
            ticksX={[]}
            ticksY={[]}
            colors={greenGraph}
        />
    )
}

export default Server
