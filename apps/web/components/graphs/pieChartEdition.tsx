import { PropsWithChildren } from "react"
import { ContainerTitle } from "@/components/layout/container/containerTitle"
import { Container } from "@/components/layout/container/container"
import { GRAPH_COLORS } from "@/utils/graphUtils"
import { PieChartData, ServerData } from "@/utils/parsedData"
import { MinecraftEdition, getEnsembledTotal } from "@repo/gateway"
import { getPlayerCountFromList } from "@/utils/dataUtils"
import { PieChart } from "./pieChart"

interface Props extends PropsWithChildren {
    data: ServerData[]
    label: string
    minecraftEditions: MinecraftEdition[]
}

export const PieChartEdition = async ({
    data,
    label,
    minecraftEditions,
}: Props) => {
    const selectedPlayerCount = getPlayerCountFromList(data)

    const playersEditions = (
        await Promise.all(
            minecraftEditions.map((edition) => getEnsembledTotal(edition)),
        )
    ).reduce((acc, total) => acc + (total?.data.y ?? 0), 0)

    const pieChartData: PieChartData[] = data.map((server) => ({
        id: server.server_slug,
        label: server.server_name,
        value: server.data[server.data.length - 1].y,
    }))

    const editionsData = [...pieChartData]
    const editionsColors = [...GRAPH_COLORS]

    if (data.length !== 0) {
        editionsData.unshift({
            id: "other",
            label: label,
            value: playersEditions - selectedPlayerCount,
        })
        editionsColors.unshift("#1f1f21")
    }

    return (
        <Container className="flex flex-col w-full h-full overflow-hidden">
            <ContainerTitle>
                <p>{label} overview</p>
            </ContainerTitle>
            <PieChart data={editionsData} colors={editionsColors} />
        </Container>
    )
}
