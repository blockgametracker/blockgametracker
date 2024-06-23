import updates from "../components/page/updatepage/updates.json"

export interface Update {
    id: string
    title: string
    date: string
    author: string
    sections: UpdateSection[]
}

export interface UpdateSection {
    title: string
    changes: string[]
}

export const getUpdate = (id: string) => {
    return updates.find((update) => update.id === id)
}
