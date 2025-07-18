import httpClient from "@/lib/httpClient";
import { PaginatedList } from "@/utils/pagination";



export const loadAcademicLesson = async (page: number, size: number, subjectId?: string, isTree=true): Promise<PaginatedList> => {
    try {
        const params: Record<string, any> = {
            pg: page,
            sz: size,
            isTree:isTree
        };

        if (subjectId) {
            params.subjectId = subjectId;
        }

        const response = await httpClient.get<PaginatedList>("/academy/lessons", {params: params});

        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return {} as PaginatedList;
    }
};