export function Section({
    children,
    id,
    className,
}: {
    children?: any
    id?: string
    className?: string
}) {
    return (
        <div
            id={id}
            className={`w-full flex flex-col items-center pl-4 pr-4 md:pl-16 md:pr-16 ${className}`}
        >
            <div className="flex flex-col gap-4 w-full h-full max-w-content">
                {children}
            </div>
        </div>
    )
}

export function Container({
    children,
    id,
    className,
}: {
    children?: any
    id?: string
    className?: string
}) {
    return (
        <div
            id={id}
            className={`rounded-md p-4 border-2 bg-lightFill border-lightBorder bg-darkFill border-darkOverlay ${className}`}
        >
            {children}
        </div>
    )
}

export function DarkContainer({
    children,
    id,
    className,
}: {
    children?: any
    id?: string
    className?: string
}) {
    return (
        <div
            id={id}
            className={`rounded-md p-4 border-2 bg-lightFill border-lightBorder bg-dark border-darkOverlay ${className}`}
        >
            {children}
        </div>
    )
}
