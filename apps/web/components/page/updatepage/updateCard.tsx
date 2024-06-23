import { Update } from "@/utils/updateUtils"
import Link from "next/link"

export interface Props {
    update: Update
    active?: Update
}

export const UpdateCard = ({ update, active }: Props) => {
    const isActive = update === active

    return (
        <Link
            aria-label={update.title}
            href={`/updates/${update.id}`}
            className={`flex flex-row items-center gap-4 fade w-full p-4 ${isActive ? "bg-darkSelected" : "hover:bg-darkSelected"}`}
        >
            <div className="flex items-center justify-center size-14 rounded-md bg-mainColor">
                <span className="text-dark font-bold">{update.id}</span>
            </div>
            <div>
                <div className="inline-flex gap-2">
                    <p className="text-mainText font-medium">{update.title}</p>
                    <p>{update.date}</p>
                </div>
                <p>Author: {update.author}</p>
            </div>
        </Link>
    )
}
