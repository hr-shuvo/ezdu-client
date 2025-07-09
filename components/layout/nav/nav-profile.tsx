import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";
import Image from "next/image";
import { useSecure } from "@/context/SecureContext";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

export const NavProfile = () => {
    const { user, logout } = useSecure();

    return (
        <div className="flex items-center justify-end">
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="w-12">
                    <Button
                        className="rounded-full focus:outline-none focus:ring-0 hover:bg-muted px-2 py-1"
                    >
                        <Image
                            src="/avatar/boy/1.svg" // Default avatar, can be replaced with user avatar
                            alt="Profile"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-60 space-y-2 p-2 mt-2 shadow-xl border rounded-xl">
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        <Link href={`/u/${user?.username}`}>
                            <div className="w-full flex items-center gap-2 items-center">
                                <FaUser className="text-2xl text-muted-foreground" />
                                <span className="text-2xl text-bold">{user?.name || 'user'}</span>
                            </div>
                        </Link>


                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        <Settings className="h-4 w-4 text-muted-foreground" />
                        <span>সেটিংস</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={logout}
                        className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>লগআউট</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

