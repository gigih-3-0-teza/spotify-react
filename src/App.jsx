import {Home} from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SpotifyAuth} from "./pages/SpotifyAuth.jsx";
import {Search} from "./pages/Search.jsx";

export default function App() {
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/callback-spotify" element={<SpotifyAuth/>}/>
            <Route path="/search" element={<Search/>}/>
        </Routes>
    </BrowserRouter>)
}
