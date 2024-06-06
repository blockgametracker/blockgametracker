import type { Metadata } from "next"
import { Layout } from "@/components/layout"
import { Suspense } from "react"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "AS Statistics | blockgametracker",
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

const Server = async () => {
    return (
        <Suspense>
            <Layout page="as-statistics">
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
