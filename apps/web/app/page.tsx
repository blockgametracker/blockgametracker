import { Servers } from "@/components/server/servers"
import { Section } from "@/components/layout/content"
import { Layout } from "@/components/layout"
import { Header } from "@/components/layout/header/header"
import type { PageParams } from "@/utils/next"
import { getURLParams } from "@/utils/urlBuilder"

const Page = ({ searchParams }: PageParams) => {
    const urlParams = getURLParams(
        searchParams?.range,
        searchParams?.edition,
        searchParams?.compact,
        searchParams?.servers,
        searchParams?.showServers
    )

    return (
        <Layout page="Home">
            <div className="w-full">
                <Section className="">
                    <div className="flex flex-col gap-16 items-center pt-16">
                        <Header />
                    </div>
                </Section>
            </div>

            <Section>
                <div className="flex flex-col gap-8">
                    <Servers {...urlParams} />
                </div>
            </Section>
        </Layout>
    )
}

export default Page
