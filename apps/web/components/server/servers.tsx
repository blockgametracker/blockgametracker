import { ServerCard } from "./serverCard"
import { getTotalEnsembled } from "@/utils/dataFetcher"
import { Button, buttonStyles } from "@/components/button/button"
import { URLParams as Props, buildURL } from "@/utils/urlBuilder"
import { MinecraftEdition } from "@repo/gateway"
import { Fragment } from "react"

export const Servers = async (props: Props) => {
    const serverList = await getTotalEnsembled(
        props.edition as MinecraftEdition,
        props.rangeParams.start,
        props.rangeParams.step,
    )

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col phone:flex-row gap-4 phone:items-center">
                <h2 className="text-3xl mr-auto">Global server overview</h2>
            </div>
            <div
                className={`w-full grid gap-4 grid-cols-1 tablet:grid-cols-2 small:grid-cols-3 normal:grid-cols-4`}
            >
                {serverList.slice(0, props.showServers).map((serverData) => (
                    <Fragment key={`card-container-${serverData.server_slug}`}>
                        <ServerCard urlParams={props} serverData={serverData} />
                    </Fragment>
                ))}
            </div>
            <div className="w-full flex justify-center gap-4">
                {props.showServers > 12 && (
                    <Button
                        ariaLabel="Show less"
                        buttonStyle={buttonStyles.default}
                        href={buildURL(
                            props.rangeParams,
                            props.edition,
                            null,
                            null,
                        )}
                    >
                        Show less
                    </Button>
                )}
                {props.showServers < serverList.length && (
                    <Button
                        ariaLabel="Show more"
                        buttonStyle={buttonStyles.default}
                        href={buildURL(
                            props.rangeParams,
                            props.edition,
                            null,
                            props.showServers + 8,
                        )}
                    >
                        Show more
                    </Button>
                )}
            </div>
        </div>
    )
}
