"use client"

import { URLParams, buildURL } from "@/utils/urlBuilder"
import { useRouter } from "next/navigation"
import { PropsWithChildren, useEffect } from "react"

interface Props extends URLParams, PropsWithChildren {
    id: string
    max: number
    active: boolean
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
                    props.showServers < props.max &&
                    props.active
                ) {
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
    }, [props.showServers, props.edition, props.max, props.active])

    return <div id={props.id}>{props.children}</div>
}
