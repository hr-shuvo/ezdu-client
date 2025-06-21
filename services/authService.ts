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