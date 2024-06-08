import { Servers } from "@/components/server/servers"
import { Section } from "@/components/layout/section"
import { Layout } from "@/components/layout"
import { Header } from "@/components/layout/header"
import type { PageParams } from "@/utils/next"
import { getURLParams } from "@/utils/urlBuilder"

const Page = ({ searchParams }: PageParams) => {
    const urlParams = getURLParams(
        searchParams?.range,
        searchParams?.edition,
        searchParams?.servers,
        searchParams?.showServers,
    )

    return (
        <Layout page="Home" className="flex flex-col w-full gap-16">
            <div className="flex flex-col gap-16 items-center pt-32">
                <Header />
            </div>

            <div className="flex flex-col gap-8">
                <Servers {...urlParams} />
            </div>
        </Layout>
    )
}

export default Page
