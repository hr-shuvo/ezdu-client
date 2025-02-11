"use client";

import { Button } from "@/components/ui/button";
import { userLoginStatus } from "@/store/user-auth";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import { getCurrentUser } from "@/services/authService";

export default function Home() {
    const { isLoggedIn, login, logout } = userLoginStatus();

    useEffect(() => {
        const fetchCurrentUser = async () => {

            const result = await getCurrentUser();
                if (result.success) {
                    // console.log(result);
                    login();
                } else {
                    logout()
                }


            // try {
            //     const result = await getCurrentUser();
            //     if (result.success) {
            //         // console.log(result);
            //         login();
            //     } else {
            //         throw new Error(result.error);
            //     }
            // } catch (err: any) {
            //     console.error(err?.message);
            //     logout();
            // }
        };

        fetchCurrentUser();
    }, [login, logout]);

    return (
        <div className="max-w-[988px] max-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
            <div className="relative w-[380px] h-[380px] lg:w[424px] lg:h-[424px mb-8 lg:mb-0">
                <Image src="/logo/logo_bgw.gif" alt="hero" fill />
            </div>

            <div className="flex flex-col items-center gap-y-8">
                <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 text-center">
                    Learn, practice, and master with <strong>Ez Du</strong>.
                </h1>

                {isLoggedIn ? (
                    <div>
                        <Button
                            size="lg"
                            variant="primary"
                            className="w-full"
                            asChild
                        >
                            <Link href="/learn">Continue Learning</Link>
                        </Button>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}

// const response = await httpClient.get("/users/current-user");
// if (response.status === 200) {
//     // console.log(response.data);
// }
