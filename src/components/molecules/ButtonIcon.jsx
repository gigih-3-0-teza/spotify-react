import Icon from "../atoms/Icon";

export default function ButtonIcon({ icon }) {
    return (
        <button className={`h-8 p-2 rounded-full bg-slate-950 w-8 mr-1 hover:scale-105 hover:text-slate-50`}>
            <Icon icon={icon} />
        </button>
    )
}