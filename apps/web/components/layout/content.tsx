import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {}

export const Content = (props: Props) => (
    <div className="flex flex-col tablet:flex-row gap-8 w-full tablet:w-5/6 tablet:h-full px-2 tablet:px-8 p-8 tablet:overflow-y-scroll">
        {props.children}
    </div>
)
