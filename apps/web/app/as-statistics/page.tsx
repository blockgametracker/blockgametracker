import type { Metadata } from "next"
import { Layout } from "@/components/layout"
import { Suspense } from "react"
import { getURLParams } from "@/utils/urlBuilder"
import { PageParams } from "@/utils/next"
import { ASStatisticsHeader } from "@/components/page/as-statistics/asStatisticsHeader"

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

const Server = async ({ searchParams }: PageParams) => {
    const urlParams = getURLParams(searchParams)

    return (
        <Suspense>
            <Layout
                page="as-statistics"
                className="h-full"
                urlParams={urlParams}
            >
                <ASStatisticsHeader />
                <iframe
                    className="w-full h-full"
                    src="https://blockgametracker.gg/d/nlKArnQ4k/global-playercount-by-as?orgId=1&refresh=1m&kiosk"
                    width="450"
                    height="200"
                />
            </Layout>
        </Suspense>
    )
}

export default Server
