import { DarkContainer, Section } from "@/components/layout/content"
import { Layout } from "@/components/layout"
import { Graph } from "@/components/graphs/graph"
import { getTotalEnsembled } from "@/utils/dataUtils"
import { GRAPH_COLORS } from "@/utils/graphUtils"
import { GraphLegend } from "@/components/graphs/graphLegend"
import { getRangeParams, searchParamToRange } from "@/utils/dataRange"
import type { PageParams } from "@/utils/next"
import type { Metadata } from "next"

export const metadata: Metadata = {
    // TODO
    title: "Compare | BlockGameTracker",
}

const Compare = async ({ searchParams }: PageParams) => {
    const dateRange = searchParamToRange(searchParams?.range)
    const rangeParams = getRangeParams(dateRange)

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
                            data={onlineInRange.slice(4)}
                            colors={GRAPH_COLORS}
                            fill={false}
                        />
                    </DarkContainer>
                    <GraphLegend data={onlineInRange} />
                </div>
            </Section>
        </Layout>
    )
}

export default Compare
