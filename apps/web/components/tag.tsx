import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    text: string
    className?: string
    color?: string
}

export const Tag = ({ text, children, className, color }: Props) => (
    <div
        className={`h-fit flex flex-col text-whiteST dark:text-secondText whitespace-nowrap ${className}`}
    >
        <div className="flex flex-row gap-2 items-center">
            <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: `${color}` }}
            />
            <p className="font-semibold dark:font-normal text-whiteMT dark:text-mainText">
                {text}
            </p>
        </div>
        <p>{children}</p>
    </div>
)
