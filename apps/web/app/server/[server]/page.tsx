import React from "react"

import { DarkContainer, Section } from "@/components/content"
import Layout from "@/components/layout"
import ServerGraph from "@/components/server/serverGraph"
import { getRangeParams, searchParamToRange } from "@/utils/dataRange"
import { PageParams } from "@/utils/next"

const Home = ({ params, searchParams }: PageParams<{ server: string }>) => {
    const hostname = params.server.replace("/server/", "").replace("_", " ")
    const dateRange = searchParamToRange(searchParams?.range)
    const rangeParams = getRangeParams(dateRange)

    return (
        <Layout page="Home">
            <Section className="w-full h-full">
                <h2 className="text-3xl">{hostname}</h2>

                <DarkContainer className="w-full h-full">
                    <ServerGraph
                        hostname={hostname}
                        rangeParams={rangeParams}
                    />
                </DarkContainer>
            </Section>
        </Layout>
    )
}

export default Home
