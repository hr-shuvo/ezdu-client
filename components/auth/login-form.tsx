"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FormError } from "../notification/form-error";
import { FormSuccess } from "../notification/form-success";
import { loginUser } from "@/app/_services/auth";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSecure } from "@/context/SecureContext";
import Link from "next/link";

export const LoginForm = () => {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const { isLoggedIn, login } = useSecure();

    useEffect(() => {
        // console.log("is loggedIn: ", isLoggedIn);
        if (isLoggedIn) {
            router.push("/");
        }
    }, [isLoggedIn, router]);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            // login(values.email, values.password)

            loginUser(values).then((data) => {
                if (data.success) {
                    setSuccess(data.success);
                    login();
                    router.push("/");
                } else {
                    setError(data.error || 'Something went wrong');
                }
            });
        });
    };

    return (
        <CardWrapper
            headerLabel={"Welcome back"}
            backButtonLabel={"dont have an account?"}
            backButtonHref={"/auth/register"}
            showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="email@example.com"
                                            type="email"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormError message={error} />
                    <FormSuccess message={success} />

                    <div className="flex flex-col space-y-2">
                        <Button
                            type="submit"
                            className="w-full"
                            variant="primary"
                            disabled={isPending}
                        >
                            Login
                        </Button>

                        <Link href={'/auth/login-with-code'}>
                            <Button type='button' className={'w-full'}>Login with code</Button>
                        </Link>
                    </div>


                </form>
            </Form>
        </CardWrapper>
    );
};
