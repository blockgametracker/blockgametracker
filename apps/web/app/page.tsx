import React from "react"

import { Server } from "@/components/server"
import { Section } from "@/components/content"
import data from "@/components/graphs/data.json"
import Layout from "@/components/layout"
import { Bebas_Neue } from "next/font/google"
import { ButtonBG } from "@/components/button"
import { Header } from "@/components/graphs/graph"

const bebasneue = Bebas_Neue({ weight: "400", subsets: ["latin"] })

const Page = () => (
    <Layout>
        <Section>
            <div className="w-full grid grid-cols-3 overflow-hidden">
                <div className="flex flex-col gap-2">
                    <h1 className={`text-8xl ${bebasneue.className}`}>
                        Blockgametracker
                    </h1>
                    <p>
                        Historical Minecraft server playercounts, saved for as
                        long as possible. Inspired by Minetrack. Please contact
                        me if you would like to do anything with this data e.g.
                        datasource API access (Prometheus-compatible)
                    </p>
                    <ButtonBG>Suggest server</ButtonBG>
                </div>
                <Header />
            </div>
        </Section>

        <Section className="pt-16 pb-16 border-t-2 border-b-2 bg-darkFill border-darkOverlay">
            <h2 className="text-3xl">Global server list</h2>
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-4 gap-4">
                {data.map((server, index) => (
                    <React.Fragment key={index}>
                        <Server server={server} />
                    </React.Fragment>
                ))}
            </div>
        </Section>
    </Layout>
)

export default Page
