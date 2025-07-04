import React from "react";
import { Header } from "@/app/(marketing)/header";
import { Footer } from "@/app/(marketing)/footer";

type Props = {
    children: React.ReactNode
}

const CommonLayout = ({children}: Props) => {
    return (
        <div className='min-h-screen flex flex-col'>

            <Header/>
            <main className='h-full pt-0 lg:px-[256px] bg-gradient-to-r from-white via-sky-50 to-white'>
                <div className='h-full mx-auto p-6'>
                    {children}
                </div>
            </main>

            <Footer/>

        </div>
    )

};

export default CommonLayout;