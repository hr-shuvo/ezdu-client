import httpClient from "@/lib/httpClient";
import { PaginatedList } from "@/app/utils/pagination";


export const loadAcademyMcq = async (page: number, size: number, subjectId: string, lessonId?:string, instituteIds?:string[], year?:string): Promise<PaginatedList> => {
    try {
        const params: Record<string, any> = {
            pg: page,
            sz: size,
        };

        if (subjectId) {
            params.subjectId = subjectId;
        }

        if (lessonId) {
            params.lessonId = lessonId;
        }

        if(instituteIds && instituteIds.length > 0){
          params.instituteIds = instituteIds;
        }

        if(year){
          params.year = year;
        }

        const response = await httpClient.get<PaginatedList>("/academy/mcq", {params: params});

        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return {} as PaginatedList;
    }
};