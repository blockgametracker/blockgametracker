import { Navigation } from "@/components/layout/navigation/navigation"
import { Footer } from "@/components/layout/footer"
import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    page: string
}

export const Layout = ({ children, page }: Props) => {
    return (
        <main className="overflow-x-hidden w-full h-full flex flex-col gap-16 pt-32">
            <Navigation page={page} />
            {children}
            <Footer />
        </main>
    )
}
