import Card from "../atoms/Card"
import {Link} from "react-router-dom";

export const SongCard = ({ song }) => {
    return (
        <Link to={song.url}>
            <Card className="p-4 py-4 bg-slate-700 hover:bg-slate-600 cursor-pointer transition-all duration-300">
                <img loading="lazy" src={song.thumbnail} alt={song.title} className="rounded-md w-full shadow-lg mb-2" />
                <h4 className="text-xl mb-2 font-bold">{song.title}</h4>
                <h6 className="text-sm mb-4">By {song.artists.join(", ")}</h6>
            </Card>
        </Link>
    )
}
