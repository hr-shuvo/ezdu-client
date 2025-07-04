import React from "react";
import { Header } from "@/app/(marketing)/header";
import { Footer } from "@/app/(marketing)/footer";

type Props = {
    children: React.ReactNode
}

const MainLayout = ({children}: Props) => {
    return (
        <>
            <Header className='hidden lg:block'/>

            <main className='h-full pt-0 xl:px-[256px] lg:px-[128px] bg-gradient-to-r from-white via-sky-50 to-white'>
                <div className='h-full mx-auto p-6'>
                    {children}
                </div>
            </main>

            <Footer/>

        </>
    )

};

export default MainLayout;