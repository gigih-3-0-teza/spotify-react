import {Home} from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SpotifyAuth} from "./pages/SpotifyAuth.jsx";

export default function App() {
    //   set context for spotify api

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/callback-spotify" element={<SpotifyAuth/>}/>
            </Routes>
        </BrowserRouter>
    )
}
