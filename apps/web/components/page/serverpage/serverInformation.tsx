import { Container } from "@/components/layout/container/container"
import { ContainerTitle } from "@/components/layout/container/containerTitle"
import { ListItem } from "@/components/listItem"
import { ServerData } from "@/utils/parsedData"
import { URLParams } from "@/utils/urlBuilder"

interface Props {
    serverData: ServerData
    urlParams: URLParams
}

export const ServerInformation = async ({ serverData, urlParams }: Props) => {
    const online =
        serverData.data[serverData.data.length - 1].y.toLocaleString()

    return (
        <Container className="w-full tablet:w-[15vw] flex flex-col shrink-0">
            <ContainerTitle>
                <p>Server information</p>
            </ContainerTitle>
            <div className="flex flex-col divide-y-2 divide-darkBorder">
                <ListItem title="Players" value={online} />
                <ListItem title="Host" value={serverData.hostname} />
                <ListItem
                    title="Edition"
                    value={
                        serverData.server_edition.charAt(0).toUpperCase() +
                        serverData.server_edition.slice(1)
                    }
                />
                <ListItem title="Version" value="-" />
                <ListItem title="Website" value="-" />
                <ListItem title="Store" value="-" />
            </div>
        </Container>
    )
}
