import {Base} from "../components/templates/Base.jsx";
import {useParams} from "react-router-dom";
import axios from "axios";
import {SPOTIFY_API_URL} from "../config/constants.js";
import {AuthContext} from "../provider/AuthProvider.jsx";
import {useContext, useEffect, useState} from "react";
import {SongCardVertical} from "../components/molecules/SongCardVertical.jsx";

const Playlist = () => {
    const {id} = useParams();
    const {token} = useContext(AuthContext);
    const [playlist, setPlaylist] = useState({});
    const [tracks, setTracks] = useState([]);
    const loadPlaylist = async () => {
        axios.get(`${SPOTIFY_API_URL}playlists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => {
            setPlaylist({
                id: res.data.id,
                name: res.data.name,
                owner: res.data.owner.display_name,
                type: res.data.type,
                thumbnail: res.data.images[0].url,
                total: res.data.tracks.total,
            });
            setTracks(res.data.tracks.items.map((item) => {
                return {
                    id: item.track.id,
                    title: item.track.name,
                    artists: item.track.artists.map((artist) => artist.name),
                    thumbnail: item.track.album.images[0].url,
                    url: item.track.external_urls.spotify,
                }
            }));
        }).catch((err) => {
            console.info(err);
        });
    }

    useEffect(() => {
        if (token)
            loadPlaylist();
    }, [token, id]);

    return (
        <Base>
            <div className="flex flex-wrap gap-5 my-8">
                <div className="md:basis-1/6">
                    <img loading="lazy" src={playlist.thumbnail} alt={playlist.name} className="w-1/2 mx-auto sm:w-full" />
                </div>
                <div className="md:mt-auto">
                    <h6 className="text-sm">{playlist.type}</h6>
                    <h1 className="text-4xl font-bold mb-3">{playlist.name}</h1>
                    <h6 className="text-sm"><span className="font-bold">{playlist.owner}</span> - {playlist.total} song</h6>
                </div>
            </div>
            {tracks.map((song) => {
                return (
                    <SongCardVertical song={song} key={song.id}/>
                )
            })}
        </Base>
    )
}
export default Playlist;
