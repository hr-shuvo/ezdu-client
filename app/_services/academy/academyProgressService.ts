import httpClient from "@/lib/httpClient";
import { PaginatedList } from "@/utils/pagination";




export const getAcademyProgress = async () => {
    try {       

        const response = await httpClient.get("/users/academy/progress");

        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return {} as PaginatedList;
    }
};