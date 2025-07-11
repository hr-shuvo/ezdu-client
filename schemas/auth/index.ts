import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Eamil is required'
    }),
    password: z.string().min(1,{
        message:'Password is required'
    })
});

export const RegisterSchema = z.object({
    name: z.string().min(1,{
        message: 'Name is required'
    }),
    email: z.string().email({
        message: 'Eamil is required'
    }),
    password: z.string().min(4,{
        message:'Password must be at least 4 character'
    })
});

export const emailFormSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});