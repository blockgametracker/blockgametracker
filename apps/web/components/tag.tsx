const Tag = ({
    text,
    children,
    className,
    color,
}: {
    text: string
    children?: any
    className?: string
    color?: string
}) => (
    <div className={`pl-4 pr-4 w-full flex flex-col ${className}`}>
        <div className="flex flex-row gap-2">
            <p className={`text-sm leading-5`} style={{ color: `${color}` }}>
                ■
            </p>
            <p className="text-mainText">{text}</p>
        </div>
        <p>{children}</p>
    </div>
)

export default Tag
