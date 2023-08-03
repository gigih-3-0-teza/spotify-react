import {Base} from "../components/templates/Base.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getTrackDetail} from "../libs/spotify-api.js";
import Banner from "../components/molecules/Banner.jsx";

export default function Track() {
    const {id} = useParams();
    const [track, setTrack] = useState({});
    const loadTrack = async () => {
        try {
            const track = await getTrackDetail(id);
            setTrack({
                id: track.id,
                name: track.name,
                type: "Song",
                thumbnail: track.album.images[0].url,
                description: `${track.artists.map((artist) => artist.name).join(", ")} - ${track.album.name}`,
            });
        } catch (e) {
            console.log(e);
        }
    }
    useEffect( () => {
        loadTrack();
    }, []);
    return (
        <Base>
            <Banner item={track} />
        </Base>
    )
}
