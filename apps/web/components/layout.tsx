import { Navigation } from "@/components/layout/navigation/navigation"
import { PropsWithChildren } from "react"
import { URLParams } from "@/utils/urlBuilder"
import { Footer } from "./layout/footer"
import { Filters } from "./filter/filters"

interface Props extends PropsWithChildren {
    page: string
    className?: string
    urlParams: URLParams
}

export const Layout = ({ children, className, page, urlParams }: Props) => (
    <>
        <Navigation urlParams={urlParams} page={page} />

        <div className="flex flex-col grow-0 shrink-0 w-full tablet:w-[85vw] tablet:overflow-hidden">
            <Filters urlParams={urlParams} />
            <main className={`w-full h-full p-2 tablet:p-8 ${className}`}>
                {children}
            </main>
        </div>
    </>
)
