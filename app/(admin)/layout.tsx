'use client';

import {userLoginStatus} from "@/store/user-auth";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/layout/admin/app-sidebar";
import {Separator} from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {useEffect, useTransition} from "react";
import {getCurrentUser} from "@/services/authService";
import Loading from "@/app/auth/login/loading";

type Props = {
    children: React.ReactNode
}

const AdminLayout = ({children}: Props) => {
    const {isLoggedIn, login, logout} = userLoginStatus();
    const [isPending, startTransition] = useTransition();


    useEffect(() => {

        startTransition(async () => {
            const result = await getCurrentUser();
            if (result.success) {
                // console.log('result: ', result);
                login();
            } else {
                logout()
            }
        })

    }, [login, logout]);    

    if(isPending) {
        return <Loading/>
    }


    if(!isLoggedIn){
        <div>
            <h1>You dont have access</h1>
        </div>
    }

    return (
        <SidebarProvider>
            <AppSidebar/>

            <SidebarInset>
                <header
                    className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1"/>
                        <Separator orientation="vertical" className="mr-2 h-4"/>

                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Building Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block"/>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>


                    </div>
                </header>

                <div className="p-4 pt-0">
                    {children}

                </div>


            </SidebarInset>

        </SidebarProvider>
    )

}

export default AdminLayout;