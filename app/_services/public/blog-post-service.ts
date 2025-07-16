import { PaginatedList } from "@/utils/pagination";
import httpClient from "@/lib/httpClient";


export const loadBlogPost = async (
    page: number,
    size: number,
    type?: string,
    author?: string,

): Promise<PaginatedList> => {
    try {
        const params: Record<string, any> = {
            pg: page,
            sz: size,
        };

        if (type) {
            params.type = type;
        }

        if (author) {
            params.author = author;
        }

        const response = await httpClient.get<PaginatedList>("/blog", {
            params: params,
        });

        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return {} as PaginatedList;
    }
};


export const getBlogPost= async (id?: any): Promise<any> => {
    try {
        const response = await httpClient.get<any>(`/blog/${id}`);
        // console.log(response)

        return response.data;
    } catch (err: any) {
        // console.error(err.message);
        console.error(err);

        return null!;
    }
};
