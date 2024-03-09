"use client"

import React from "react"

import { Section } from "@/components/content"
import Layout from "@/components/layout"
import { usePathname } from "next/navigation"

export default async function Home() {
    const id = usePathname()

    return (
        <Layout>
            <Section>
                <h2 className="text-3xl">Top servers overview</h2>
                <h2 className="text-3xl">{id}</h2>
            </Section>
        </Layout>
    )
}
