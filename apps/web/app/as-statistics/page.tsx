import type { PageParams } from "@/utils/next"
import type { Metadata } from "next"
import { Layout } from "@/components/layout"
import { MinecraftEdition } from "@repo/gateway"

interface Params {
    server: string
    edition: MinecraftEdition
}

export async function generateMetadata({}: PageParams<Params>): Promise<Metadata> {
    return {
        // TODO
        title: "AS Statistics | Blockgametracker",
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
    return (
        <Layout page="as-statistics">
            <iframe
                className="w-full h-full"
                src="https://blockgametracker.gg/d/nlKArnQ4k/global-playercount-by-as?orgId=1&refresh=1m&kiosk"
                width="450"
                height="200"
            />
        </Layout>
    )
}

export default Server
