import httpClient from "@/app/utils/httpClient";
import { cookies } from "next/headers";



export const getCourses = async () => {
    try {
        const response = await httpClient.get('/courses', {
            headers: {
                Cookie: (await cookies()).toString()
            }
        });

        console.log(response.data);

        return { success: response.data.msg };
    }
    catch (err: any) {
        return { error: err?.response?.data?.msg };
    }
}