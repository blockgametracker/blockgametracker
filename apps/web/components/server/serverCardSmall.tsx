import { Container } from "@/components/layout/container/container"
import { ServerButton } from "./serverButton"
import { ServerInfo } from "./serverInfo"
import { URLParams, buildURL } from "@/utils/urlBuilder"
import { ServerData } from "@/utils/parsedData"
import { ServerStatistics } from "./serverStatistics"

interface Props {
    urlParams: URLParams
    serverData: ServerData
}

export const ServerCardSmall = async ({ urlParams, serverData }: Props) => {
    return (
        <Container
            id="servers"
            className={`fade flex flex-col tablet:flex-row items-center w-full divide-y-2 tablet:divide-y-0 tablet:divide-x-2 divide-darkOverlay p-0`}
        >
            <ServerInfo
                edition={urlParams.edition}
                serverData={serverData}
                className="py-2 px-4 tablet:py-4"
            >
                <div className="inline-flex tablet:hidden gap-2 p-4 ml-auto">
                    <ServerButton
                        ariaLabel="Compare server"
                        href={`/compare/${buildURL(urlParams)}`}
                        iconName="compare"
                        className="hidden phone:flex"
                    />
                    <ServerButton
                        ariaLabel="Open server"
                        href={`/server/${urlParams.edition}/${serverData.server_slug}${buildURL(urlParams)}`}
                        iconName="fullscreen"
                    />
                </div>
            </ServerInfo>

            <ServerStatistics serverData={serverData} />

            <div className="hidden tablet:inline-flex gap-2 p-4">
                <ServerButton
                    ariaLabel="Compare server"
                    href={`/compare/${buildURL(urlParams)}`}
                    iconName="compare"
                    className="hidden phone:flex"
                />
                <ServerButton
                    ariaLabel="Open server"
                    href={`/server/${urlParams.edition}/${serverData.server_slug}${buildURL(urlParams)}`}
                    iconName="fullscreen"
                />
            </div>
        </Container>
    )
}
