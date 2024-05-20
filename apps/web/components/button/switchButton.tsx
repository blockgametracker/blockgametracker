import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    children: any
}

export const SwitchButtons = ({ children }: Props) => (
    <div className="w-full phone:w-fit overflow-hidden rounded-md inline-flex justify-between border-2 bg-dark border-darkOverlay">
        {children}
    </div>
)