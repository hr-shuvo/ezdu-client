import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-white via-sky-50 to-white px-4 text-center">
            {/* 🦉 Owl image */}
            <div className="w-[220px] h-[220px] relative mb-6">
                <Image
                    src="https://openmoji.org/data/color/svg/1F989.svg"
                    alt="Owl not found"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Playful heading */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-sky-700 mb-4">
                Page Not Found
            </h1>

            {/* Subtext */}
            <p className="text-gray-700 text-lg max-w-xl mb-8">
                Looks like the page you&apos;re looking for took a break. No worries — let&apos;s get you back on track!
            </p>

            {/* Action button */}
            <Link
                href="/"
                className=" px-6 py-3 "
            >
                <Button variant='primary'>
                    Back to Home
                </Button>
            </Link>

            {/* Optional tip or suggestion */}
            <p className="text-sm text-gray-500 mt-6">
                Or try checking your spelling. Even owls make typos sometimes.
            </p>
        </div>
    );
}
