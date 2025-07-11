import React from "react";
import { Header } from "@/app/(marketing)/header";
import { Footer } from "@/app/(marketing)/footer";
import { MobileHeader } from "@/components/layout/mobile-header";

type Props = {
    children: React.ReactNode
}

const MainLayout = ({children}: Props) => {
    return (
        <>
            <MobileHeader/>
            <Header className='hidden md:block'/>

            <main className='h-full xl:px-[120px] lg:px-[98px]  md:px-[68px] pt-[50px] lg:pt-0 bg-gradient-to-r from-white via-sky-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
                <div className='h-full mx-auto p-6'>
                    {children}
                </div>
            </main>

            <Footer/>

        </>
    )

};

export default MainLayout;