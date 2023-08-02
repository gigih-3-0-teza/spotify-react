import Card from "../atoms/Card"
import ListItem from "../atoms/ListItem"
import List from "../molecules/List"
import {SongCardVertical} from "../molecules/SongCardVertical"
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../provider/AuthProvider.jsx";
import {SPOTIFY_API_URL} from "../../config/constants.js";

export const Sidebar = () => {
    const {token} = useContext(AuthContext);
    const [playlists, setPlaylists] = useState([]);
    const loadPlaylists = async () => {
        try {
            const res = await fetch(`${SPOTIFY_API_URL}me/playlists`, {
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
            setPlaylists(data.items.map((item) => {
                return {
                    id: item.id,
                    title: item.name,
                    artists: [item.type, item.owner.display_name],
                    thumbnail: item.images[0].url,
                    url: item.external_urls.spotify,
                }
            }));
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        if (token)
            loadPlaylists();
    }, [token]);
    return (
        <aside className="basis-1/3 flex flex-col gap-y-2">
            <Card className="sticky top-0">
                <List>
                    <ListItem icon="home" text="Home"/>
                    <ListItem icon="search" text="Search"/>
                </List>
            </Card>
            <Card>
                <List className="mb-4">
                    <ListItem icon="book" text="Your Library"/>
                </List>
                <div className="max-h-80 hover:overflow-y-scroll overflow-hidden hover:overscroll-none">
                    {playlists.map((song) => {
                        return (
                            <SongCardVertical song={song} key={song.id}/>
                        )
                    })}
                </div>
            </Card>
        </aside>
    )
}
