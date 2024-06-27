import type { Metadata } from "next"
import { Layout } from "@/components/layout"
import { getURLParams } from "@/utils/urlBuilder"
import { PageParams } from "@/utils/next"
import { getASTotalEnsembled } from "@/utils/dataFetcher"
import { ASStatsPage } from "@/components/page/as-statistics/asStatsPage"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "AS Statistics | blockgametracker",
        alternates: {
            canonical: "https://blockgametracker.gg/as-statistics",
        },
        keywords: [
            "blockgame",
            "minecraft",
            "minecraft server",
            "minecraft playercout",
            "player tracker",
            "minecraft list",
        ],
    }
}

const Page = async ({ searchParams }: PageParams) => {
    const urlParams = getURLParams(searchParams)

    let data = await getASTotalEnsembled(
        urlParams.edition,
        urlParams.start,
        urlParams.step,
    )

    return (
        <Layout
            page="as-statistics"
            className="w-full h-full flex flex-col gap-8 tablet:overflow-hidden"
            urlParams={urlParams}
        >
            {data &&
                <ASStatsPage data={data} urlParams={urlParams} />
            }
        </Layout>
    )
}

export default Page
