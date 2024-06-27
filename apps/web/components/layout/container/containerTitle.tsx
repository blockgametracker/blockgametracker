import { ICONS_DATA, Icon } from "@/components/icon"
import { PropsWithChildren } from "react"

export interface Props extends PropsWithChildren {
    className?: string
    icon?: keyof typeof ICONS_DATA
}

export const ContainerTitle = ({ children, className, icon }: Props) => (
    <div
        className={`whitespace-nowrap flex flex-row items-center p-4 border-b-2 border-darkOverlay font-medium text-mainText ${className}`}
    >
        {icon &&
            <Icon iconName={icon} className="w-4 h-4 fill-secondText" />
        }
        {children}
    </div>
)
