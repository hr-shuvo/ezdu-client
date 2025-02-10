// 'ues server';
import { LoginSchema, RegisterSchema } from '@/schemas/auth';
import * as z from 'zod';
import httpClient from '../utils/httpClient';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(values);

    if (!validateFields.success)
        return { error: 'invalid field' };

    try {
        const response = await httpClient.post('/auth/login', values);

        return { success: response.data.msg };
    } catch (err:any) {
        return { error: err?.response?.data?.msg };
    }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values);

    if (!validateFields.success)
        return { error: 'invalid field' };

    try {
        const response = await httpClient.post('/auth/register', values);

        return { success: response.data.msg };
    } catch (err:any) {
        return { error: err?.response?.data?.msg };
    }
}