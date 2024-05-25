import { PropsWithChildren } from "react"

export const SwitchButtons = ({ children }: PropsWithChildren) => (
    <div className="w-full tablet:w-fit overflow-hidden rounded-md inline-flex justify-between border-2 bg-darkFill border-darkOverlay">
        {children}
    </div>
)
