import React from "react"

import { Servers } from "@/components/servers"
import { Section } from "@/components/content"
import Layout from "@/components/layout"
import { Header } from "@/components/header"


const Page = () => (
    <Layout>
        <Section className="pt-8 pb-8 ">
            <Header />
        </Section>

        <Section>
            <h2 className="text-3xl">Global server list</h2>
            <Servers />
        </Section>
    </Layout>
)

export default Page
