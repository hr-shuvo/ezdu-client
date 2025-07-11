'use server';

import httpClient from "@/lib/httpClient";
import { cookies } from "next/headers";

export const upsertChallengeProgress = async (challengeId: any) => {
    try {
        const response = await httpClient.post('/challengeProgress/upsert', { challengeId: challengeId }, {
            headers: {
                Cookie: (await cookies()).toString()
            }
        });

        if (response.data) {
            return { success: 'upsert success ' };
        }
        return { error: response.data.msg };
    }
    catch(err:any) {
        return { error: err.response.data.msg };
    }

}

export const reduceHearts = async (challengeId: any) => {
    try {
        const response = await httpClient.post('/challengeProgress/reduceHearts', { challengeId: challengeId }, {
            headers: {
                Cookie: (await cookies()).toString()
            }
        });

        if (response.data) {
            return { success: 'upsert success ' };
        }
        return { error: response.data.msg };
    }
    catch(err:any) {
        return { error: err.response.data.msg };
    }

}





























// export const getCourses = async () => {
//     try {
//         const response = await httpClient.get('/courses', {
//             headers: {
//                 Cookie: (await cookies()).toString()
//             }
//         });

//         return response.data;
//     }
//     catch (err: any) {
//         console.error(err?.response?.data?.msg);
//         return [];
//     }
// };