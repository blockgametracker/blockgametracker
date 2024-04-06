import React from "react"

import { Servers } from "@/components/server/servers"
import { Section } from "@/components/layout/content"
import Layout from "@/components/layout"
import { Header } from "@/components/layout/header/header"
import { getRangeParams, searchParamToRange } from "@/utils/dataRange"
import { PageParams } from "@/utils/next"
import MainHeader from "@/components/layout/header/mainHeader"

const Page = ({ searchParams }: PageParams) => {
    const dateRange = searchParamToRange(searchParams?.range)
    const rangeParams = getRangeParams(dateRange)


    return (
        <Layout page="Home">
            <Section className="pt-8 pb-8 ">
                <div className="flex flex-col gap-16 items-center">
                    <Header />
                    <MainHeader />
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
