import {Base} from "../components/templates/Base.jsx";
import {useParams} from "react-router-dom";
import axios from "axios";
import {SPOTIFY_API_URL} from "../config/constants.js";
import {AuthContext} from "../provider/AuthProvider.jsx";
import {useContext, useEffect, useState} from "react";
import {SongCardVertical} from "../components/molecules/SongCardVertical.jsx";
import Banner from "../components/molecules/Banner.jsx";

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
                type: res.data.type,
                thumbnail: res.data.images[0].url,
                snapshot: res.data.snapshot_id,
                description: `${res.data.owner.display_name} - ${res.data.tracks.total} song`,
            });
            setTracks(res.data.tracks.items.map((item) => {
                return {
                    id: item.track.id,
                    title: item.track.name,
                    artists: item.track.artists.map((artist) => artist.name),
                    thumbnail: item.track.album.images[0].url,
                    url: `/track/${item.track.id}`,
                    uri: item.track.uri,
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
            <Banner item={playlist} />
            {tracks.map((song) => {
                return (
                    <SongCardVertical song={song} key={song.id}/>
                )
            })}
        </Base>
    )
}
export default Playlist;
