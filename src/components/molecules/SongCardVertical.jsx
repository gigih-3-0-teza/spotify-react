import {Link} from "react-router-dom";

export const SongCardVertical = ({ song }) => {
    return (
        <Link to={song.url}>
            <div className="flex gap-x-5 mb-2 py-2 px-6 cursor-pointer hover:bg-slate-700 transition-all duration-300">
                <img loading="lazy" src={song.thumbnail} alt={song.title} className="col-span-1 row-span-2 rounded-md w-14" />
                <div className="col-span-4 row-span-1">
                    <h4 className="text-lg font-bold">{song.title}</h4>
                    <h6 className="text-sm">{song.artists.join(", ")}</h6>
                </div>
            </div>
        </Link>
    )
}
