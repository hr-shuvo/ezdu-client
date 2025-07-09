'use client'

import { useSecure } from "@/context/SecureContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Info, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/app/(main)/(users)/profile/_components/menu-item";

type Props = {
    children: React.ReactNode
}

export default function DashboardLayout({children}: Props) {
    const {user, isLoggedIn} = useSecure();
    const pathname = usePathname();

    if (!isLoggedIn || !user) {
        return (
            <>
                <div className='h-screen flex justify-center '>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <p>Please login to view your profile.</p>
                        <Link href='/auth/login'>
                            <Button>Login</Button>
                        </Link>
                    </div>
                </div>

            </>
        )
    }

    return (
        <div className="">

            <div className="flex items-center justify-start gap-8 rounded-b-2xl shadow-md p-4 sm:p-8 lg:p-16 sm:px-8 lg:px-32">

                <div>
                    <img
                        src={user.avatar || "/avatar/boy/1.svg"}
                        alt="Avatar"
                        className="w-12 h-12 lg:w-32 lg:h-32 rounded-2xl border-4 border-sky-300"
                    />
                </div>

                <div>
                    <div className='flex items-center justify-start gap-4'>
                        <h1 className={'text-4xl'}>{user.name} </h1>
                        <Link
                            href={`/u/${user.username}`}
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                        >
                            <ExternalLink className="w-5 h-5"/>
                        </Link>

                    </div>

                    <h2>EzDu ID: {user.username}</h2>
                </div>

            </div>

            <div className='grid grid-cols-1 lg:grid-cols-9 gap-2w-full'>

                <div className='col-span-3 p-2'>

                    <div className='w-full space-y-2 mt-5'>
                        <div className="flex-1 w-full space-y-2">
                            <MenuItem
                                label="Basic Info"
                                href="/profile"
                                icon={<Info className="w-5 h-5" />}
                                active={pathname === '/profile'}
                            />

                            <MenuItem
                                label="Account"
                                href="/profile/account"
                                icon={<Settings className="w-5 h-5" />}
                                active={pathname === '/profile/account'}
                            />

                            {/*<MenuItem*/}
                            {/*    label="Nofification"*/}
                            {/*    href="/profile/notification"*/}
                            {/*    icon={<Bell className="w-5 h-5" />}*/}
                            {/*    active={pathname === '/profile/notification'}*/}
                            {/*/>*/}
                        </div>

                    </div>


                </div>

                <div className='col-span-6 p-2'>
                    <div className="flex-1 w-full space-y-6">
                        {children}
                    </div>
                </div>

            </div>

        </div>
    );
}