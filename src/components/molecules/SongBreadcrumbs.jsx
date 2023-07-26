import { Link } from "../atoms/Link"

export const SongBreadcrumbs = ({ title }) => {
    return (
        <div className="flex flex-row mb-6">
            <div className="basis-1/2">
                <Link className="text-2xl">
                    {title}
                </Link>
            </div>
            <div className="basis-1/2 flex justify-end content-center">
                <Link className="float-right text-sm my-auto">
                    Show all
                </Link>
            </div>
        </div>
    )
}