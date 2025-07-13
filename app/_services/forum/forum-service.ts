import { PaginatedList } from "@/app/utils/pagination";
import httpClient from "@/lib/httpClient";

export const loadForums = async (
    page: number,
    size: number,
): Promise<PaginatedList> => {
    try {
        const params: Record<string, any> = {
            pg: page,
            sz: size,
        };

        const response = await httpClient.get<PaginatedList>("/discussion/posts", {
            params: params,
        });

        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return {} as PaginatedList;
    }
};


export const getForumPost = async (id?: any): Promise<any> => {
    try {
        const response = await httpClient.get<any>(`/discussion/posts/${id}`);
        // console.log(response)

        return response.data;
    } catch (err: any) {
        // console.error(err.message);
        console.error(err);

        return null!;
    }
};

export const upsertForum = async (data: any): Promise<any> => {
    try {
        const response = await httpClient.post<any>("/discussion/posts/upsert", data);
        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return null!;
    }
};


// comment

export const loadForumComments = async (
    page: number,
    size: number,
    forumId?: string,
): Promise<PaginatedList> => {
    try {
        const params: Record<string, any> = {
            pg: page,
            sz: size,
        };

        if (forumId) {
            params.discussionId = forumId;
        }

        const response = await httpClient.get<PaginatedList>("/discussion/comments", {
            params: params,
        });

        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return {} as PaginatedList;
    }
};


export const getForumComment = async (id?: any): Promise<any> => {
    try {
        const response = await httpClient.get<any>(`/discussion/comments/${id}`);
        // console.log(response)

        return response.data;
    } catch (err: any) {
        // console.error(err.message);
        console.error(err);

        return null!;
    }
};

export const upsertForumComment = async (data: any): Promise<any> => {
    try {
        const response = await httpClient.post<any>("/discussion/comments/upsert", data);
        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return null!;
    }
};