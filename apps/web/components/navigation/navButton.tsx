import Link from "next/link";

export const NavButton = ({ href, children, currentPage, page }: any) => (
    <Link href={href} className={`fade p-4 pt-2 pb-2 w-fit whitespace-nowrap hover:text-mainText ${currentPage === page ? "text-mainText":""}`}>
        {children}
    </Link>
)