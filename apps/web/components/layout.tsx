import React from "react"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const Layout = ({ children }: any) => {
    return (
        <main className="w-full h-full flex flex-col gap-16">
            <Navigation />
            {children}
            <Footer />
        </main>
    )
}

export default Layout
