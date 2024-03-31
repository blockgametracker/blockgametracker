import React from "react"

import Navigation from "@/components/navigation/navigation"
import Footer from "@/components/footer"

const Layout = ({ children, page }: { children: any; page: string }) => {
    return (
        <main className="overflow-x-hidden w-full h-full flex flex-col gap-16 pt-32">
            <Navigation page={page} />
            {children}
            <Footer />
        </main>
    )
}

export default Layout
