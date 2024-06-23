import { Layout } from "@/components/layout"
import { Container } from "@/components/layout/container/container"
import { Updates } from "@/components/page/updatepage/updates"
import type { PageParams } from "@/utils/next"
import { getURLParams } from "@/utils/urlBuilder"

const Page = ({ searchParams }: PageParams) => {
    const urlParams = getURLParams(searchParams)

    return (
        <Layout
            page="Updates"
            className="flex flex-row gap-8 w-full h-full"
            urlParams={urlParams}
        >
            <Updates />
        </Layout>
    )
}

export default Page
