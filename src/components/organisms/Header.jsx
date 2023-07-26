import ButtonIcon from "../molecules/ButtonIcon"

export const Header = () => {
    return (
        <header className="sticky top-0 flex flex-row py-3 mb-2 bg-slate-800">
            <div className="basis-1/2">
                <ButtonIcon icon="chevron-left" />
                <ButtonIcon icon="chevron-right" />
            </div>
            <div className="basis-1/2 flex flex-row justify-end">
                <ButtonIcon icon="user" />
            </div>
        </header>
    )
}