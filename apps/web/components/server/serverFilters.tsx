import { Button, buttonStyles } from "@/components/button/button"
import { URLParams as Props, buildURL } from "@/utils/urlBuilder"
import { SwitchButtons } from "../button/switchButton"

export const ServerFilters = (props: Props) => {
    return (
        <div className="flex flex-col gap-4 md:flex-row">
            <SwitchButtons>
                <Button
                    ariaLabel="Java edition"
                    buttonStyle={buttonStyles.switch}
                    active={props.edition === "java"}
                    href={buildURL(
                        props.rangeParams,
                        props.compact,
                        null,
                        null,
                        props.showServers,
                    )}
                >
                    Java
                </Button>
                <Button
                    ariaLabel="Bedrock edition"
                    buttonStyle={buttonStyles.switch}
                    active={props.edition === "bedrock"}
                    href={buildURL(
                        props.rangeParams,
                        props.compact,
                        "bedrock",
                        null,
                        props.showServers,
                    )}
                >
                    Bedrock
                </Button>
            </SwitchButtons>
            <SwitchButtons>
                <Button
                    ariaLabel="Default mode"
                    buttonStyle={buttonStyles.switch}
                    active={!props.compact}
                    href={buildURL(
                        props.rangeParams,
                        null,
                        props.edition,
                        null,
                        props.showServers,
                    )}
                >
                    Default
                </Button>
                <Button
                    ariaLabel="Compact mode"
                    buttonStyle={buttonStyles.switch}
                    active={props.compact}
                    href={buildURL(
                        props.rangeParams,
                        true,
                        props.edition,
                        null,
                        props.showServers,
                    )}
                >
                    Compact
                </Button>
            </SwitchButtons>
        </div>
    )
}
