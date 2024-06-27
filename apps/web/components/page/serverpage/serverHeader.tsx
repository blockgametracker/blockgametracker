import { ServerData } from "@/utils/parsedData"
import localFont from "next/font/local"
import { ServerButton } from "@/components/server/serverButton"
import { Icon } from "@/components/icon"
import { ServerIcon } from "@/components/server/serverIcon"
import Link from "next/link"
import { URLParams, buildURL } from "@/utils/urlBuilder"

const Expose = localFont({
    src: "../../../public/fonts/Expose-Bold.otf",
    display: "swap",
})

interface Props {
    serverData: ServerData
    urlParams: URLParams
}

export const ServerHeader = async ({ serverData, urlParams }: Props) => {
    return (
        <div className="header w-full py-8 rounded-md shrink-0 flex flex-row gap-4 px-8 border-2 border-darkOverlay">
            <div className="flex flex-row gap-4">
                <ServerIcon icon={serverData.icon} className="size-16" />

                <div className="flex flex-col">
                    <h1 className={`text-4xl ${Expose.className}`}>
                        {serverData.server_name}
                    </h1>
                    <span>{serverData.hostname}</span>
                </div>
            </div>
            <div className="ml-auto flex flex-row gap-4 items-center">
                <Link
                    aria-label="Compare server"
                    href={`/compare/${buildURL(urlParams)}`}
                    className="items-center inline-flex gap-2 px-4 py-2 rounded-md border-2 bg-darkFill border-darkOverlay font-medium"
                >
                    <Icon
                        iconName="compare"
                        className="fill-secondText size-4 h-fit"
                    />
                    Compare server
                </Link>
                <Link
                    aria-label="Compare server"
                    href={`/compare/${buildURL(urlParams)}`}
                    className="items-center inline-flex gap-2 px-4 py-2 rounded-md border-2 bg-darkFill border-darkOverlay font-medium"
                >
                    <Icon
                        iconName="share"
                        className="fill-secondText size-4 h-fit"
                    />
                    Share
                </Link>
            </div>
        </div>
    )
}
