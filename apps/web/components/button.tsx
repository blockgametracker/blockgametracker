import Link from "next/link";
import { MouseEventHandler } from "react";

export const ButtonBG = ({ arialabel, onClick, children, href, active, target }: { arialabel: any, onClick?: MouseEventHandler, children: any, href?: any, active?: boolean, target?: any }) => {
    const button = "fade p-4 pt-2 pb-2 w-fit border-2 bg-darkFill border-darkOverlay hover:text-mainText hover:bg-darkOverlay whitespace-nowrap";
    const activeButton = "fade p-4 pt-2 pb-2 w-fit border-2 text-dark bg-mainColor border-mainColor hover:bg-secondColor hover:border-secondColor whitespace-nowrap";

    return href ? (
        <Link
            href={href}
            className={active ? activeButton : button}
            target={target}
            aria-label={arialabel}
        >
            {children}
        </Link>
    ) : (
        <button onClick={onClick} className={active ? activeButton : button} >
            {children}
        </button>
    )
}