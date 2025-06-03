import React from "react";
import { Header } from "@/app/academy/header";
import { Footer } from "@/app/academy/footer";

type Props = {
    children: React.ReactNode
}

const AcademyLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <main className='h-full pt-[50px] lg:pt-0 lg:px-32'>
                <div className='h-full mx-auto px-6'>
                    {children}
                </div>
            </main>
            <Footer />
        </>
    )
};

export default AcademyLayout;