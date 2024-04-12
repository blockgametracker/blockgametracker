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
    )

    return (
        <Layout page="Home">
            <Section className="pt-8 pb-8 ">
                <div className="flex flex-col gap-16 items-center">
                    <Header />
                </div>
            </Section>

            <Section>
                <div className="flex flex-col gap-8">
                    <Servers {...urlParams} />;
                </div>
            </Section>
        </Layout>
    )
}

export default Page
