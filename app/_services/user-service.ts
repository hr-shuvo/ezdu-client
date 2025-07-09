import httpClient from "@/lib/httpClient";


export const getUserProfile = async (username: string) => {
    try {
        const response = await httpClient.get(`/auth/user/${username}`);

        // console.log(response.data);
        return response.data;

    } catch (err: any) {
        // console.error(err.message);
        // console.error(err);

        return {error: err.response?.data?.message};
    }
}


export const updateUser = async (userData: any) => {
    try {
        const response = await httpClient.put(`/users/update-user`, userData);

        // console.log(response.data)
        if (response.status === 201 || response.status === 200) {
            return {success: response.data.data};
        }
        return {error: response?.data?.msg};
    } catch (err: any) {
        // console.error(err.message);
        // console.error(err);

        return {error: err.response?.data?.msg};
    }
};