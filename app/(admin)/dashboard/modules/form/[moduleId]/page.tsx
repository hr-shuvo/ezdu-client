"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { BiArrowBack } from "react-icons/bi";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModuleSchema } from "@/schemas/moduleSchema";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { getModule, upsertModule } from "@/app/_services/modules-services";
import React, { useEffect, useTransition } from "react";

const ModuleEditPage = () => {
    const params = useParams();

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ModuleSchema>>({
        resolver: zodResolver(ModuleSchema),
        defaultValues: {
            title: "",
            subTitle: "",
            totalCourse: 0,
            _id: ""
        }
    });

    const { reset } = form;

    useEffect(() => {
        startTransition(async () => {
            async function loadData() {
                const moduleData = await getModule(params.moduleId);
                reset(moduleData);
            };

            loadData();
        });

    }, [params.moduleId, reset]);

    // console.log(module)


    const onSubmit = async (values: z.infer<typeof ModuleSchema>) => {


        startTransition(async () => {
            await upsertModule(values).then(res => {
                if (res.success) {
                    toast.success(res.success, {
                        duration: 5000,
                        style: {
                            background: 'green',
                            color: 'white'
                        }
                    });

                    // router.push('/dashboard/modules');
                }
                else {
                    toast.error('Something went wrong', {
                        duration: 5000,
                        style: {
                            background: 'red',
                            color: 'white'
                        }
                    });
                }
            });
        });

    }

    return (
        <>
            <div className="w-full my-5 p-5 border">

                <div className="my-5">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <Link href="/" className="text-blue-500 hover:underline">Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <Link href="/dashboard" className="text-blue-500 hover:underline">Dashboard</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <Link href="./" className="text-blue-500 hover:underline">Modules</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Create</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <div className="flex justify-between">
                    <div>
                        <h1 className="text-lg">Module Create</h1>
                    </div>
                    <div>
                        <Link href="../">
                            <Button size='sm' variant='sidebarOutline'>
                                <BiArrowBack /><span> Back</span>
                            </Button>
                        </Link>

                    </div>
                </div>

                <div className="w-full">


                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter title"
                                                    type="text"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="subTitle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>SubTitle</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter subtitle"
                                                    type="text"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="totalCourse"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Total Course</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter Total Course"
                                                    type="number"
                                                    disabled={isPending}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <div className="col-span-2 mt-5 flex justify-end gap-2">
                                    <Button
                                        type="button"
                                        className="w-3/6"
                                        variant="super"
                                        disabled={isPending}
                                        onClick={() => router.push('../')}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="w-3/6"
                                        variant="secondary"
                                        disabled={isPending}
                                    >
                                        Update
                                    </Button>
                                </div>




                            </div>

                        </form>

                    </Form>
                </div>









            </div>
        </>
    )
}

export default ModuleEditPage;