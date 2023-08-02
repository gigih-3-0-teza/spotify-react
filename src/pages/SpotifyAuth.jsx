export const SpotifyAuth = () => {
    const url = new URL(window.location.href);
    const access_token = url.hash.split('=')[1];
    localStorage.setItem('SPOTIFY_ACCESS_TOKEN', access_token);
    window.location.href = '/';
};
