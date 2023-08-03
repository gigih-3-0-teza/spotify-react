import axios from "axios";
import {SPOTIFY_API_URL} from "../config/constants.js";

const token = localStorage.getItem('SPOTIFY_ACCESS_TOKEN');

export const getTrackDetail = async (trackId) => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}tracks/${trackId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const getPlaylistDetail = async (playlistId) => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}playlists/${playlistId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const deleteTrackFromPlaylist = async (playlistId, trackUri, snapshotId) => {
    try {
        const response = await axios.delete(`${SPOTIFY_API_URL}playlists/${playlistId}/tracks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                tracks: [
                    {
                        uri: trackUri,
                    }
                ],
                snapshot_id: snapshotId,
            }
        })
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const getPlaylists = async () => {
    try {
        const playlists = await axios.get(`${SPOTIFY_API_URL}me/playlists`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return playlists.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const addTrackToPlaylist = async (playlistId, trackUri) => {
    try {
        const response = await axios.post(`${SPOTIFY_API_URL}playlists/${playlistId}/tracks`, {
            uris: [trackUri],
            position: 0,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}
