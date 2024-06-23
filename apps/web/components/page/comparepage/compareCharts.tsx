import { PropsWithChildren } from "react"
import { ContainerTitle } from "@/components/layout/container/containerTitle"
import { PieChart } from "../../graphs/pieChart"
import { Container } from "@/components/layout/container/container"
import { GRAPH_COLORS } from "@/utils/graphUtils"
import { PieChartData, ServerData } from "@/utils/parsedData"
import { MinecraftEdition, getEnsembledTotal } from "@repo/gateway"
import { getPlayerCountFromList } from "@/utils/dataUtils"
import { PieChartEdition } from "@/components/graphs/pieChartEdition"

interface Props extends PropsWithChildren {
    data: ServerData[]
    urlServers: string[]
}

export const CompareCharts = async ({ data, urlServers }: Props) => {
    const selectedPlayerCount = getPlayerCountFromList(data)
    const [playersJava, playersBedrock] = (
        await Promise.all([
            getEnsembledTotal(MinecraftEdition.JAVA),
            getEnsembledTotal(MinecraftEdition.BEDROCK),
        ])
    ).map((total) => total?.data.y ?? 0)

    const pieChartData: PieChartData[] = data.map((server) => ({
        id: server.server_slug,
        label: server.server_name,
        value: server.data[server.data.length - 1].y,
    }))

    const globalData = [...pieChartData]
    const javaData = [...pieChartData]
    const colors = [...GRAPH_COLORS]

    if (data.length !== 0) {
        globalData.unshift({
            id: "other",
            label: "Global servers",
            value: playersJava + playersBedrock - selectedPlayerCount,
        })
        javaData.unshift({
            id: "other",
            label: "Java servers",
            value: playersJava - selectedPlayerCount,
        })
        colors.unshift("#1f1f21")
    }

    return (
        <div className="flex flex-row gap-8 overflow-hidden h-2/5">
            <PieChartEdition
                data={data}
                label="Global players"
                minecraftEditions={[
                    MinecraftEdition.JAVA,
                    MinecraftEdition.BEDROCK,
                ]}
            />
            <PieChartEdition
                data={data}
                label="Java players"
                minecraftEditions={[MinecraftEdition.JAVA]}
            />

            <Container className="flex flex-col w-full h-full overflow-hidden">
                <ContainerTitle>
                    <p>Selected servers overview</p>
                </ContainerTitle>
                <PieChart data={pieChartData} colors={GRAPH_COLORS} />
            </Container>
        </div>
    )
}
