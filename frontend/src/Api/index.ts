import axios from "axios";

export async function FetchSinglePokemon(name: string) {
    try {
        const response = await axios.get(`http://localhost:8080/pokemon/${encodeURIComponent(name)}`, {
        });
        return response.data;
    } catch (err: any) {
        const msg = err?.response?.data?.message ?? err?.message ?? "unknown error";
        return { success: false, error: String(msg) };
    }
}