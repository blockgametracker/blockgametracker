import React from "react"

import { DarkContainer, Section } from "@/components/layout/content"
import Layout from "@/components/layout"
import Graph from "@/components/graphs/graph"
import { getTotalEnsembled } from "@/utils/dataUtils"
import { graphColors } from "@/utils/graphUtils"
import { GraphLegend } from "@/components/graphs/graphLegend"
import { getRangeParams, searchParamToRange } from "@/utils/dataRange"
import { PageParams } from "@/utils/next"

const Page = async ({ searchParams }: PageParams) => {
    const dataRange = searchParamToRange(searchParams?.range)
    const rangeParams = getRangeParams(dataRange)

    const onlineInRange = await getTotalEnsembled(
        "java",
        rangeParams.start,
        rangeParams.step,
    )

    return (
        <Layout page="Compare">
            <Section className="w-full h-2/3">
                <h2 className="text-3xl">Compare servers</h2>
                <div className="grid grid-cols-6 w-full h-full gap-4">
                    <DarkContainer className="col-span-6 tablet:col-span-5 w-full h-full overflow-hidden">
                        <Graph
                            data={onlineInRange}
                            colors={graphColors}
                            fill={false}
                        />
                    </DarkContainer>
                    <GraphLegend data={onlineInRange} />
                </div>
            </Section>
        </Layout>
    )
}

export default Page
