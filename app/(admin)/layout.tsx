import {Sidebar} from "@/components/layout/admin/sidebar";

type Props = {
    children: React.ReactNode
}

const AdminLayout = ({children}: Props) => {
    return (
        <>
            <Sidebar className='hidden 2xl:flex'/>
            <main className='lg:p-[256] h-full pt-[50px] lg:pt-0'>
                <div className='h-full max-w-[1056px] mx-auto pt-6  '>
                    <div
                        className="max-w-[988px] max-auto w-full flex-1  flex flex-col lg:flex-row items-center justify-center p-4 gap-2 my-10">

                        {children}
                    </div>
                </div>

            </main>
        </>
    )
}

export default AdminLayout;