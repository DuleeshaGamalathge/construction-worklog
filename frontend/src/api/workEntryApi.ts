import axios from "axios";
import { type WorkEntry } from "../types/WorkEntry";

const BASE_URL = "http://localhost:5058/api/workentries";

//GET
export const getWorkEntries = async (from?: string, to?: string) => {
    const response = await axios.get(BASE_URL, {
        params: {
            from,
            to
        }
    });
    return response.data;
};

//POST
export const createWorkEntry = async (entry: WorkEntry) => {
    const response = await axios.post(BASE_URL, entry);
    return response.data;
};

//DELETE
export const deleteWorkEntry = async (id: number) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
};

//PUT
export const updateWorkEntry = async (id: number, entry: WorkEntry) => {
    const response = await axios.put(`${BASE_URL}/${id}`, entry);
    return response.data;
};