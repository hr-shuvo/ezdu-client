import Link from "next/link";
import React from "react";
import { NavMenu } from "@/components/layout/nav/nav-menu";

export const Header = () => {

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

                <div>
                    <NavMenu />
                </div>
                <div></div>

            </div>

        </header>


    )
}
