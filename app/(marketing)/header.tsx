"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { logout as logoutUser } from "../_services/auth";
// import { userLoginStatus } from "@/store/user-auth";
import React from "react";
import { NavMenu } from "@/components/layout/nav/nav-menu";
import { useSecure } from "@/context/SecureContext";

export const Header = () => {
    // const { isLoggedIn, logout } = userLoginStatus();
    const { isLoggedIn, logout } = useSecure();

    return (
        <header className="h-20 w-full border-b-2 border-slate-200 px-4">
            <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Link href="/">
                        <h1 className="text-2xl font-extrabold text-sky-400 tracking-wide">
                            e<span className="text-sky-400">z </span>du
                        </h1>
                    </Link>
                </div>

                <div className="z-20">
                    <NavMenu/>
                </div>

                <div>
                    {isLoggedIn ? (
                        <div>
                            <Button
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
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Button
                                size="sm"
                                variant="default"
                                className="ms-2"
                            >
                                <Link href="/auth/login">Login</Link>
                            </Button>
                            <Button
                                size="sm"
                                variant="default"
                                className="ms-2"
                            >
                                <Link href="/auth/register">Register</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
