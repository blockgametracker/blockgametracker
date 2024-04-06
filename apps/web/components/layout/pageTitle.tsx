"use client"

import { useEffect } from "react"

const PageTitle = ({ title }: any) => {
    useEffect(() => {
        document.title = title
    }, [title])

    return null
}

export default PageTitle
