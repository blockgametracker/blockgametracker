import type { PageParams } from "@/utils/next"
import { ServerPage } from "@/components/page/serverpage/serverPage"
import type { Metadata } from "next"
import { Layout } from "@/components/layout"
import { MinecraftEdition, getEnsembledTotal, getServerBySlug } from "@repo/gateway"
import { notFound } from "next/navigation"
import { getURLParams } from "@/utils/urlBuilder"
import { getOnline } from "@/utils/dataFetcher"
import { ServerInformation } from "@/components/page/serverpage/serverInformation"
import { PieChartEdition } from "@/components/graphs/pieChartEdition"
import { Container } from "@/components/layout/container/container"
import { ServerHeader } from "@/components/page/serverpage/serverHeader"
import { PieChartData } from "@/utils/parsedData"
import { BarChart } from "@/components/graphs/barChart"
import { ContainerTitle } from "@/components/layout/container/containerTitle"
import { BarDatum } from "@nivo/bar"
import { getColor } from "@/utils/colorUtils"

interface Params {
    server: string
    edition: MinecraftEdition
}

export async function generateMetadata({
    params,
}: PageParams<Params>): Promise<Metadata> {
    const serverInfo = await getServerBySlug(params.edition, params.server)

    if (!serverInfo) return notFound()

    return {
        title: `${serverInfo.name} | blockgametracker`,
        alternates: {
            canonical: `https://blockgametracker.gg/server/${serverInfo.platform}/${serverInfo.slug.toLowerCase()}`,
        },
        keywords: [
            "blockgame",
            "minecraft",
            "minecraft server",
            "minecraft playercout",
            "player tracker",
            "minecraft list",
            serverInfo.name,
        ],
    }
}

const Page = async ({ params, searchParams }: PageParams<Params>) => {
    const urlParams = getURLParams(searchParams)
    const serverInfo = await getServerBySlug(params.edition, params.server)
    const [playersJava, playersBedrock] = (
        await Promise.all([
            getEnsembledTotal(MinecraftEdition.JAVA),
            getEnsembledTotal(MinecraftEdition.BEDROCK),
        ])
    ).map((total) => total?.data.y ?? 0)

    if (!serverInfo) return notFound()

    const serverData = await getOnline(
        serverInfo,
        params.edition,
        urlParams.start,
        urlParams.step,
    )

    const serverData7d = await getOnline(
        serverInfo,
        params.edition,
        "-7d",
        "1d",
    )

    const pieChartData: PieChartData = {
        id: serverData.server_slug,
        color: serverData.color,
        label: serverData.server_name,
        value: serverData.data[serverData.data.length - 1].y,
    }

    const barChartData: BarDatum[] = serverData7d.data.map((data) => {
        return {
            color: getColor(0),
            x: data.x,
            y: data.y,
        }
    })

    return (
        <Layout
            page={serverInfo.name}
            className="flex flex-col gap-8 tablet:overflow-hidden"
            urlParams={urlParams}
        >
            <ServerHeader serverData={serverData} urlParams={urlParams} />
            <div className="flex flex-col tablet:flex-row gap-8 w-full h-full">
                <div className="flex flex-col gap-8 w-full">
                    <ServerPage serverData={serverData} urlParams={urlParams} />
                    <div className="w-full h-2/5 flex flex-row gap-4">
                        <PieChartEdition
                            data={[pieChartData]}
                            label="Global players"
                            editionsPlayerCount={playersJava + playersBedrock}
                        />
                        <PieChartEdition
                            data={[pieChartData]}
                            label="Java players"
                            editionsPlayerCount={playersJava}
                        />
                        <Container className="flex flex-col w-3/5 h-full overflow-hidden shrink-0">
                            <ContainerTitle>
                                <p>(7d)</p>
                            </ContainerTitle>
                            <div className="w-full h-full p-4">
                                <BarChart data={barChartData} />
                            </div>
                        </Container>
                    </div>
                </div>
                <ServerInformation
                    serverData={serverData}
                    urlParams={urlParams}
                />
            </div>
        </Layout>
    )
}

export default Page
