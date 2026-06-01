import axios from "axios";
import { type WorkEntry } from "../types/WorkEntry";

const BASE_URL = "http://localhost:5058/api/workentries";

export const getWorkEntries = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const createWorkEntry = async (entry: WorkEntry) => {
    const response = await axios.post(BASE_URL, entry);
    return response.data;
};