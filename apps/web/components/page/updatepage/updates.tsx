import updates from "./updates.json"
import { UpdateCard } from "./updateCard"
import { Update } from "@/utils/updateUtils"
import { UpdateContent } from "./updateContent"
import { Container } from "../../layout/container/container"
import { ContainerTitle } from "../../layout/container/containerTitle"

export interface Props {
    active?: Update
}

export const Updates = ({ active }: Props) => (
    <>
        <Container className="w-[80vw] h-full">
            {active ? (
                <>
                    <ContainerTitle>
                        <p>Update {active.id}</p>
                    </ContainerTitle>
                    <UpdateContent update={active} />
                </>
            ) : (
                <div className="flex w-full h-full items-center justify-center">
                    Nothing here
                </div>
            )}
        </Container>
        <Container className="shrink-0 w-[20vw] h-full flex flex-col overflow-y-auto overflow-hidden">
            <ContainerTitle>
                <p>Updates</p>
            </ContainerTitle>
            <ul className="flex flex-col w-full h-full divide-y-2 divide-darkOverlay">
                {updates.map((update, index) => (
                    <li id={update.id} key={index}>
                        <UpdateCard update={update} active={active} />
                    </li>
                ))}
            </ul>
        </Container>
    </>
)
