import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Eamil is required'
    }),
    password: z.string().min(4,{
        message:'Password must be at least 4 character'
    })
});

export const RegisterSchema = z.object({
    name: z.string({
        message: 'Name is required'
    }),
    email: z.string().email({
        message: 'Eamil is required'
    }),
    password: z.string().min(4,{
        message:'Password must be at least 4 character'
    })
});