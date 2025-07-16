import httpClient from "@/lib/httpClient";
import { PaginatedList } from "@/utils/pagination";


export const loadAcademicSubject = async (query: string, page: number, size: number, classId?: string, classIds?: string[]): Promise<PaginatedList> => {
    try {
        const params: Record<string, any> = {
            pg: page,
            sz: size
        };

        if (query) {
            params.query = query;
        }

        if (classId) {
            params.classId = classId;
        }

        if (classIds?.length && classIds) {
            params.classIds = classIds;
        }

        const response = await httpClient.get<PaginatedList>("/academy/subjects", { params: params });

        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return {} as PaginatedList;
    }
};


export const getAcademicSubject = async (id?: any): Promise<any> => {
    try {
        const response = await httpClient.get<any>(`/academy/subjects/${id}`);
        // console.log(response)

        return response.data;
    } catch (err: any) {
        // console.error(err.message);
        console.error(err);

        return null!;
    }
};