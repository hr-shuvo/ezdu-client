'use server';

import { cookies } from "next/headers";
import httpClient from "@/app/utils/httpClient";







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

export const getCourseProgress = async () => {
    try {
        const response = await httpClient.get('/userProgress/courseProgress', {
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
export const getLessonPercentage = async () => {
    try {
        const response = await httpClient.get('/userProgress/getLessonPercentage', {
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













