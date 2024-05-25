"use client"

import { URLParams, buildURL } from "@/utils/urlBuilder"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface Props extends URLParams {
    id: string
    max: number
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
                if (entry.isIntersecting && props.showServers < props.max) {
                    router.replace(
                        buildURL(
                            props.rangeParams,
                            props.edition,
                            null,
                            props.showServers + 8,
                        ),
                    )
                }
            })
        }

        const observer = new IntersectionObserver(handler, options)
        observer.observe(target)

        return () => {
            observer.disconnect()
        }
    }, [props.showServers, props.edition, props.max])

    return <a id={props.id}></a>
}
