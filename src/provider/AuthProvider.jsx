import {createContext, useEffect, useRef, useState} from "react";
import {SPOTIFY_API_URL, SPOTIFY_AUTH_URL} from "../config/constants.js";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const dataFetchedRef = useRef(false);

    const loadUser = async (localToken) => {
        try {
            const res = await fetch(`${SPOTIFY_API_URL}me`, {
                headers: {
                    'Authorization': `Bearer ${localToken}`,
                    'Content-Type': 'application/json',
                }
            });
            const data = await res.json();
            if (data.error) {
                if (data.error.status === 401) {
                    setIsAuthenticated(false);
                    localStorage.removeItem('SPOTIFY_ACCESS_TOKEN');
                    window.location = SPOTIFY_AUTH_URL;
                }
                console.log(data.error);
                return;
            }
            setUser({
                name: data.display_name,
                spotifyUrl: data.external_urls.spotify,
                followers: data.followers.total,
                id: data.id,
                images: data.images,
            });
        } catch (e) {
            console.log(e);
        }
    }
    // cek from localstorage and run just once
    useEffect(() => {
        const localToken = localStorage.getItem('SPOTIFY_ACCESS_TOKEN');
        if (!localToken) {
            // window.location = SPOTIFY_AUTH_URL;
            return;
        }
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        setIsAuthenticated(true);
        setToken(localToken);
        loadUser(localToken);
    }, []);
    return (
        <AuthContext.Provider value={{token, isAuthenticated, user}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};
