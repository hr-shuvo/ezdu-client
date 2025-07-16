import httpClient from "@/lib/httpClient";
import { PaginatedList } from "@/utils/pagination";



export const loadAcademicLessonContent = async (page: number, size: number, lessonId?: string): Promise<PaginatedList> => {
    try {
        const params: Record<string, any> = {
            pg: page,
            sz: size
        };

        if (lessonId) {
            params.lessonId = lessonId;
        }

        const response = await httpClient.get<PaginatedList>("/academy/c", {params: params});

        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return {} as PaginatedList;
    }
};

export const getAcademicLesson = async (id?: any): Promise<any> => {
    try {
        const response = await httpClient.get<any>(`/academy/lessons/${id}`);
        // console.log(response)

        return response.data;
    } catch (err: any) {
        // console.error(err.message);
        console.error(err);

        return null!;
    }
};