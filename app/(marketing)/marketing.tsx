"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useSecure } from "@/context/SecureContext";
import dynamic from "next/dynamic";

// const FeatureBanner = dynamic(() => import("@/app/(marketing)/banner/feature-banner").then(mod => mod.FeatureBanner));
const SchoolBanner = dynamic(() => import("./banner/school-banner").then(mod => mod.SchoolBanner), {ssr: false});
const LeaderboardBanner = dynamic(() => import("./banner/leaderboard-banner").then(mod => mod.LeaderboardBanner), {ssr: false});
const HowItWorksBanner = dynamic(() => import("./banner/how-it-works-banner").then(mod => mod.HowItWorksBanner), {ssr: false});
const CourseModule = dynamic(() => import("./banner/course-module").then(mod => mod.CourseModule), {ssr: false});


export default function MarketingPage() {
    const {isLoggedIn} = useSecure();

    return (

        <div className="w-full flex flex-col items-center">

            {/* Hero Section */}
            <div className="w-full max-w-[988px] flex flex-col lg:flex-row items-center justify-center p-4 gap-8">
                <div className="relative w-[280px] h-[280px] lg:w-[380px] lg:h-[380px] mb-8 lg:mb-0">
                    <Image
                        src="/logo/logo.svg"
                        alt="Ezdu Logo"
                        fill
                        priority
                        className="object-contain"
                    />
                </div>

                <div className="flex flex-col items-center text-center gap-y-6">
                    <h1 className="text-3xl font-bold text-neutral-700 dark:text-neutral-100">
                        Learn, Practice, and Master with <strong>EzDu</strong>.
                    </h1>
                    <p className="text-neutral-500 dark:text-neutral-400 max-w-md">
                        Small steps every day lead to big results
                    </p>

                    <Button
                        size="lg"
                        className="min-w-[220px]"
                        variant={isLoggedIn ? "primary" : "outline"}
                        asChild
                    >
                        <Link href={isLoggedIn ? "/academy" : "/auth/register"}>
                            {isLoggedIn ? "Continue Learning" : "Create an account"}
                        </Link>
                    </Button>
                </div>


            </div>

            {/* Feature Highlights */}
            {/* <div className="flex justify-center w-full max-w-[988px] mb-8">
                <FeatureBanner />
            </div> */}

            {/* School Banner */}
            <div className="flex justify-center w-full max-w-[1228px] mb-8">
                <SchoolBanner/>
            </div>

            {/* Course Modules */}
            <div className="w-full max-w-[1228px] flex flex-col items-center justify-center p-4">
                <CourseModule/>
            </div>

            <div className="flex justify-center w-full max-w-[988px] mb-8">
                <LeaderboardBanner isLoggedIn={isLoggedIn}/>
            </div>

            <div className="flex justify-center w-full  mb-8">
                <HowItWorksBanner/>
            </div>


        </div>


    );
}

