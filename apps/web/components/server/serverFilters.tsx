import { Button, buttonStyles } from "@/components/button/button"
import { URLParams as Props, buildURL } from "@/utils/urlBuilder"
import { SwitchButtons } from "../button/switchButton"

export const ServerFilters = (props: Props) => {
    return (
        <SwitchButtons>
            <Button
                ariaLabel="Java edition"
                buttonStyle={buttonStyles.switch}
                active={props.edition === "java"}
                href={buildURL(
                    props.rangeParams,
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
                    "bedrock",
                    null,
                    props.showServers,
                )}
            >
                Bedrock
            </Button>
        </SwitchButtons>
    )
}
