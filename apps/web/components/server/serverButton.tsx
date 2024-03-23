import Link from "next/link"
import Icon from "../icon"

export const ServerButton = ({ arialabel, href, iconName }: {arialabel: string, href: string, iconName: any}) => (
    <Link
        aria-label={arialabel}
        href={href}
        className="fade group border-2 p-3 rounded-md bg-darkFill border-darkOverlay hover:border-secondText"
    >
        <Icon
            iconName={iconName}
            className="fade w-4 h-4 fill-secondText group-hover:fill-mainText"
        />
    </Link>
)
