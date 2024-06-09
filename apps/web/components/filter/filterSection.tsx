import { PropsWithChildren } from "react"
import { ICONS_DATA, Icon } from "../icon"

export interface Props extends PropsWithChildren {
    icon: keyof typeof ICONS_DATA
    filter: string
}

export const FilterSection = (props: Props) => (
    <div className="flex flex-col gap-2 w-full py-8">
        <div className="inline-flex gap-4 items-center px-8">
            <Icon iconName={props.icon} className="fill-mainColor w-4 h-4" />
            <h2 className="font-semibold">{props.filter}</h2>
        </div>
        <div className="flex flex-col w-full gap-1">{props.children}</div>
    </div>
)
