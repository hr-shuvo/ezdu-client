import FooterSection from "@/components/sections/footer/default";
import ADSense from "@/components/Ads/AdSense";

export const Footer = () => {
    return (
        <footer className='hidden md:block h-20 w-full border-t-2 border-slate-200 p-2'>
            <div className='max-w-screen-lg mx-auto flex items-center justify-evenly'>
                <FooterSection/>
                <ADSense/>

            </div>


        </footer>
    )
}
