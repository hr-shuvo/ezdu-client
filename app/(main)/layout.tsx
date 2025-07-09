import { Header } from "@/app/(marketing)/header";
import { Footer } from "@/app/(marketing)/footer";
import { MobileHeader } from "@/components/layout/mobile-header";
import VerifyBanner from "@/components/notification/verify-banner";

type Props = {
    children: React.ReactNode
}

const MainLayout = ({children}: Props) => {
    return (
        <>
            <MobileHeader/>
            <Header className='hidden lg:block'/>

            <main className='h-full xl:px-[120px] lg:px-[98px]  md:px-[68px] pt-[50px] lg:pt-0 bg-gradient-to-r from-white via-sky-50 to-white'>
                <div className='h-full mx-auto p-2 lg:p-6'>
                    <VerifyBanner/>
                    {children}
                </div>
            </main>

            <Footer/>

        </>
    )

};

export default MainLayout;