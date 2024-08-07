import { Navigation } from "@/components/layout/navigation/navigation"
import { PropsWithChildren } from "react"
import { URLParams } from "@/utils/urlBuilder"
import { Options } from "./filter/options"
import { calculateDataPoints } from "@/utils/dataUtils"
import { Container } from "./layout/container/container"
import { Icon } from "./icon"

interface Props extends PropsWithChildren {
    page: string
    className?: string
    urlParams: URLParams
}

export const Layout = ({ children, className, page, urlParams }: Props) => {
    const dataPoints = calculateDataPoints(urlParams.start, urlParams.step)

    return (
        <>
            {dataPoints < 400 ? (
                <>
                    <Options
                        id="options-desktop"
                        className="hidden tablet:flex"
                        urlParams={urlParams}
                    />
                    <div
                        id="content"
                        className="flex flex-col gap-4 tablet:flex-row w-full h-full tablet:overflow-hidden font-medium dark:font-normal text-whiteMT dark:text-secondText"
                    >
                        <Navigation urlParams={urlParams} page={page} />
                        <Options
                            id="options-mobile"
                            className="flex tablet:hidden"
                            urlParams={urlParams}
                        />
                        <main
                            id="content-main"
                            className={`w-full tablet:w-[85vw] h-full px-2 tablet:p-8 ${className}`}
                        >
                            {children}
                        </main>
                    </div>
                </>
            ) : (
                <Container className="w-full h-full">
                    <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                            <Icon
                                iconName="icon"
                                className="w-6 h-6 fill-mainColor"
                            />
                            <h2>ERROR</h2>
                        </div>
                        <p>
                            Too many datapoints, please select another data
                            range.
                        </p>
                    </div>
                </Container>
            )}
        </>
    )
}
