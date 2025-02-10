'use client';

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { LoginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FormError } from "../notification/form-error";
import { FormSuccess } from "../notification/form-success";

export const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }

    });

    return (
        <CardWrapper
            headerLabel={'Welcome back'}
            backButtonLabel={'dont have an account?'}
            backButtonHref={'/auth/register'}
            showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(() => {
                    })}
                    className='space-y-6'
                >
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='email@example.com' type='email'/>
                                    </FormControl>
                                    <FormMessage/>

                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='password'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='******' type='password'/>
                                    </FormControl>
                                    <FormMessage/>

                                </FormItem>
                            )}
                        />

                    </div>

                    <FormError message=""/>
                    <FormSuccess message=""/>

                    <Button type='submit' className="w-full" variant='primary'>Login</Button>
                </form>

            </Form>

        </CardWrapper>
    )
}