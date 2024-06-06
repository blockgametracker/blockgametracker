import { Icon } from "../icon"

export const Loading = () => (
    <div className="absolute flex flex-col items-center justify-center top-0 left-0 w-full h-full bg-darkFill animate-pulse">
        <Icon iconName="icon" className="w-6 h-6 fill-secondText" />
    </div>
)
