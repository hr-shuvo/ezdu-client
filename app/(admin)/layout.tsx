import { Sidebar } from "@/components/layout/admin/sidebar";

type Props = {
    children: React.ReactNode
}

const AdminLayout = ({ children }: Props) => {
    return (
        <>
            <Sidebar className='hidden lg:flex' />
            <main className='lg:pl-[256px] h-full pt-[50px] lg:pt-0'>
                <div className='h-full max-w-[1056px] mx-auto pt-6  '>
                    {children}
                </div>

            </main>
        </>
    )
}

export default AdminLayout;