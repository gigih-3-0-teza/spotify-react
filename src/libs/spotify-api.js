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
        throw new Error(e);
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
        throw new Error(e);
    }
}

export const deleteTrackFromPlaylist = async (playlistId, trackUri, snapshotId) => {
    console.log(trackUri);
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
        throw new Error(e);
    }
}
