'use server'

import httpClient from "@/app/utils/httpClient";
import { cookies } from "next/headers";



export const getCourses = async () => {
    try {
        const response = await httpClient.get('/courses', {
            headers: {
                Cookie: (await cookies()).toString()
            }
        });

        return response.data;
    }
    catch (err: any) {
        console.error(err?.response?.data?.msg);
        return [];
    }
};



export const getUserProgress = async () => {
    try {
        const response = await httpClient.get('/userProgress', {
            headers: {
                Cookie: (await cookies()).toString()
            }
        });

        return response.data;
    }
    catch (err: any) {
        // console.error(err);
        return null;
    }
};

export const upsertUserProgress = async (courseId: string) => {
    try {
        const response = await httpClient.post('/userProgress/selectUserCourse', { courseId }, {
            headers: {
                Cookie: (await cookies()).toString()
            }
        });

        return response.data;
    }
    catch (err: any) {
        // console.error(err);
        return null;
    }
};

export const getUnits = async () => {
    try {
        const response = await httpClient.get('/userUnits', {
            headers: {
                Cookie: (await cookies()).toString()
            }
        });

        return response.data;
    }
    catch (err: any) {
        // console.error(err);
        return null;
    }
};







