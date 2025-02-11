import httpClient from "@/app/utils/httpClient";
import { cookies } from "next/headers";



export const getCourses = async () => {
    try {
        const response = await httpClient.get('/courses', {
            headers: {
                Cookie: (await cookies()).toString()
            }
        });

        return response.data ;
    }
    catch (err: any) {
        console.error(err?.response?.data?.msg);
        return [];
    }
}