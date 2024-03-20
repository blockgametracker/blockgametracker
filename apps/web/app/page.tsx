import React from "react"

import { Servers } from "@/components/server/servers"
import { Section } from "@/components/content"
import Layout from "@/components/layout"
import { Header } from "@/components/header"
import HeaderServers from "@/components/server/headerServers"

const Page = () => (
    <Layout page="home">
        <Section className="pt-8 pb-8 ">
            <div className="flex flex-row gap-4">
                <Header />
                <HeaderServers />
            </div>
        </Section>

        <Section className="bg-darkFill border-t-2 border-b-2 border-darkOverlay pt-8 pb-8">
            <div className="flex flex-col gap-8">
                <h2 className="text-3xl">Global server list</h2>
                <Servers />
            </div>
        </Section>
    </Layout>
)

export default Page
