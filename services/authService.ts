import httpClient from "@/lib/httpClient";





export const getCurrentUser = async () => {
    try {
        const response = await httpClient.get('/users/current-user');

        // console.log(response.data);

        return {
            success: true,
            data: response.data
        };
    }
    catch (err: any) {
        // console.error(err)
        return { error: err?.response?.data?.msg };
    }
}


export const sendVerificationCode = async (email: string) => {
    try {
        const response = await httpClient.get(`/auth/sendVerificationCode/${email}`);

        return {
            success: true,
            data: response.data?.message,
        };
    } catch (err: any) {
        return { error: err?.response?.data?.msg };
    }
}


export const verificationByCode = async (email: string, code:string) => {
    try {
        const response = await httpClient.post(`/auth/verificationByCode/${email}`, { code });

        return {
            success: true,
            data: response.data?.message,
        };
    } catch (err: any) {
        return { error: err?.response?.data?.msg };
    }
}

