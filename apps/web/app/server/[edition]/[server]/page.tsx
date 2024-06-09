import type { PageParams } from "@/utils/next"
import { ServerPage } from "@/components/server/serverPage"
import type { Metadata } from "next"
import { Layout } from "@/components/layout"
import { MinecraftEdition, getServerBySlug } from "@repo/gateway"
import { notFound } from "next/navigation"
import { getURLParams } from "@/utils/urlBuilder"

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
    const serverInfo = await getServerBySlug(urlParams.edition, params.server)

    if (!serverInfo) return notFound()

    return (
        <Layout
            page={serverInfo.name}
            className="flex flex-col tablet:flex-row w-full tablet:h-full gap-8 tablet:overflow-hidden"
            urlParams={urlParams}
        >
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
