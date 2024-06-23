import { Layout } from "@/components/layout"
import { Updates } from "@/components/page/updatepage/updates"
import type { PageParams } from "@/utils/next"
import { getUpdate } from "@/utils/updateUtils"
import { getURLParams } from "@/utils/urlBuilder"

interface Params {
    urlUpdate: string
}

const Page = async ({ params, searchParams }: PageParams<Params>) => {
    const urlParams = getURLParams(searchParams)
    const update = getUpdate(params.urlUpdate)

    return (
        <Layout
            page="Updates"
            className="flex flex-row gap-8 w-full h-full"
            urlParams={urlParams}
        >
            <Updates active={update} />
        </Layout>
    )
}

export default Page
