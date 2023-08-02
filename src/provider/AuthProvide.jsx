import {createContext, useEffect, useRef, useState} from "react";
import {SPOTIFY_API_URL, SPOTIFY_AUTH_URL} from "../config/constants.js";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const dataFetchedRef = useRef(false);
    // cek from localstorage and run just once
    useEffect(() => {
        const localToken = localStorage.getItem('SPOTIFY_ACCESS_TOKEN');
        if (localToken) {
            if (dataFetchedRef.current) return;
            dataFetchedRef.current = true;
            setIsAuthenticated(true);
            setToken(localToken);
            fetch(`${SPOTIFY_API_URL}me`, {
                headers: {
                    'Authorization': `Bearer ${localToken}`,
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {
                    setUser({
                        name: data.display_name,
                        spotifyUrl: data.external_urls.spotify,
                        followers: data.followers.total,
                        id: data.id,
                        images: data.images,
                    });
                }).catch(err => {
                    if (err.status === 401) {
                        window.location.href = SPOTIFY_AUTH_URL;
                    }
                    console.log(err);
                });
        }
    }, []);
    return (
        <AuthContext.Provider value={{token, isAuthenticated, user}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};
