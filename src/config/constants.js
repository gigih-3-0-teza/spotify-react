const env = import.meta.env;
export const SPOTIFY_AUTH_URL = `${env.VITE_AUTH_ENDPOINT}?${
    new URLSearchParams({
        client_id: env.VITE_SPOTIFY_CLIENT_ID,
        redirect_uri: env.VITE_REDIRECT_URI,
        response_type: env.VITE_RESPONSE_TYPE,
        scope: env.VITE_SPOTIFY_SCOPE,
    })
}`;

export const SPOTIFY_API_URL = env.VITE_SPOTIFY_API_URL;
