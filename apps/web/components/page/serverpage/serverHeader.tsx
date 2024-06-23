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
        <div className="header w-full py-8 rounded-md shrink-0 flex flex-col gap-4 px-8 border-2 border-darkOverlay">
            <div className="flex flex-row gap-4">
                <ServerIcon server={serverData} className="size-20" />

                <div className="flex flex-col gap-2">
                    <h1 className={`text-5xl ${Expose.className}`}>
                        {serverData.server_name}
                    </h1>
                    <span>{serverData.hostname}</span>
                </div>
            </div>
            <div className="flex flex-row gap-4">
                <Link
                    aria-label="Compare server"
                    href={`/compare/${buildURL(urlParams, { servers: [serverData.server_slug] })}`}
                    className="items-center inline-flex gap-2 px-4 py-2 rounded-md border-2 bg-darkFill border-darkOverlay font-medium"
                >
                    <Icon
                        iconName="compare"
                        className="fill-secondText size-4"
                    />
                    Compare server
                </Link>
                <ServerButton
                    iconName="share"
                    ariaLabel=""
                    href=""
                    className=""
                />
            </div>
        </div>
    )
}
