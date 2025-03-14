import httpClient from "../utils/httpClient";
import { PaginatedList } from "../utils/pagination";

export const loadUnits = async (page: number, size:number, courseId?:string): Promise<PaginatedList> => {
    try {
  
      const params: Record<string, any> = {
          pg: page,
          sz: size
        };
  
        if(courseId){
          params.courseId = courseId;
        }
  
      const response = await httpClient.get<PaginatedList>("/units", {params:params});
      
  
      return response.data;
    } catch (err: any) {
      console.error(err?.response?.data?.msg);
      return {} as PaginatedList;
    }
  };