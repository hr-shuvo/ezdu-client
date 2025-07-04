import { Footer } from "../(marketing)/footer";
import Image from "next/image";
import { Header } from "../(marketing)/header";
import { MobileHeader } from "@/components/layout/mobile-header";


type Props = {
    children: React.ReactNode
}


const AuthLayout = ({ children }: Props) => {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <MobileHeader/>
                <Header className='hidden lg:block' />

                <div className="flex-1 flex items-center justify-around bg-gradient-to-r from-white via-indigo-100 to-white">
                    <div className="hidden lg:block">
                        <div className="relative w-[280px] h-[280px] lg:w-[380px] lg:h-[380px] mb-8 lg:mb-0">
                            <Image src="/logo/logo.png" alt="Ezdu quiz Logo" fill/>
                        </div>
                    </div>
                    <div className="w-full sm:w-auto px-4 lg:px-0">{children}</div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default AuthLayout;