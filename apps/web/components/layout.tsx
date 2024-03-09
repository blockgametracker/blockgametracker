import React from "react"

import Navigation from "@/components/navigation"

const Layout = ({ children }: any) => {
    return (
        <main className="flex flex-col gap-16">
            <Navigation />
            {children}
            <div className="w-full h-16"></div>
        </main>
    )
}

export default Layout
