import {SongBreadcrumbs} from "../components/molecules/SongBreadcrumbs"
import {Base} from "../components/templates/Base"
// import songs from "../assets/json/songs.json"
import {SongCard} from "../components/molecules/SongCard"
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../provider/AuthProvider.jsx";
import {SPOTIFY_API_URL} from "../config/constants.js";

export const Home = () => {
    const [songs, setSongs] = useState([]);
    const {token} = useContext(AuthContext);
    const loadSongs = async () => {
        try {
            const res = await fetch(`${SPOTIFY_API_URL}recommendations?seed_genres=k-pop%2Cpop%2Canime%2Cmovies`, {
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
            setSongs(data.tracks.map((item) => {
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
        if (token)
            loadSongs();
    }, [token]);
    return (
        <Base>
            <SongBreadcrumbs title="Recommendations"/>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-5">
                {songs.map((song) => <SongCard song={song} key={song.id}/>)}
            </div>
        </Base>
    )
}
