import { PaginatedList } from "@/app/utils/pagination";
import httpClient from "@/lib/httpClient";


export const loadAcademicModelTest = async (page:number, size:number, subjectId:string, instituteId?:string, year?:number) => {
    try {
        const params: Record<string, any> = {
            pg: page,
            sz: size,
            subjectId:subjectId,
        };

        if(instituteId){
            params.instituteId = instituteId;
        }

        if(year){
            params.year = year;
        }

        const response = await httpClient.get("/academy/qb/modeltest", {params:params});
        // console.log(response.data);
        return response.data;

    } catch (err: any) {
        console.error(
            err?.response?.data?.msg ||
            err?.message ||
            "An unexpected error occurred."
        );
        return null;
    }
}

export const getAcademicModelTest = async (modeltestId:string) => {
    try {

        // const params = {
        //     subjectId:subjectId,
        //     instituteId:instituteId
        // }

        const response = await httpClient.get(`/academy/qb/modeltest/${modeltestId}`);
        return response.data;
    } catch (err: any) {
        console.error(
            err?.response?.data?.msg ||
            err?.message ||
            "An unexpected error occurred."
        );
        return null;
    }
}