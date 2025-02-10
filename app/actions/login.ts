// 'ues server';
import { LoginSchema } from '@/schemas/auth';
import * as z from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) =>{
    const validateFields = LoginSchema.safeParse(values);

    if(!validateFields.success)
        return {error : 'invalid field'};


    
    

    return {success: 'Email sent!'};    
}