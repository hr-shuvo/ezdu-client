'use server'

import httpClient from "@/lib/httpClient";
import { cookies } from "next/headers";

export const getLesson = async (id?: string) => {
    try {
        const response = await httpClient.get('/userProgress/getLesson', {
            headers: {
                Cookie: (await cookies()).toString()
            },
            params:{
                id: id
            }
        });

        return response.data;
    }
    catch (err: any) {
        console.error(err?.response?.data?.msg);
        return [];
    }
};