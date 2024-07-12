import { PieChart } from "@/components/graphs/pieChart"
import { Container } from "@/components/layout/container/container"
import { ContainerTitle } from "@/components/layout/container/containerTitle"
import { ASData, PieChartData } from "@/utils/parsedData"

interface Props {
    data: ASData[]
}

export const ASStatsPieChart = ({ data }: Props) => {
    const pieChartData: PieChartData[] =
        data.map((item) => ({
            id: item.name,
            color: item.color,
            label: item.name,
            value: item.data[item.data.length - 1].y,
        })) ?? []

    return (
        <Container className="flex flex-col w-full tablet:w-1/2">
            <ContainerTitle icon="chartpie">
                <p>Playercount (global, per AS, per edition)</p>
            </ContainerTitle>
            <PieChart data={pieChartData} />
        </Container>
    )
}
