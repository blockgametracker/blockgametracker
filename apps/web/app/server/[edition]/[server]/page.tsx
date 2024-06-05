import type { PageParams } from "@/utils/next"
import { getURLParams } from "@/utils/urlBuilder"
import { ServerPage } from "@/components/server/serverPage"
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
        title: `${serverInfo.name} | blockgametracker`,
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
    const urlParams = getURLParams(
        searchParams?.range,
        searchParams?.edition,
        searchParams?.compact,
    )
    const serverInfo = await getServerBySlug(urlParams.edition, params.server)


    return (
        <Layout page={serverInfo.name}>
            <ServerPage
                serverName={serverInfo.name}
                serverSlug={serverInfo.slug}
                edition={urlParams.edition}
                urlParams={urlParams}
            />
        </Layout>
    )
}

export default Server
