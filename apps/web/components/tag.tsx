import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    text: string
    className?: string
    color?: string
}

export const Tag = ({ text, children, className, color }: Props) => (
    <div className={`p-4 w-full flex flex-col text-secondText ${className}`}>
        <div className="flex flex-row gap-2 items-center">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${color}` }} />
            <p className="text-mainText">{text}</p>
        </div>
        <p>{children}</p>
    </div>
)
