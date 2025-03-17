'use client';

import {Sidebar} from "@/components/layout/admin/sidebar";
import { userLoginStatus } from "@/store/user-auth";
import { redirect } from "next/navigation";

type Props = {
    children: React.ReactNode
}

const AdminLayout = ({children}: Props) => {
    const { isLoggedIn } = userLoginStatus();

    if(!isLoggedIn){
        redirect('/auth/login');
    }


    return (
        <>
            <Sidebar className='hidden 2xl:flex'/>
            <main className='lg:p-[256px] h-full pt-[50px] lg:pt-0'>
                <div className='h-full mx-w-[1056px] mx-auto pt-6  '>
                    <div
                        className="max-auto w-full flex-1  flex flex-col lg:flex-row items-center justify-center p-4 gap-2 my-10">

                        {children}
                    </div>
                </div>

            </main>
        </>
    )
}

export default AdminLayout;