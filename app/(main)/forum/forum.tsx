'use client';

import ForumFilter from "@/app/(main)/forum/_components/forum-filters";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import ForumEngagement from "@/app/(main)/forum/_components/forum-engagement";
import { SlidersHorizontal } from "lucide-react";
import { useSecure } from "@/context/SecureContext";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import ForumFeed from "@/app/(main)/forum/feed";
import { loadForums, upsertForum } from "@/app/_services/forum/forum-service";
import { toast } from "sonner";

const Forum = () => {
    const {isLoggedIn} = useSecure();
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [postBody, setPostBody] = useState('');

    const [posts, setPosts] = useState<any[]>([]);


    useEffect(() => {
        loadForum();

    }, []);

    function loadForum () {
        startTransition(async () => {
            const response = await loadForums(1, 50);
            // console.log(response.data);
            setPosts(response.data);
        });
    }

    function handlePostBody() {
        console.log("Post body set to:", postBody);

        if (postBody.trim() === '') {
            return;
        }

        const formData = new FormData();
        formData.append('content', postBody);

        startTransition(async () => {
            const response = await upsertForum(formData);
            console.log(response);
            setPostBody('');
            toast.success('Post shared successfully!');

            loadForum();
        });
    }

    return (
        <div className="container ">

            <div className='grid grid-cols-4 h-full'>

                <div className="lg:hidden fixed right-4 z-50">
                    <Button
                        size={'sm'}
                        variant={'outline'}
                        onClick={() => setMobileFilterOpen(true)}
                    >
                        <SlidersHorizontal className="w-4 h-4"/> Filter
                    </Button>
                </div>

                <div className='col-span-4 lg:col-span-3 '>
                    <div className='flex flex-col'>
                        <div className='flex-1'>
                            <div className='px-2 py-4'>
                                <h1 className='text-2xl'>Forum</h1>
                            </div>

                            <div className='border-y-[1px] border-neutral-200 dark:border-neutral-600 mb-4 px-2'>

                                {
                                    isLoggedIn ? (
                                        <>
                                            <div className='flex flex-row gap-4'>
                                                <div className='w-full my-2'>
                                                    <Textarea
                                                        disabled={isPending}
                                                        onChange={(e: any) => {
                                                            setPostBody(e.target.value)
                                                        }}
                                                        value={postBody}
                                                        placeholder='Have a question or idea?'
                                                        className='disabled:opacity-80 peer resize-none w-full ring-0 outline-none text-[20px] '
                                                    >

                                                    </Textarea>
                                                    <hr className='opacity-0 peer-focus:opacity-100'/>

                                                    <div className='mt-4 flex flex-row justify-end'>
                                                        <Button
                                                            variant='primary'
                                                            className='rounded-xl px-4 py-2 mr-2 min-w-28'
                                                            onClick={handlePostBody}
                                                            disabled={isPending || postBody.trim() === ''}
                                                        >
                                                            Post
                                                        </Button>

                                                    </div>

                                                </div>


                                            </div>

                                        </>
                                    ) : (
                                        <>
                                            <div className='py-8'>
                                                <h1 className='text-2xl text-center mb-4 font-bold'>
                                                    Welcome to EzDu Forum
                                                </h1>

                                                <div className='flex flex-row items-center justify-center gap-4'>
                                                    <Link href='/auth/login'>
                                                        <Button variant={'primary'} className='min-w-28'>Login</Button>
                                                    </Link>
                                                    <Link href='/auth/login'>
                                                        <Button className='min-w-28'>Register</Button>
                                                    </Link>

                                                </div>

                                            </div>
                                        </>
                                    )
                                }
                            </div>

                            <div>
                                <ForumFeed posts={posts}/>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='flex flex-col space-y-2 lg:pl-6'>
                    <ForumFilter
                        isMobileOpen={mobileFilterOpen}
                        onClose={() => setMobileFilterOpen(false)}
                        onFilterChange={() => {
                        }}
                    />

                    <ForumEngagement/>
                </div>



            </div>
        </div>
    );
}

export default Forum;