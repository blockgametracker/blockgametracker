"use client"

import { URLParams, buildURL } from "@/utils/urlBuilder"
import { useRouter } from "next/navigation"
import { PropsWithChildren, useEffect } from "react"

interface Props extends PropsWithChildren {
    id: string
    max: number
    active: boolean
    urlParams: URLParams
}

export const ServerObserver = (props: Props) => {
    const router = useRouter()

    useEffect(() => {
        const target = document.querySelector(`#${props.id}`)

        if (!target) return

        const options: IntersectionObserverInit = {
            root: null,
            threshold: 0,
        }

        const handler: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (
                    entry.isIntersecting &&
                    props.urlParams.showServers < props.max &&
                    props.active
                ) {
                    router.replace(buildURL(props.urlParams))
                }
            })
        }

        const observer = new IntersectionObserver(handler, options)
        observer.observe(target)

        return () => {
            observer.disconnect()
        }
    }, [
        props.urlParams.showServers,
        props.urlParams.edition,
        props.max,
        props.active,
    ])

    return <div id={props.id}>{props.children}</div>
}
