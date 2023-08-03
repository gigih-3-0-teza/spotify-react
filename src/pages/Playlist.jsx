import {Base} from "../components/templates/Base.jsx";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {SongCardVertical} from "../components/molecules/SongCardVertical.jsx";
import Banner from "../components/molecules/Banner.jsx";
import {deleteTrackFromPlaylist, getPlaylistDetail} from "../libs/spotify-api.js";
import ButtonIcon from "../components/molecules/ButtonIcon.jsx";
import {AuthContext} from "../provider/AuthProvider.jsx";

const Playlist = () => {
    const {id} = useParams();
    const [playlist, setPlaylist] = useState({});
    const [tracks, setTracks] = useState([]);
    const {user} = useContext(AuthContext);
    const loadPlaylist = async () => {
        try {
            const playlist = await getPlaylistDetail(id);
            setPlaylist({
                id: playlist.id,
                name: playlist.name,
                type: playlist.type,
                thumbnail: playlist.images[0].url,
                snapshot: playlist.snapshot_id,
                description: `${playlist.owner.display_name} - ${playlist.tracks.total} song`,
                ownerID: playlist.owner.id,
            });
            setTracks(playlist.tracks.items.map((item) => {
                return {
                    id: item.track.id,
                    title: item.track.name,
                    artists: item.track.artists.map((artist) => artist.name),
                    thumbnail: item.track.album.images[0].url,
                    url: `/track/${item.track.id}`,
                    uri: item.track.uri,
                }
            }));
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        loadPlaylist();
    }, [id]);

    const handleCLick = async (e) => {
        const uri = e.target.id;
        if (uri) {
            try {
                const res = await deleteTrackFromPlaylist(playlist.id, uri, playlist.snapshot);
                if (res) {
                    const newTracks = tracks.filter((track) => track.uri !== uri);
                    setTracks(newTracks);
                }
            } catch (e) {
                alert(e.error.message);
            }
        }
    }
    const ButtonDelete = ({uri}) => {
        return (
            <button onClick={handleCLick} className="hover:underline" id={uri}>
                remove
            </button>
        )
    }

    return (
        <Base>
            <Banner item={playlist}/>
            {tracks.map((song) => {
                return (
                    <SongCardVertical song={song} key={song.id} action={user.id === playlist.ownerID && <ButtonDelete uri={song.uri}/>}/>
                )
            })}
        </Base>
    )
}
export default Playlist;
