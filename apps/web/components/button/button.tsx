import Link from "next/link"
import { MouseEventHandler, PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    ariaLabel: string
    onClick?: MouseEventHandler
    href?: string
    active?: boolean
    target?: string
    buttonStyle: ButtonStyles
}

interface ButtonStyles {
    default: string;
    active: string;
}

export const buttonStyles = {
    default: {
        default: "fade px-4 py-2 rounded-md w-fit border-2 bg-darkFill border-darkOverlay hover:text-mainText hover:bg-darkOverlay whitespace-nowrap",
        active: "fade px-4 py-2 rounded-md w-fit border-2 text-dark bg-mainColor border-mainColor hover:bg-secondColor hover:border-secondColor whitespace-nowrap",
    },
    switch: {
        default: "w-full text-center fade px-4 py-2 hover:bg-darkOverlay hover:text-mainText",
        active: "w-full text-center fade px-4 py-2 bg-mainText text-dark",
    },
}

export const Button = ({
    ariaLabel,
    onClick,
    children,
    href,
    active,
    target,
    buttonStyle,
}: Props) => {
    return href ? (
        <Link
            href={href}
            className={active ? buttonStyle.active: buttonStyle.default}
            target={target}
            aria-label={ariaLabel}
        >
            {children}
        </Link>
    ) : (
        <button
            onClick={onClick}
            className={active ? buttonStyle.active: buttonStyle.default}
        >
            {children}
        </button>
    )
}
