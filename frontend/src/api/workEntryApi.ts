import axios from "axios";

const BASE_URL = "http://localhost:5058/api/workentries";

export const getWorkEntries = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};