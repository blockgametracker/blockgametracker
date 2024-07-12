import { PropsWithChildren } from "react"
import { ContainerTitle } from "@/components/layout/container/containerTitle"
import { PieChart } from "../../graphs/pieChart"
import { Container } from "@/components/layout/container/container"
import { PieChartData, ServerData } from "@/utils/parsedData"
import { PieChartEdition } from "@/components/graphs/pieChartEdition"
import { URLParams } from "@/utils/urlBuilder"
import { MinecraftEdition } from "@repo/gateway"

interface Props extends PropsWithChildren {
    urlParams: URLParams
    data: ServerData[]
    playersJava: number
    playersBedrock: number
}

export const CompareCharts = ({
    urlParams,
    data,
    playersJava,
    playersBedrock,
}: Props) => {
    const pieChartData: PieChartData[] = data.map((server) => ({
        id: server.server_slug,
        color: server.color,
        label: server.server_name,
        value: server.data[server.data.length - 1].y,
    }))

    const globalData = [...pieChartData]
    const editionData = [...pieChartData]

    const isJava = urlParams.edition === MinecraftEdition.JAVA

    return (
        <div className="flex flex-col tablet:flex-row gap-4 tablet:gap-8 tablet:overflow-hidden tablet:h-[12vw] shrink-0">
            <PieChartEdition
                data={globalData}
                label="Global players"
                editionsPlayerCount={playersJava + playersBedrock}
            />
            <PieChartEdition
                data={editionData}
                label={isJava ? "Java players" : "Bedrock players"}
                editionsPlayerCount={isJava ? playersJava : playersBedrock}
            />

            <Container className="flex flex-col w-full h-full overflow-hidden shadow-md dark:shadow-none">
                <ContainerTitle icon="chartpie">
                    <p>Selected servers overview</p>
                </ContainerTitle>
                <PieChart data={pieChartData} />
            </Container>
        </div>
    )
}
