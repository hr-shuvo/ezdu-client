"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { NavMenu } from "@/components/layout/nav/nav-menu";
import { useSecure } from "@/context/SecureContext";
import { NavProfile } from "@/components/layout/nav/nav-profile";
import { cn } from "@/lib/utils";


type Props = {
    className: React.ReactNode
};


export const Header = ({className}: Props) => {
    const {isLoggedIn} = useSecure();

    return (
        <div className={cn('h-20 w-full border-b-2 border-slate-200 px-4', className)}>
            <div
                className="2xl:max-w-screen-2xl xl:max-w-screen-xl lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">

                {/* <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Link href="/">
                        <h1 className="text-2xl font-extrabold text-sky-400 tracking-wide">
                            e<span className="text-sky-400">z </span>du
                        </h1>
                    </Link>
                </div> */}

                <div className="z-20">
                    <NavMenu/>
                </div>

                <div>
                    {isLoggedIn ? (
                        <div>
                            {/* <Button
                                size="sm"
                                variant="dangerOutline"
                                className="ms-2"
                                onClick={async () => {
                                    const response = await logoutUser();
                                    if (response.success) {
                                        logout();
                                    }
                                }}
                            >
                                Logout
                            </Button> */}
                            <NavProfile/>
                        </div>

                    ) : (
                        <div>
                            <Link href="/auth/login">
                                <Button
                                    size="sm"
                                    variant="default"
                                    className="ms-2 px-4 py-2 "
                                >
                                    Login
                                </Button>
                            </Link>


                            {/* <Button
                                size="sm"
                                variant="default"
                                className="ms-2"
                            >
                                <Link href="/auth/register">Register</Link>
                            </Button> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
