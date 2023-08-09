import {Base} from "../components/templates/Base.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {addTrackToPlaylist, getPlaylists, getTrackDetail} from "../libs/spotify-api.js";
import Banner from "../components/molecules/Banner.jsx";

export default function Track() {
    const {id} = useParams();
    const [track, setTrack] = useState({});
    const [menuShow, setMenuShow] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const loadTrack = async () => {
        try {
            const track = await getTrackDetail(id);
            setTrack({
                id: track.id,
                name: track.name,
                type: "Song",
                thumbnail: track.album.images[0].url,
                uri: track.uri,
                description: `${track.artists.map((artist) => artist.name).join(", ")} - ${track.album.name}`,
            });
        } catch (e) {
            console.log(e);
        }
    }

    const loadPlaylists = async () => {
        try {
            const playlists = await getPlaylists();
            setPlaylists(playlists.items.map((playlist) => {
                return {
                    id: playlist.id,
                    name: playlist.name,
                }
            }));
        } catch (e) {
            console.log(e);
        }
    }

    const handleAddToPlaylist = async (e) => {
        const playlistID = e.target.id;
        setMenuShow(false);
        if (playlistID) {
            try {
                await addTrackToPlaylist(playlistID, track.uri);
                alert("Track added to playlist");
            } catch (e) {
                alert(e.error.message);
            }
        }
    }

    useEffect(() => {
        loadTrack();
        loadPlaylists();
    }, []);
    return (
        <Base>
            <Banner item={track}/>
            <div className="relative inline-block text-left">
                <button type="button"
                        onClick={() => setMenuShow(!menuShow)}
                        className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-slate-700"
                        id="menu-button" aria-expanded="true" aria-haspopup="true">
                    Add to Playlist
                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                         aria-hidden="true">
                        <path fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
                <div
                    className={`absolute ${!menuShow && 'hidden'} left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-slate-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none shadow-2xl`}
                    role="menu" aria-orientation="vertical" aria-labelledby="menu-button"
                    tabIndex="-1">
                    <div className="py-1" role="none">
                        {playlists.map((item) => <button className="w-full text-white block px-4 py-2 text-sm" role="menuitem"
                                                         tabIndex="-1" key={item.id} id={item.id}
                                                         onClick={handleAddToPlaylist}>{item.name}</button>)}
                    </div>
                </div>
            </div>
        </Base>
    )
}
