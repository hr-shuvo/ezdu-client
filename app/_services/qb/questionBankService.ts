import httpClient from "@/lib/httpClient";


export const loadAcademicModelTest = async (subjectId:string) => {
    try {

        const params = {subjectId:subjectId}

        const response = await httpClient.get("/academy/qb", {params:params});
        console.log(response);
        return response.data;

    } catch (err: any) {
        console.error(
            err?.response?.data?.msg ||
            err?.message ||
            "An unexpected error occurred."
        );
        return null;
    }
}