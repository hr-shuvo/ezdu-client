'use client';

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { emailFormSchema } from "@/schemas/auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { sendVerificationCode } from "@/services/authService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


type EmailFormValues = z.infer<typeof emailFormSchema>;

const LoginWithCodePage = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<EmailFormValues>({
        resolver: zodResolver(emailFormSchema),
        defaultValues: {
            email: "",
        },
    });

    const handleSubmit = () => {
        startTransition((async () =>{
            const email = form.getValues("email");

            const response = await sendVerificationCode(email);

            if (response.success) {
                // Handle success, e.g., show a success message or redirect
                toast.success("Verification code successfully");
                router.push(`/auth/verify?email=${email}`);
            } else {
                // Handle error, e.g., show an error message
                console.error("Error sending verification code:", response.error);
            }


        }))
    };


    return (
        <CardWrapper
            headerLabel={"Login with code"}
            backButtonLabel={"back to login"}
            backButtonHref={"/auth/login"}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
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

                    <Button type="submit" variant={'primary'} disabled={isPending}>
                        Send Verification Code
                    </Button>
                </form>
            </Form>




        </CardWrapper>
    );
}

export default LoginWithCodePage;