import httpClient from "@/lib/httpClient";


export const loadLeaderboard = async (top?:number) => {
    try {
        const params :Record<string, any> = {};

        if (top) {
            params.top = top;
        }

        const response = await httpClient.get("/leaderboard", { params: params });

        return response.data;

    } catch (err: any) {
        console.error(
            err?.response?.data?.msg ||
            err?.message ||
            "An unexpected error occurred."
        );
        return [];
    }
}