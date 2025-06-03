import httpClient from "@/app/utils/httpClient";
import { PaginatedList } from "@/app/utils/pagination";




export const loadAcademicClass = async (page: number, size: number, level?: string, version?: string): Promise<PaginatedList> => {
    try {
        const params: Record<string, any> = {
            pg: page,
            sz: size
        };

        if (version) {
            params.version = version;
        }

        if (level && level != 'all') {
            params.level = level;
        }

        const response = await httpClient.get<PaginatedList>("/academy/classes", { params: params });

        return response.data;
    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return {} as PaginatedList;
    }
};