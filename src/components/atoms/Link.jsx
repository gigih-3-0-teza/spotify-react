export const Link = ({ className, children }) => {
    return (
        <a href="#" className={`font-bold hover:underline hover:text-slate-50 ${className}`}>{children}</a>
    )
}