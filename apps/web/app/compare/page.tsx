import { Layout } from "@/components/layout"
import { getTotalEnsembled } from "@/utils/dataFetcher"
import type { PageParams } from "@/utils/next"
import type { Metadata } from "next"
import { MinecraftEdition, getEnsembledTotal } from "@repo/gateway"
import { getURLParams } from "@/utils/urlBuilder"
import { ComparePage } from "@/components/page/comparepage/comparePage"

export const metadata: Metadata = {
    title: "Compare | blockgametracker",
    alternates: {
        canonical: "https://blockgametracker.gg/compare",
    },
    keywords: [
        "blockgame",
        "server compare",
        "minecraft",
        "minecraft server",
        "minecraft playercout",
        "player tracker",
        "minecraft list",
    ],
}

const Page = async ({ searchParams }: PageParams) => {
    const urlParams = getURLParams(searchParams)
    const [playersJava, playersBedrock] = (
        await Promise.all([
            getEnsembledTotal(MinecraftEdition.JAVA),
            getEnsembledTotal(MinecraftEdition.BEDROCK),
        ])
    ).map((total) => total?.data.y ?? 0)

    const servers = await getTotalEnsembled(
        urlParams.edition as MinecraftEdition,
        urlParams.start,
        urlParams.step,
    )

    return (
        <Layout
            page="Compare"
            className="w-full h-full flex flex-col tablet:flex-row gap-8 tablet:overflow-hidden"
            urlParams={urlParams}
        >
            <ComparePage servers={servers} urlParams={urlParams} playersJava={playersJava} playersBedrock={playersBedrock} />
        </Layout>
    )
}

export default Page
