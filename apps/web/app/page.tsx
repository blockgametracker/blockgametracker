import { Servers } from "@/components/server/servers"
import { Layout } from "@/components/layout"
import type { PageParams } from "@/utils/next"
import { Filters } from "@/components/filter/filters"
import { getURLParams } from "@/utils/urlBuilder"
import { Container } from "@/components/layout/container"
import { Icon } from "@/components/icon"
import { calculateDataPoints } from "@/utils/dataUtils"

const Page = ({ searchParams }: PageParams) => {
    const urlParams = getURLParams(searchParams)
    const dataPoints = calculateDataPoints(urlParams.start, urlParams.step)

    return (
        <Layout page="Home" className="flex flex-col tablet:flex-row w-full h-fit tablet:h-full gap-8 tablet:overflow-hidden" urlParams={urlParams}>
            <Filters urlParams={urlParams} />
            {(dataPoints < 400) ?
                <div className="w-full tablet:w-5/6 tablet:overflow-scroll">
                    <Servers {...urlParams} />
                </div>
                :
                <Container className="w-full h-full">
                    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
                        <Icon iconName="icon" className="w-6 h-6 fill-mainColor" />
                        <h2>ERROR</h2>
                        <p>Data range too large.</p>
                    </div>
                </Container>
            }
        </Layout>
    )
}

export default Page
