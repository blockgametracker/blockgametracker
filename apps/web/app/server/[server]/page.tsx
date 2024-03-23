import React from "react"

import { Section } from "@/components/content"
import Layout from "@/components/layout"
import { usePathname, useSearchParams } from "next/navigation"
import { ServerData } from "@/components/server/serverCard"
import { getOnlineInRange } from "@repo/gateway"
import { convertTime } from "@/utils/dataUtils"
import Server from "@/components/server/server"
import { greenGraph } from "@/utils/graphUtils"
import App from "next/app"

const Home = ({ params }: { params: { server: string } }) => {
    console.log(params)
    const hostname = params.server.replace("/server/", "")
    return (
        <Layout page="Home">
            <Section className="w-full h-full">
                <h2 className="text-3xl">{hostname}</h2>

                <div className="w-full h-2/3 bg-mainColor">
                    <Server hostname={hostname} />
                </div>
            </Section>
        </Layout>
    )
}

export default Home