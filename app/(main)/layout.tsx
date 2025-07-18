import { MobileHeader } from "@/components/layout/mobile-header";
import { Sidebar } from "@/components/layout/sidebar";
import React from "react";

type Props = {
    children: React.ReactNode
}

const MainLayout = ({children}: Props) => {
    return (
        // <>
        //     <MobileHeader/>
        //     <Header className='hidden lg:block'/>
        //
        //     <main className='h-full xl:px-[120px] lg:px-[98px] md:px-[68px] pt-[50px] lg:pt-0 bg-gradient-to-r from-white via-sky-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900'>
        //         <div className='h-full mx-auto p-2 lg:p-6 dark:text-white'>
        //
        //         <VerifyBanner/>
        //             {children}
        //         </div>
        //     </main>
        //
        //     <Footer/>
        // </>

        <>
            <MobileHeader/>
            <Sidebar className='hidden lg:flex'/>
            <main className='lg:pl-[256px] h-full p-2 pt-4 lg:pt-0'>
                <div className='h-full max-w-[1256px] mx-auto pt-6  my-5 lg:my-0'>
                    {children}
                </div>

            </main>
        </>
    )

};

export default MainLayout;