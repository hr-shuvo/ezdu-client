'use client';

import ForumFilter from "@/app/(main)/forum/forum-filters";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ForumEngagement from "@/app/(main)/forum/forum-engagement";
import { SlidersHorizontal } from "lucide-react";

const Forum = () => {
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);


    return (
        <div className="container ">

            <div className='grid grid-cols-5 h-full'>

                <ForumFilter
                    isMobileOpen={mobileFilterOpen}
                    onClose={() => setMobileFilterOpen(false)}
                    onFilterChange={()=>{}}
                />

                <div className="lg:hidden fixed right-4 z-50 pt-2">
                    <Button
                        size={'sm'}
                        variant={'outline'}
                        onClick={() => setMobileFilterOpen(true)}
                    >
                        <SlidersHorizontal className="w-4 h-4" /> Filter
                    </Button>
                </div>

                <div className='col-span-5 lg:col-span-3 lg:border-x-[1px] border-neutral-200 dark:border-neutral-800'>
                    <div className='flex flex-col'>
                        <div className='flex-1'>


                            <h1 className='text-2xl font-bold p-4'>Forum Main Content</h1>
                            <p className='p-4'>This is where the forum discussions will be displayed.</p>
                        </div>
                    </div>

                </div>

                <ForumEngagement/>




            </div>
        </div>
    );
}

export default Forum;