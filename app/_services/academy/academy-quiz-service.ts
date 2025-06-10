import httpClient from "@/lib/httpClient";


export const getOngoingQuiz = async () => {
    try {
        const response = await httpClient.get("/academy/quiz/ongoing");

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


export const loadOrCreateQuize = async (duration: number, lessonIds: string[], type: "cq" | "mcq", subjectId?: string) => {
    try {

        const model = {
            duration: duration,
            lessonIds: lessonIds,
            type: type,
            subjectId: subjectId
        };
        // console.log(model);

        const response = await httpClient.post("/academy/quiz/loadorcreate", model);

        return response.data;

    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return null;
    }
}

export const upsertQuiz = async (quiz: any) => {
    try {

        const response = await httpClient.post("/academy/quiz/upsert", quiz);
        // console.log('post quiz: ', quiz);

        return response.data;

    } catch (err: any) {
        console.error(err?.response?.data?.msg);
        return null;
    }

}

