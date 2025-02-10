// 'ues server';
import { LoginSchema, RegisterSchema } from '@/schemas/auth';
import * as z from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) =>{
    const validateFields = LoginSchema.safeParse(values);

    if(!validateFields.success)
        return {error : 'invalid field'};


    
    

    return {success: 'Email sent!'};    
};

export const register = async (values: z.infer<typeof RegisterSchema>) =>{
    const validateFields = RegisterSchema.safeParse(values);

    if(!validateFields.success)
        return {error : 'invalid field'};


    
    

    return {success: 'Email sent!'};    
}