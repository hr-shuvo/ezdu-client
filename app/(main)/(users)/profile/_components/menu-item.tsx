import Link from 'next/link';
import { ReactNode } from "react";

interface MenuItemProps {
    label: string;
    href: string;
    icon: ReactNode;
    active?: boolean;
}

export function MenuItem({ label, href, icon, active = false }: MenuItemProps) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-4 rounded-md cursor-pointer transition-colors
        ${
                active
                    ? 'bg-sky-100 text-sky-700 dark:bg-sky-800 dark:text-white font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'

            }
      `}
        >
            <span className="w-5 h-5 flex-shrink-0">{icon}</span>
            <span>{label}</span>
        </Link>
    );
}
