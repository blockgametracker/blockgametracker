"use client"

import React from "react"

import { Section } from "@/components/content"
import Layout from "@/components/layout"
import { usePathname } from "next/navigation"
import { ServerData } from "@/components/server/serverCard"
import { getOnlineInRange } from "@repo/gateway"
import { convertTime } from "@/utils/dataUtils"
import Graph from "@/components/graphs/graph"
import { greenGraph } from "@/utils/graphUtils"
import App from "next/app"

const Home = ({ id }: { id: string }) => {

    return (
        <Layout page="Home">
            <Section className="w-full h-full">
                <h2 className="text-3xl">{id}</h2>

                <div className="w-full h-2/3 bg-mainColor">
                    {/* <Graph
                        data={serverArray}
                        fill={true}
                        ticksX={[]}
                        ticksY={[]}
                        colors={greenGraph}
                    /> */}
                </div>
            </Section>
        </Layout>
    )
}

export default Home

Home.getInitialProps = async ({ query }: any) => {
    let id = query.id ? query.id.replace("/server/", "") : ""

    return { id }
}