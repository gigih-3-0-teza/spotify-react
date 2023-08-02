import Icon from "./Icon";

export default function ListItem({ text, icon }) {
    return (
        <li>
            <span className="py-3 px-1 font-bold hover:bg-slate-900 hover:text-slate-50 flex flex-row">
                <span className="basis-1/6 justify-center">
                    <Icon icon={icon} />
                </span>
                <span className="basis-5/6">{text}</span>
            </span>
        </li>
    )
}
