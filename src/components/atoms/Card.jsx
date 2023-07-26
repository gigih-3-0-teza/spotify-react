export default function Card({ children, className = "" }) {
    return (
        <div className={`bg-slate-800 rounded-md py-2 ${className}`}>
            {children}
        </div>
    )
}