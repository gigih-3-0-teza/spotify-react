import Icon from "../atoms/Icon"

export const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 py-5 bg-slate-950 flex justify-center shadow-2xl">
            <div className="basis-1/4 flex flex-row">
                <Icon icon="previous" />
                <Icon icon="play" />
                <Icon icon="next" />
            </div>
        </footer>
    )
}