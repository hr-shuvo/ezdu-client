import httpClient from "../utils/httpClient";

type Module = {
    _id?: string;
    title: string;
    subTitle?: string;
    totalCourse?: number;
};

export const loadModules = async () => {
    try {
        const response = await httpClient.get<Module[]>("/modules");

        return response.data;
    } catch (err: any) {
        console.error(err);
        return [];
        // return { error: err?.response?.data?.msg };
    }
};

export const getModule = async (moduleId?: any): Promise<Module> => {
    try {
        const response = await httpClient.get<Module>(`/modules/${moduleId}`);

        return response.data;
    } catch (err: any) {
        // console.error(err.message);
        console.error(err);

        return null!;
    }
};

export const upsertModule = async (module: any) => {
    try {
        const response = await httpClient.post(`/modules/create`, module);

        if (response.status === 201 || response.status === 200) {
            return {success: response.data}
        }
        return {error: response.data}
    } catch (err: any) {
        // console.error(err.message);
        console.error(err);

        return {error: 'error'}
    }
};
