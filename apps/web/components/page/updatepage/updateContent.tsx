import { Update } from "@/utils/updateUtils"
import Link from "next/link"
import localFont from "next/font/local"

const Expose = localFont({
    src: "../../../public/fonts/Expose-Bold.otf",
    display: "swap",
})

export interface Props {
    update: Update
}

export const UpdateContent = ({ update }: Props) => (
    <article className="fade w-full p-4">
        <h1 className={`text-5xl text-mainText ${Expose.className}`}>
            {update.title}
        </h1>
        <p>Author: {update.author}</p>
        <div className="flex flex-col gap-8">
            {update.sections.map((section, index) => (
                <div>
                    <h2>{section.title}:</h2>
                    <ul>
                        {section.changes.map((change, index) => (
                            <li
                                key={index}
                                className="flex flex-row gap-4 items-center"
                            >
                                <span className="size-2 bg-secondText rounded-full"></span>
                                {change}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </article>
)
