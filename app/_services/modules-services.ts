import httpClient from "../utils/httpClient";

type Module = {
  _id?: string;
  title: string;
  subTitle?: string;
  totalCourse?: string;
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
