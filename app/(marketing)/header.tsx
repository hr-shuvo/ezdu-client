"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { NavMenu } from "@/components/layout/nav/nav-menu";
import { useSecure } from "@/context/SecureContext";
import { NavProfile } from "@/components/layout/nav/nav-profile";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";


type Props = {
    className: React.ReactNode
};


export const Header = ({className}: Props) => {
    const {isLoggedIn} = useSecure();
    const {theme, setTheme} = useTheme();

    return (
        <div className={cn('h-20 w-full border-b-2 border-slate-200 dark:border-slate-700 px-4', className)}>

            <div
                className="2xl:max-w-screen-2xl xl:max-w-screen-xl lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">

                <div className="z-20">
                    <NavMenu/>

                </div>

                <div className='flex items-center gap-2'>
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

                    {isLoggedIn ? (
                        <div>

                            <NavProfile/>
                        </div>

                    ) : (
                        <div>
                            <Link href="/auth/login" className='sm:py-3'>
                                <Button
                                    size="sm"
                                    variant="default"
                                    className="ms-2 min-w-[48px] px-4 py-2 "
                                >
                                    Login
                                </Button>
                            </Link>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
