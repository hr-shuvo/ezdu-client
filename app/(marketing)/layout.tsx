import React from "react";
import { Header } from "@/app/(marketing)/header";
import { Footer } from "@/app/(marketing)/footer";
import { MobileHeader } from "@/components/layout/mobile-header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "EzDu - Practice for Class 6-8, SSC, HSC, BCS & Govt Job Exams",
        template: "%s - EzDu",
    },
    description: "Gamified practice platform for school students and job seekers in Bangladesh.",
    metadataBase: new URL("https://www.ezduonline.com"),
    alternates: {
        canonical: "/",
    },
};


type Props = {
    children: React.ReactNode
}

const MarketingLayout = ({children}: Props) => {
    return (
        <div className='min-h-screen flex flex-col'>

            <MobileHeader/>
            <Header className='hidden lg:block'/>
            <main className='flex-1 flex flex-col items-center justify-center pt-[50px] lg:pt-0'>
                {children}

            </main>

            <Footer/>

        </div>
    )

};

export default MarketingLayout;