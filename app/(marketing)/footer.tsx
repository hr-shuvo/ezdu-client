import FooterSection from "@/components/sections/footer/default";
import ADSense from "@/components/Ads/AdSense";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

export const Footer = () => {
    return (
        <footer className='hidden md:block h-20 w-full border-t-2 border-slate-200 dark:border-slate-700 p-2'>
            <div className='max-w-screen-lg mx-auto flex items-center justify-evenly'>
                <FooterSection/>
                <ADSense/>

            </div>


        </footer>
    )
}


// <div className='max-w-screen-lg mx-auto flex items-center justify-evenly h-full'>
//     <Button size='lg' variant='ghost' className='w-full'>
//         {/* <Image
//                         src='/logo/logo_bgw.gif'
//                         alt='Croatian'
//                         height={32}
//                         width={40}
//                         className='mr-4 rounded-md'
//                     /> */}
//         <span className='font-bold font-serif'>English Proficiency</span>
//     </Button>

//     <Button size='lg' variant='ghost' className='w-full'>
//         <span className='font-bold font-serif'>Quantitive Tests</span>
//     </Button>

//     <Button size='lg' variant='ghost' className='w-full'>
//         <span className='font-bold font-serif'>IELTS</span>
//     </Button>

//     <Button size='lg' variant='ghost' className='w-full'>
//         <span className='font-bold font-serif'>GRE</span>
//     </Button>

// </div>

