import Link from "next/link"

export const Footer = () => (
    <div className="tablet:sticky bottom-0 flex flex-col w-full items-center gap-2 px-8 py-2 bg-darkFill mt-auto">
        <p>blockgametracker by</p>
        <div className="inline-flex gap-2">
            <Link
                href="https://github.com/MagicA550"
                className="text-mainText p-2  tablet:p-0"
            >
                Anthony,
            </Link>
            <Link
                href="https://grafisch.media/"
                className="text-mainText p-2  tablet:p-0"
            >
                Jelle,
            </Link>
            <Link
                href="https://github.com/clrxbl"
                className="text-mainText p-2 tablet:p-0"
            >
                Michael
            </Link>
        </div>
    </div>
)
