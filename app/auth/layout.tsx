import { Footer } from "../(marketing)/footer";
import { Header } from "../academy/header";
import Image from "next/image";


type Props = {
    children: React.ReactNode
}


const AuthLayout = ({ children }: Props) => {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Header />

                <div className="flex-1 flex items-center justify-around bg-gradient-to-r from-white via-indigo-100 to-white">
                    <div>
                        <div className="relative w-[280px] h-[280px] lg:w-[380px] lg:h-[380px] mb-8 lg:mb-0">
                            <Image src="/logo/logo_bgw.gif" alt="Ezdu quiz Logo" fill/>
                        </div>
                    </div>
                    <div>{children}</div>
                </div>

            </div>


            <Footer />
        </>
    );
};

export default AuthLayout;