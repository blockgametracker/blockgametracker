import React from "react"

import { DarkContainer, Section } from "@/components/content"
import Layout from "@/components/layout"
import Graph from "@/components/graphs/graph"
import { getEnsembled } from "@/utils/dataUtils"
import { graphColors } from "@/utils/graphUtils"
import { GraphLegend } from "@/components/graphs/graphLegend"


const Page = async () => {
    const onlineInRange = await getEnsembled(
        "java",
        "-1d",
        "1h",
    )

    return (
        <Layout page="server-comparison">
            <Section className="w-full h-2/3">
                <h2 className="text-3xl">Compare servers</h2>
                <div className="grid grid-cols-6 w-full h-full gap-4">
                    <DarkContainer className="col-span-5 w-full h-full overflow-hidden">
                        <Graph data={onlineInRange} colors={graphColors} fill={false}/>
                    </DarkContainer>
                    <GraphLegend data={onlineInRange} />
                </div>
            </Section>
        </Layout>
    )
}

export default Page
