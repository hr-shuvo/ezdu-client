import React from "react";
import { Header } from "@/app/academy/header";

type Props = {
    children: React.ReactNode
}



const AcademyLayout = ({children}:Props) =>{
    return(
        <>
            <Header />
            <main className='h-full pt-[50px] lg:pt-0 px-48'>
                <div className='h-full mx-auto px-6'>
                    {children}
                </div>
            </main>
        </>
    )
};

export default AcademyLayout;