import React from "react"

import { DarkContainer, Section } from "@/components/content"
import Layout from "@/components/layout"
import ServerGraph from "@/components/server/serverGraph"

const Home = ({ params }: { params: { server: string } }) => {
    const hostname = params.server.replace("/server/", "").replace("_", " ")
    
    return (
        <Layout page="Home">
            <Section className="w-full h-full">
                <h2 className="text-3xl">{hostname}</h2>

                <DarkContainer className="w-full h-2/3">
                    <ServerGraph hostname={hostname} />
                </DarkContainer>
                <DarkContainer className="w-full h-1/3">
                    
                </DarkContainer>
            </Section>
        </Layout>
    )
}

export default Home