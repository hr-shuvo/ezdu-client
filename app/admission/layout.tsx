import React, { Suspense } from "react";
import { Footer } from "@/app/academy/footer";
import { Header } from "../(marketing)/header";

type Props = {
    children: React.ReactNode
}

const AdmissionLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <Suspense>

                <main className='h-full pt-0 lg:px-32'>
                    <div className='h-full mx-auto p-6 bg-gradient-to-r from-white via-indigo-100 to-white'>
                        {children}
                    </div>
                </main>
            </Suspense>
            <Footer />
        </>
    )
};

export default AdmissionLayout;