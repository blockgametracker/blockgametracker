import { ReactNode } from "react"
import { ICONS_DATA, Icon } from "../icon"

export const ServerSection = ({
    children,
    title,
    icon,
}: {
    children: ReactNode
    title: string
    icon: keyof typeof ICONS_DATA
}) => (
    <div className="flex flex-col gap-2 py-4">
        <div className="flex flex-row gap-4 items-center">
            <Icon iconName={icon} className="w-4 h-4 fill-mainColor" />
            <p className="text-mainText font-medium">{title}</p>
        </div>
        <div className="flex flex-col">{children}</div>
    </div>
)
