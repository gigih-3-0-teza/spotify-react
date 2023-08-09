import {SongBreadcrumbs} from "../components/molecules/SongBreadcrumbs"
import {Base} from "../components/templates/Base"
// import songs from "../assets/json/songs.json"
import {SongCard} from "../components/molecules/SongCard"
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../provider/AuthProvider.jsx";
import {SPOTIFY_API_URL} from "../config/constants.js";

export const Search = () => {
    const [songs, setSongs] = useState([]);
    const [search, setSearch] = useState("");
    const {token} = useContext(AuthContext);
    const handleChange = (event) => {
        setSearch(event.target.value);
    }
    const loadSongs = async () => {
        try {
            const res = await fetch(`${SPOTIFY_API_URL}search?type=track&q=${search}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (data.error) {
                console.log(data.error);
                return;
            }
            setSongs(data.tracks.items.map((item) => {
                return {
                    id: item.id,
                    title: item.name,
                    artists: item.artists.map((artist) => artist.name),
                    thumbnail: item.album.images[0].url,
                    url: `/track/${item.id}`,
                }
            }));
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (token && search)
            loadSongs();
    }, [token, search]);
    return (
        <Base>
            <div className="relative mb-5">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search"
                       className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="What do you want to listen to?" required value={search} onChange={handleChange}/>
            </div>
            <SongBreadcrumbs title="Search result"/>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-5">
                {songs.map((song) => {
                    return (
                        <SongCard song={song} key={song.id}/>
                    )
                })}
            </div>
        </Base>
    )
}
