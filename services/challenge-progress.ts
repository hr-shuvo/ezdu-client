'use server';

import httpClient from "@/app/utils/httpClient";
import { cookies } from "next/headers";

export const upsertChallengeProgress = async (challengeId: any) => {
    console.log(challengeId)
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