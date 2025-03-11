import httpClient from "../utils/httpClient";
import { PaginatedList } from "../utils/pagination";

export const loadCourses = async (page: number, size:number): Promise<PaginatedList> => {
  try {

    const params = {
        pg: page,
        sz: size
      };


    const response = await httpClient.get<PaginatedList>("/courses", {params:params});
    

    return response.data;
  } catch (err: any) {
    console.error(err?.response?.data?.msg);
    return {} as PaginatedList;
  }
};
