'use client';

import React from "react";
import {cn} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSecure } from "@/context/SecureContext";
import { useTheme } from "next-themes";

type Props = {
    className: React.ReactNode
};


export const Sidebar = ({className}: Props) =>{
    const {isLoggedIn} = useSecure();
    const {theme, setTheme} = useTheme();

    return (
        <div className={cn('flex h-full lg:w-[256px] w-[256px] ' +
            'lg:fixed left-0 top-0 px-4 border-r-2 flex-col', className)}>

            <div className='flex justify-between items-center'>
                <Link href='/'>
                    <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
                        <Image src='/logo/logo.svg' height={40} width={40} alt='logo'/>
                        <h1 className='text-2xl font-extrabold text-sky-400 tracking-wide'>
                            ez du
                        </h1>

                    </div>
                </Link>

                <Button variant="outline" size="icon"
                        onClick={() => {
                            setTheme(theme === "dark" ? "light" : "dark");
                        }}
                >
                    <Sun
                        className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"/>
                    <Moon
                        className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"/>
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div>



            <div className="flex flex-col justify-between flex-1 mt-4">
                {/* Top Menu Items */}
                <div className="flex flex-col gap-y-2">
                    <SidebarItem label="Academy" href="/academy" iconSrc="/common/learn.svg" />
                    <SidebarItem label="Admission" href="/admission" iconSrc="/common/admission.svg" />
                    <SidebarItem label="Quests" href="/quests" iconSrc="/common/quests.svg" />
                    <SidebarItem label="Discuss" href="/forum" iconSrc="/common/discuss.svg" />
                    <SidebarItem label="Archive" href="/academy/qb" iconSrc="/common/archive.svg" />
                    <SidebarItem label="Leaderboard" href="/leaderboard" iconSrc="/common/leaderboard.svg" />
                </div>

                {/* Bottom Item */}
                <div className="mt-4 mb-8 flex flex-col gap-x-2 justify-between">
                    {isLoggedIn ? (
                        <SidebarItem label="Profile" href="/profile" iconSrc="/avatar/profile.svg" />
                    ) : (
                        <SidebarItem label="Register" href="/auth/register" iconSrc="/common/shop.svg" />
                    )}
                </div>
            </div>



        </div>
    )
}

