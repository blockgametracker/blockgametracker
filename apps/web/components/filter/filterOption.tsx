import Link from "next/link"
import { URLParams, buildURL } from "@/utils/urlBuilder"

export interface Props {
    updates: Partial<URLParams>
    URLParams: URLParams
    text: string
}

export const FilterOption = ({ text, updates, URLParams }: Props) => {
    const firstUpdate = Object.entries(updates)[0]
    const isActive =
        firstUpdate &&
        URLParams[firstUpdate[0] as keyof URLParams] === firstUpdate[1]

    return (
        <Link
            rel="nofollow"
            href={buildURL(URLParams, updates)}
            className={`fade inline-flex w-full items-center px-4 py-2 ${isActive ? "bg-darkSelected text-mainText" : "hover:bg-darkSelected "}`}
        >
            {text}
        </Link>
    )
}
