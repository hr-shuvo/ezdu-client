import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Header = () => {
    return (
        <header className="h-20 w-full border-b-2 border-slate-200 px-4">
            <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <h1 className="text-2xl font-extrabold text-green-500 tracking-wide">
                        e<span className="text-green-500">z </span>du
                    </h1>
                </div>

                <div>
                    <Button
                        size="sm"
                        variant="default"
                        className="ms-2"
                    >
                        <Link href='/auth/login'>Login</Link>
                    </Button>
                    <Button
                        size="sm"
                        variant="default"
                        className="ms-2"
                    >
                        
                        <Link href='/auth/login'>Register</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
};
