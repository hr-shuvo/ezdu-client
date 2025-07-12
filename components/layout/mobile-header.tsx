import { MobileSidebar } from "./mobile-sidebar"


export const MobileHeader = () => {
    return (
        <nav className='lg:hidden px-6 h-[50px] flex items-center border-b fixed top-0 w-full z-50 bg-sky-100 dark:bg-sky-900 border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-100'>
            <MobileSidebar/>
        </nav>
    )
}
