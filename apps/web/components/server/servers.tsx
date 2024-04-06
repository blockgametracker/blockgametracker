import React from "react"
import ServerCard from "./serverCard"
import { getTotalEnsembled } from "@/utils/dataUtils"
import { ButtonBG } from "../button"
import Icon from "../icon"
import { URLParams, buildURL } from "@/utils/urlBuilder"
import { MinecraftEdition } from "@repo/gateway"

export const Servers: React.FC<URLParams> = async (urlParams) => {
    const serverList = await getTotalEnsembled(
        urlParams.platform as MinecraftEdition,
        urlParams.rangeParams.start,
        urlParams.rangeParams.step,
    )

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 items-center">
                <Icon iconName="list" className="fill-mainText w-6 h-6" />
                <h2 className="text-3xl mr-auto">Global server overview</h2>

                <div>
                    <ButtonBG
                        arialabel="Java edition"
                        href={buildURL(
                            urlParams.rangeParams,
                            urlParams.compact,
                            null,
                        )}
                    >
                        Java
                    </ButtonBG>
                    <ButtonBG
                        arialabel="Bedrock edition"
                        href={buildURL(
                            urlParams.rangeParams,
                            urlParams.compact,
                            "bedrock",
                        )}
                    >
                        Bedrock
                    </ButtonBG>
                </div>
                <div>
                    <ButtonBG
                        arialabel="Default mode"
                        href={buildURL(
                            urlParams.rangeParams,
                            null,
                            urlParams.platform,
                        )}
                    >
                        Default
                    </ButtonBG>
                    <ButtonBG
                        arialabel="Compact mode"
                        href={buildURL(
                            urlParams.rangeParams,
                            true,
                            urlParams.platform,
                        )}
                    >
                        Compact
                    </ButtonBG>
                </div>
            </div>
            <div
                className={`w-full grid gap-4 ${urlParams.compact ? "grid-cols-1 tablet:grid-cols-3" : "grid-cols-1 tablet:grid-cols-2 small:grid-cols-3 normal:grid-cols-4"}`}
            >
                {serverList.map((serverData, index) => (
                    <React.Fragment key={index}>
                        <ServerCard
                            urlParams={urlParams}
                            serverData={serverData}
                        />
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}
