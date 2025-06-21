import httpClient from "@/lib/httpClient";


export const loadLeaderboard = async () => {
    try {
        const response = await httpClient.get("/leaderboard");

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