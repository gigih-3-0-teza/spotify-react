import {Home} from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SpotifyAuth} from "./pages/SpotifyAuth.jsx";
import {Search} from "./pages/Search.jsx";
import Playlist from "./pages/Playlist.jsx";
import Track from "./pages/Track.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/callback-spotify" element={<SpotifyAuth/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/playlist/:id" element={<Playlist/>}/>
                <Route path="/track/:id" element={<Track/>}/>
            </Routes>
        </BrowserRouter>
    )
}
