import Link from "next/link"
import { Icon, IconName } from "@/components/icon"

interface Props {
    rel?: string
    className?: string
    ariaLabel?: string
    href: string
    iconName: IconName
}

export const ServerButton = ({
    rel,
    className,
    ariaLabel,
    href,
    iconName,
}: Props) => (
    <Link
        rel={rel}
        aria-label={ariaLabel}
        href={href}
        className={`fade group border-2 p-3 rounded-md bg-darkFill hover:bg-darkSelected border-darkOverlay hover:border-secondText h-fit ${className}`}
    >
        <Icon
            iconName={iconName}
            className="fade w-4 h-4 fill-secondText group-hover:fill-mainText"
        />
    </Link>
)
