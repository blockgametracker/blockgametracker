import type { PageParams } from "@/utils/next"
import { getURLParams } from "@/utils/urlBuilder"
import { ServerPage } from "@/components/server/serverPage"
import type { Metadata } from "next"

interface Params {
    server: string
    platform: string
}

const getServerName = (params: Params) => params.server.replace("_", " ")

export async function generateMetadata({
    params,
}: PageParams<Params>): Promise<Metadata> {
    return {
        // TODO
        title: `${getServerName(params)} | BlockGameTracker`,
    }
}

const Server = ({ params, searchParams }: PageParams<Params>) => {
    const urlParams = getURLParams(
        searchParams?.range,
        searchParams?.platform,
        searchParams?.compact,
    )

    return (
        <ServerPage
            serverName={getServerName(params)}
            platform={params.platform}
            urlParams={urlParams}
        />
    )
}

export default Server
