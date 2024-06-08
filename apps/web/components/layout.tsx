import { Navigation } from "@/components/layout/navigation/navigation"
import { Footer } from "@/components/layout/footer"
import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    page: string
    className?: string
}

export const Layout = ({ children, className, page }: Props) => {
    return (
        <main className="w-full h-full flex flex-col">
            <Navigation page={page} />
            <div className="flex flex-col w-full h-full tablet:overflow-y-auto">
                <div className={`px-2 py-8 tablet:px-8 ${className}`}>
                    {children}
                </div>
                <Footer />
            </div>
        </main>
    )
}
