export function Section({ children, className }: any) {
    return (
        <div className={`w-full flex flex-col items-center ${className}`}>
            <div className="flex flex-col gap-4 w-full h-full max-w-content">{children}</div>
        </div>
    )
}

export function Container({ children, className }: any) {
    return (
        <div
            className={`rounded-md p-4 border-2 bg-lightFill border-lightBorder bg-darkFill border-darkOverlay ${className}`}
        >
            {children}
        </div>
    )
}

export function DarkContainer({ children, className }: any) {
    return (
        <div
            className={`rounded-md p-4 border-2 bg-lightFill border-lightBorder bg-dark border-darkOverlay ${className}`}
        >
            {children}
        </div>
    )
}
