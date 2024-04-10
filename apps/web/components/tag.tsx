import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    text: string
    className?: string
    color?: string
}

export const Tag = ({ text, children, className, color }: Props) => (
    <div className={`pl-4 pr-4 w-full flex flex-col ${className}`}>
        <div className="flex flex-row gap-2 items-center">
            <p className={`text-sm leading-5`} style={{ color: `${color}` }}>
                ■
            </p>
            <p className="text-mainText">{text}</p>
        </div>
        <p>{children}</p>
    </div>
)
