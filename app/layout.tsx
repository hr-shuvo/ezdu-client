import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ExitModal } from "@/components/modals/exit-modal";

const font = Nunito({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "eZducation",
    description: "Learn, parctice and master with Ez Du",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${font.className} `}>
                <Toaster />
                <ExitModal />
                {children}
            </body>
        </html>
    );
}
