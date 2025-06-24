import axios from "axios";

const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/',
    withCredentials: true,
});


let errorHandler: ((msg: string) => void) | null = null;

export const setGlobalErrorHandler = (handler: (msg: string) => void) => {
    errorHandler = handler;
};

httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;

        console.log('err: ', error);

        if (errorHandler) {
            errorHandler(`${status}: ${message}`);
        }

        return Promise.reject(error);
    }
)

export default httpClient;