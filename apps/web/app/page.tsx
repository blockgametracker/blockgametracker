import { Servers } from "@/components/server/servers"
import { Layout } from "@/components/layout"
import type { PageParams } from "@/utils/next"
import { getURLParams } from "@/utils/urlBuilder"
import { HomeHeader } from "@/components/page/homepage/homeHeader"

const Page = ({ searchParams }: PageParams) => {
    const urlParams = getURLParams(searchParams)

    return (
        <Layout
            page="Home"
            className="flex flex-col gap-8 tablet:overflow-y-auto"
            urlParams={urlParams}
        >
            <>
                <HomeHeader />
                <Servers urlParams={urlParams} search={urlParams.search} />
            </>
        </Layout>
    )
}

export default Page
