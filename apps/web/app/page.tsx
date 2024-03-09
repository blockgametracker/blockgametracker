import React from "react"

import { CardBig, CardTest } from "@/components/server"
import { Container, Section } from "@/components/content"
import HeaderGraph from "@/components/graphs/headerGraph"
import data from "@/components/graphs/data.json"
import Layout from "@/components/layout"
import { Bebas_Neue } from "next/font/google"
import { ButtonBG } from "@/components/button"

const bebasneue = Bebas_Neue({ weight: '400', subsets: ['latin'] })

const Page = () => (
    <Layout>
        <Section>
            <div className="w-full flex flex-col md:flex-row overflow-hidden">
                <div className="md:w-1/3 flex flex-col gap-2">
                    <h1 className={`text-8xl ${bebasneue.className}`}>Blockgametracker</h1>
                    <p>Historical Minecraft server playercounts, saved for as long as possible. Inspired by Minetrack. Please contact me if you would like to do anything with this data e.g. datasource API access (Prometheus-compatible)</p>
                    <ButtonBG>Suggest server</ButtonBG>
                </div>
                <div className="md:w-2/3 flex flex-col gap-4">
                    <Container className="w-full h-96 col-span-3 overflow-visible">
                        <HeaderGraph data={data} />
                    </Container>
                    <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-4">
                        {data.slice(0, 6).map((server, index) => (
                            <Container className="p-4 pt-2 pb-2 " key={index}>
                                <CardTest server={server} />
                            </Container>
                        ))}
                    </div>
                </div>
            </div>
        </Section>

        <Section className="pt-16 pb-16 border-t-2 border-b-2 bg-darkFill border-darkOverlay">
            <h2 className="text-3xl">Global server list</h2>
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-4 gap-4">
                {data.map((server, index) => (
                    <React.Fragment key={index}>
                        <CardBig server={server} />
                    </React.Fragment>
                ))}
            </div>
        </Section>
    </Layout>
)

export default Page