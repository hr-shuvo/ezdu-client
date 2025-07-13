'use client';

import ForumFilter from "@/app/(main)/forum/forum-filters";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ForumEngagement from "@/app/(main)/forum/forum-engagement";
import { SlidersHorizontal } from "lucide-react";
import { useSecure } from "@/context/SecureContext";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import ForumFeed from "@/app/(main)/forum/feed";

const Forum= () => {
    const {isLoggedIn} = useSecure();
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [postBody, setPostBody] = useState('');

    const [posts, setPosts] = useState<any[]>([]);


    useEffect(() => {
        // Fetch posts from the server or any other source
        // This is just a placeholder, replace with actual data fetching logic
        const fetchedPosts = [
            { id: 1, content: "This is the first post", user: { _id: 'user1'}},
            { id: 2, content: "This is the second post", user: { _id: 'user2'} },
            // Add more posts as needed
        ];
        setPosts(fetchedPosts);
    },[]);


    function handleChangeBody(value: any) {
        console.log("Change body set to:", value);
        setPostBody(value);
    }

    function handlePostBody() {
        console.log("Post body set to:", postBody);
    }

    return (
        <div className="container ">

            <div className='grid grid-cols-5 h-full'>

                <ForumFilter
                    isMobileOpen={mobileFilterOpen}
                    onClose={() => setMobileFilterOpen(false)}
                    onFilterChange={() => {
                    }}
                />

                <div className="lg:hidden fixed right-4 z-50">
                    <Button
                        size={'sm'}
                        variant={'outline'}
                        onClick={() => setMobileFilterOpen(true)}
                    >
                        <SlidersHorizontal className="w-4 h-4"/> Filter
                    </Button>
                </div>

                <div className='col-span-5 lg:col-span-3 lg:border-x-[1px] border-neutral-200 dark:border-neutral-600'>
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
                                                        disabled={isLoading}
                                                        onChange={(e: any) => {
                                                            handleChangeBody(e.target.value)
                                                        }}
                                                        value={postBody}
                                                        placeholder='Have a question or idea? Share it with the community!'
                                                        className='disabled:opacity-80 peer resize-none w-full ring-0 outline-none text-[20px] '
                                                    >

                                                    </Textarea>
                                                    <hr className='opacity-0 peer-focus:opacity-100'/>

                                                    <div className='mt-4 flex flex-row justify-end'>
                                                        <Button
                                                            variant='primary'
                                                            className='rounded-xl px-4 py-2 mr-2 min-w-28'
                                                            onClick={handlePostBody}>
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

                <ForumEngagement/>


            </div>
        </div>
    );
}

export default Forum;