"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CourseModule } from "./course-module";
import { CoolMode } from "@/components/magicui/cool-mode";
import { SchoolBanner } from "@/app/(marketing)/banner/school-banner";
import { LeaderboardBanner } from "./banner/leaderboard-banner";
import { FeatureBanner } from "./banner/feature-banner";
import { useSecure } from "@/context/SecureContext";

export default function Home() {
    const { isLoggedIn } = useSecure();

    return (

        <div className="w-full flex flex-col items-center">

            {/* Hero Section */}
            <div className="w-full max-w-[988px] flex flex-col lg:flex-row items-center justify-center p-4 gap-8">
                <div className="relative w-[280px] h-[280px] lg:w-[380px] lg:h-[380px] mb-8 lg:mb-0">
                    <Image src="/logo/logo_bgw.gif" alt="Ezdu Logo" fill />
                </div>

                <div className="flex flex-col items-center text-center gap-y-6">
                    <h1 className="text-3xl font-bold text-neutral-700">
                        Learn, Practice, and Master with <strong>EzDu</strong>.
                    </h1>
                    <p className="text-neutral-500 max-w-md">
                        Small steps every day lead to big results
                    </p>

                    {isLoggedIn ? (
                        <CoolMode>
                            <Button size="lg" variant="primary" className="w-full" asChild>
                                <Link href="/academy">Continue Learning</Link>
                            </Button>
                        </CoolMode>
                    ) : (
                        <CoolMode>
                            <Button size="lg" variant="outline" className="w-full" asChild>
                                <Link href="/auth/login">Get Started</Link>
                            </Button>
                        </CoolMode>
                    )}
                </div>
            </div>

            {/* Feature Highlights */}
            <div className="flex justify-center w-full max-w-[988px] mb-8">

                <FeatureBanner />
            </div>

            {/* School Banner */}
            <div className="flex justify-center w-full max-w-[1228px] mb-8">
                <SchoolBanner />
            </div>

            {/* Course Modules */}
            <div className="w-full max-w-[1228px] flex flex-col items-center justify-center p-4">
                <CourseModule />
            </div>

            <div className="flex justify-center w-full max-w-[988px] mb-8">
                <LeaderboardBanner isLoggedIn={isLoggedIn} />
            </div>



        </div>



    );
}

