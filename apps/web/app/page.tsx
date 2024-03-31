import React from "react"

import { Servers } from "@/components/server/servers"
import { Section } from "@/components/content"
import Layout from "@/components/layout"
import { Header } from "@/components/header"
import HeaderServers from "@/components/server/headerServers"
import { getRangeParams, searchParamToRange } from "@/utils/dataRange"
import { PageParams } from "@/utils/next"

const Page = ({ searchParams }: PageParams) => {
    const dateRange = searchParamToRange(searchParams?.range)
    const rangeParams = getRangeParams(dateRange)

    return (
        <Layout page="home">
            <Section className="pt-8 pb-8 ">
                <div className="flex flex-row gap-4">
                    <Header />
                    <HeaderServers rangeParams={rangeParams} />
                </div>
            </Section>

            <Section className="bg-darkFill border-t-2 border-b-2 border-darkOverlay pt-8 pb-8">
                <div className="flex flex-col gap-8">
                    <h2 className="text-3xl">Global server list</h2>
                    <Servers rangeParams={rangeParams} />
                </div>
            </Section>
        </Layout>
    )
}

export default Page
