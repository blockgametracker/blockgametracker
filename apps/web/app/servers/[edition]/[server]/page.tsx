import type { PageParams } from "@/utils/next"
import { ServerPage } from "@/components/page/serverpage/serverPage"
import type { Metadata } from "next"
import { Layout } from "@/components/layout"
import { MinecraftEdition, getServerBySlug } from "@repo/gateway"
import { notFound } from "next/navigation"
import { getURLParams } from "@/utils/urlBuilder"
import { getOnline } from "@/utils/dataFetcher"
import { ServerHeader } from "@/components/page/serverpage/serverHeader"
import { ServerInformation } from "@/components/page/serverpage/serverInformation"
import { PieChartEdition } from "@/components/graphs/pieChartEdition"

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

const Server = async ({ params, searchParams }: PageParams<Params>) => {
    const urlParams = getURLParams(searchParams)
    const serverInfo = await getServerBySlug(params.edition, params.server)

    if (!serverInfo) return notFound()

    const serverData = await getOnline(
        serverInfo,
        params.edition,
        urlParams.start,
        urlParams.step,
    )

    return (
        <Layout
            page={serverInfo.name}
            className="flex flex-col gap-8 tablet:overflow-hidden"
            urlParams={urlParams}
        >
            <ServerHeader serverData={serverData} urlParams={urlParams} />
            <div className="flex flex-col tablet:flex-row gap-8 w-full h-full">
                <div className="w-full tablet:w-[24vw] flex flex-col gap-8">
                    <PieChartEdition
                        data={[serverData]}
                        label="Global players"
                        minecraftEditions={[
                            MinecraftEdition.BEDROCK,
                            MinecraftEdition.JAVA,
                        ]}
                    />
                    <PieChartEdition
                        data={[serverData]}
                        label="Java players"
                        minecraftEditions={[MinecraftEdition.JAVA]}
                    />
                </div>
                <ServerPage serverData={serverData} urlParams={urlParams} />
                <ServerInformation
                    serverData={serverData}
                    urlParams={urlParams}
                />
            </div>
        </Layout>
    )
}

export default Server
