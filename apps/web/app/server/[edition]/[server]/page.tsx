import type { PageParams } from "@/utils/next"
import { getURLParams } from "@/utils/urlBuilder"
import { ServerPage } from "@/components/server/serverPage"
import type { Metadata } from "next"
import { Layout } from "@/components/layout"

interface Params {
    server: string
    edition: string
}

const getServerName = (params: Params) => params.server.replace("_", " ")

export async function generateMetadata({
    params,
}: PageParams<Params>): Promise<Metadata> {
    return {
        // TODO
        title: `${getServerName(params)} | Blockgametracker`,
    }
}

const Server = ({ params, searchParams }: PageParams<Params>) => {
    const urlParams = getURLParams(
        searchParams?.range,
        searchParams?.edition,
        searchParams?.compact,
    )
    const serverName = getServerName(params)

    return (
        <Layout page={serverName}>
            <ServerPage
                serverName={serverName}
                edition={params.edition}
                urlParams={urlParams}
            />
        </Layout>
    )
}

export default Server
