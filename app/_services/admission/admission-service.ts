
import httpClient from "@/lib/httpClient";


export const getAdmissionLearningPath = async (category:string) => {
    try {

        const response = await httpClient.get(`/admission/${category}`);
        return response.data;

    } catch (err: any) {
        // console.error(
        //     err?.response?.data?.msg ||
        //     err?.message ||
        //     "An unexpected error occurred."
        // );
        return null;
    }
}
export const getAdmissionUnitLearningPath = async (category:string) => {
    try {

        const response = await httpClient.get(`/admission/units/${category}`);
        return response.data;

    } catch (err: any) {
        // console.error(
        //     err?.response?.data?.msg ||
        //     err?.message ||
        //     "An unexpected error occurred."
        // );
        return null;
    }
}