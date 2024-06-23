import { Servers } from "@/components/server/servers"
import { Layout } from "@/components/layout"
import type { PageParams } from "@/utils/next"
import { getURLParams } from "@/utils/urlBuilder"
import { Container } from "@/components/layout/container/container"
import { Icon } from "@/components/icon"
import { calculateDataPoints } from "@/utils/dataUtils"
import { HeaderServers } from "@/components/layout/headerServers"

const Page = ({ searchParams }: PageParams) => {
    const urlParams = getURLParams(searchParams)
    const dataPoints = calculateDataPoints(urlParams.start, urlParams.step)

    return (
        <Layout
            page="Home"
            className="flex flex-col gap-8 tablet:overflow-y-auto"
            urlParams={urlParams}
        >
            {dataPoints < 400 ? (
                <>
                    <HeaderServers />
                    <Servers {...urlParams} />
                </>
            ) : (
                <Container className="w-full h-full">
                    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
                        <Icon
                            iconName="icon"
                            className="w-6 h-6 fill-mainColor"
                        />
                        <h2>ERROR</h2>
                        <p>Data range too large.</p>
                    </div>
                </Container>
            )}
        </Layout>
    )
}

export default Page
