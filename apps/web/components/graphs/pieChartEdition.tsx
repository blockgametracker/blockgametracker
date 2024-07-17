import { PropsWithChildren } from "react"
import { ContainerTitle } from "@/components/layout/container/containerTitle"
import { Container } from "@/components/layout/container/container"
import { PieChartData } from "@/utils/parsedData"
import { PieChart } from "./pieChart"

interface Props extends PropsWithChildren {
    data: PieChartData[]
    label: string
    editionsPlayerCount: number
}

export const PieChartEdition = ({
    data,
    label,
    editionsPlayerCount,
}: Props) => {
    const selectedPlayerCount = data.reduce((total, server) => {
        const lastPlayerCount = server.value
        return total + lastPlayerCount
    }, 0)

    const editionsData = [...data]

    if (data.length !== 0) {
        editionsData.unshift({
            id: "other",
            label: label,
            value: editionsPlayerCount - selectedPlayerCount,
        })
    }

    return (
        <Container className="flex flex-col w-full h-full overflow-hidden shadow-md dark:shadow-none">
            <ContainerTitle icon="chartpie">
                <p>{label} overview</p>
            </ContainerTitle>
            <PieChart data={editionsData} />
        </Container>
    )
}
