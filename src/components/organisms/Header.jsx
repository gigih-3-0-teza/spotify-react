import ButtonIcon from "../molecules/ButtonIcon"
import {SPOTIFY_AUTH_URL} from "../../config/constants.js";
import {AuthContext} from "../../provider/AuthProvider.jsx";
import {useContext} from "react";
import {Link} from "react-router-dom";

export const Header = () => {
    const {isAuthenticated} = useContext(AuthContext);
    return (
        <header className="sticky top-0 flex flex-row py-3 mb-2 bg-slate-800">
            <div className="basis-1/2">
                <ButtonIcon icon="chevron-left" />
                <ButtonIcon icon="chevron-right" />
            </div>
            <div className="basis-1/2 flex flex-row justify-end">
                <Link to={isAuthenticated ? "/profile" : SPOTIFY_AUTH_URL}>
                    <ButtonIcon icon="user" />
                </Link>
            </div>
        </header>
    )
}
