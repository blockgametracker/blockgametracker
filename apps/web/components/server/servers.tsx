import { ServerCard } from "./serverCard"
import { getTotalEnsembled } from "@/utils/dataFetcher"
import { Button } from "@/components/button"
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
        <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 items-center">
                <h2 className="text-3xl mr-auto">Global server overview</h2>

                <div>
                    <Button
                        ariaLabel="Java edition"
                        href={buildURL(props.rangeParams, props.compact, null, null)}
                    >
                        Java
                    </Button>
                    <Button
                        ariaLabel="Bedrock edition"
                        href={buildURL(
                            props.rangeParams,
                            props.compact,
                            "bedrock", 
                            null
                        )}
                    >
                        Bedrock
                    </Button>
                </div>
                <div>
                    <Button
                        ariaLabel="Default mode"
                        href={buildURL(props.rangeParams, null, props.edition, null)}
                    >
                        Default
                    </Button>
                    <Button
                        ariaLabel="Compact mode"
                        href={buildURL(props.rangeParams, true, props.edition, null)}
                    >
                        Compact
                    </Button>
                </div>
            </div>
            <div
                className={`w-full grid gap-4 ${props.compact ? "grid-cols-1 tablet:grid-cols-3" : "grid-cols-1 tablet:grid-cols-2 small:grid-cols-3 normal:grid-cols-4"}`}
            >
                {serverList.map((serverData, index) => (
                    <Fragment key={index}>
                        <ServerCard urlParams={props} serverData={serverData} />
                    </Fragment>
                ))}
            </div>
        </div>
    )
}
