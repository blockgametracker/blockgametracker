import { PropsWithChildren } from "react"

export const SwitchButtons = ({ children }: PropsWithChildren) => (
    <div className="w-full phone:w-fit overflow-hidden rounded-md inline-flex justify-between border-2 bg-dark border-darkOverlay">
        {children}
    </div>
)
