import Link from "next/link"
import { URLParams, buildURL } from "@/utils/urlBuilder"
import { Icon } from "../icon"
import { useState } from "react"

export interface Props {
    urlParams: URLParams
}

export const FilterSearch = ({ urlParams }: Props) => {
    const [query, setQuery] = useState("")

    //TODO change the way it redirects to the search page
    const handleSubmit = (event: any) => {
        event.preventDefault()
        if (query.trim()) {
            window.location.href = `/${buildURL(urlParams, {
                search: encodeURIComponent(query),
            })}`
        }
    }

    return (
        <div id="option-search" className="flex flex-row items-center w-full max-w-96 rounded-md border-2 bg-whiteBG dark:bg-darkBG border-whiteBorder dark:border-darkBorder">
        <Icon
            iconName="search"
            className="ml-4 size-4 fill-secondText"
        />
        <form className="w-full" onSubmit={handleSubmit}>
            <input
                type="text"
                id="fname"
                name="fname"
                className="px-4 py-2 w-full bg-transparent placeholder:text-secondText text-mainText focus:outline-none"
                placeholder="Search servers"
                onChange={(e) => setQuery(e.target.value)}
            />
        </form>
    </div>
    )
}
