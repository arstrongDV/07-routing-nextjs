import axios from "axios";
import type { Note } from "../types/note";

const api = axios.create({
    baseURL: 'https://notehub-public.goit.study/api/',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
    }
})

export interface fetchNotesResponse {
    notes: Note[];
    totalPages: number;
}
interface FetchNotesProps {
    page?: number;
    search?: string;
    category?: string;
}
export const fetchNotes = async (params?: FetchNotesProps): Promise<fetchNotesResponse> => {
    const res = await api.get<fetchNotesResponse>('/notes', {params: params});
    return res.data;
};


export const fetchNote = async(id: string): Promise<Note> => {
    console.log("Fetching URL:", `/notes/${id}`);
    const res = await api.get<Note>(`/notes/${id}`);
    console.log(res);
    return res.data;
}

interface NotesData {
    title: string;
    content: string;
    tag: string;
}
export const createNote = async (data: NotesData): Promise<Note> => {
    const res = await api.post<Note>('/notes', data);
    return res.data;
};


export const deleteNote = async (id: string): Promise<Note> => {
    const res = await api.delete<Note>(`/notes/${id}`);
    return res.data;
};
