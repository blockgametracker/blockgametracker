import type { PageParams } from "@/utils/next"
import type { Metadata } from "next"
import { Layout } from "@/components/layout"
import { MinecraftEdition, getServerBySlug } from "@repo/gateway"

interface Params {
    server: string
    edition: MinecraftEdition
}

export async function generateMetadata({
    params,
}: PageParams<Params>): Promise<Metadata> {
    const serverInfo = await getServerBySlug(params.edition, params.server)

    return {
        // TODO
        title: `${serverInfo.name} | Blockgametracker`,
    }
}

const Server = async ({ params, searchParams }: PageParams<Params>) => {
    return (
        <Layout page="as-statistics">
            <iframe className="w-full h-full" src="https://blockgametracker.gg/d/nlKArnQ4k/global-playercount-by-as?orgId=1&refresh=1m&kiosk" width="450" height="200">

            </iframe>
        </Layout>
    )
}

export default Server