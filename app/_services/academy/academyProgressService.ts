import httpClient from "@/lib/httpClient";
import { PaginatedList } from "@/utils/pagination";




export const getAcademyProgress = async (userId?:string) => {
    try {
        const params: any = {};

        if(userId){
            params.userId = userId;
        }

        const response = await httpClient.get("/users/academy/progress", {params:params});

        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return {} as PaginatedList;
    }
};