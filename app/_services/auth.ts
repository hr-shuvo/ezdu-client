// 'ues server';
import { LoginSchema, RegisterSchema } from '@/schemas/auth';
import * as z from 'zod';
import httpClient from '../../lib/httpClient';

export const loginUser = async (values: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(values);

    if (!validateFields.success)
        return { error: 'invalid field' };

    try {
        const response = await httpClient.post('/auth/login', values);
        // console.log('auth service: ', response.data);

        return { success: response.data.message };
    } catch (err: any) {
        return { error: err?.response?.data?.message };
    }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values);

    if (!validateFields.success)
        return { error: 'invalid field' };

    try {
        const response = await httpClient.post('/auth/register', values);

        return { success: response.data.msg };
    } catch (err: any) {
        return { error: err?.response?.data?.msg };
    }
}

export const logout = async () => {
    try {
        await httpClient.post('/auth/logout', {});

        return { success: 'logged out' };
    } catch (err: any) {
        return { error: err?.response?.data?.msg };
    }
}