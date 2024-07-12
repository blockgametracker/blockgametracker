"use client"

import { ServerData } from "@/utils/parsedData"
import localFont from "next/font/local"
import { Icon } from "@/components/icon"
import { ServerIcon } from "@/components/server/serverIcon"
import { URLParams, buildURL } from "@/utils/urlBuilder"
import { Container } from "@/components/layout/container/container"

const Expose = localFont({
    src: "../../../public/fonts/Expose-Bold.otf",
    display: "swap",
})

interface Props {
    serverData: ServerData
    urlParams: URLParams
}

export const ServerHeader = async ({ serverData, urlParams }: Props) => {
    //TODO probably change the way this redirects
    const handleClick = () => {
        sessionStorage.setItem(
            `${serverData.server_edition}SelectedServers`,
            serverData.server_slug,
        )
        window.location.href = `/compare/${buildURL(urlParams)}`
    }

    return (
        <Container className="w-full p-4 rounded-md shrink-0 flex flex-col tablet:flex-row gap-4">
            <div className="flex flex-row gap-4">
                <ServerIcon icon={serverData.icon} className="size-16" />

                <div className="flex flex-col">
                    <h1 className={`text-4xl ${Expose.className}`}>
                        {serverData.server_name}
                    </h1>
                    <span>{serverData.hostname}</span>
                </div>
            </div>
            <div className="tablet:ml-auto flex flex-row gap-4 items-center">
                <button
                    aria-label="Compare server"
                    onClick={() => handleClick()}
                    className="items-center inline-flex gap-2 px-4 py-2 rounded-md border-2 bg-darkFill border-darkBorder font-medium"
                >
                    <Icon
                        iconName="compare"
                        className="fill-secondText size-4 h-fit"
                    />
                    Compare server
                </button>
            </div>
        </Container>
    )
}
