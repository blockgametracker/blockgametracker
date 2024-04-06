import React from "react"

import Navigation from "@/components/layout/navigation/navigation"
import Footer from "@/components/layout/footer"
import PageTitle from "./layout/pageTitle";

const Layout = ({ children, page }: { children: any; page: string }) => {
    return (
        <main className="overflow-x-hidden w-full h-full flex flex-col gap-16 pt-32">
            <PageTitle title={`${page} | Blockgametracker`} />

            <Navigation page={page} />
            {children}
            <Footer />
        </main>
    )
}

export default Layout
