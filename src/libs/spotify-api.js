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
        console.log(e);
        throw new Error(e);
    }
}
