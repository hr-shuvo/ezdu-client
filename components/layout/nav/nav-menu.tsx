import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";
import Link from "next/link"
import React from "react";
import { NavSearchBox } from "./nav-search-box";

export const NavMenu = () => {
    return (
        <>
            <div className="w-full px-4 py-2 flex items-center justify-between gap-6">

                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Link href="/">
                        <h1 className="text-4xl font-extrabold text-sky-700 tracking-wide dark:text-sky-400">
                            e<span className="text-sky-700 dark:text-sky-300">z </span>du
                        </h1>

                    </Link>
                </div>

                <div className="flex-1 min-w-[300px] max-w-md">
                    <NavSearchBox />
                </div>

                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem asChild>
                            <Link href="/academy" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Academy
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem asChild>
                            <Link href="/admission" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Admission
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem asChild>
                            <Link href="/forum" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Discuss
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem asChild>
                            <Link href="/leaderboard" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Ranking
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger>More</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="p-2 md:w-[300px] lg:w-[400px] ">
                                    <ListItem href="/about" title="About"/>
                                    <ListItem href="/blog" title="Blog"/>
                                    <ListItem href="/academy/qb" title="Question Bank"/>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </>
    )
};


const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"






//academy
// const academy = () => {
//     return (
//         <>
//             <NavigationMenuItem>
//                 <NavigationMenuTrigger>Academy</NavigationMenuTrigger>
//                 <NavigationMenuContent>
//                     <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//                         <li className="row-span-3">
//                             <NavigationMenuLink asChild>
//                                 <Link
//                                     className="hover:shadow flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
//                                     href="/academy/quiz"
//                                 >
//                                     <div className="mb-2 text-lg font-medium">
//                                         Mock/Test
//                                     </div>
//                                     <p className="text-sm leading-tight text-muted-foreground">
//                                         Take real-style exams with instant results and performance review.
//                                     </p>
//                                 </Link>
//                             </NavigationMenuLink>
//                         </li>
//                         <ListItem href="/academy" title="Study Practice">
//                             Read from the book, get solutions, and practice similar questions
//                         </ListItem>
//                         <ListItem href="/academy/quiz" title="Quick Test & Quiz">
//                             Short MCQs and quizzes to test your topic understanding.
//                         </ListItem>
//                         <ListItem href="/academy/mt" title="Model Test">
//                             Full-length tests to practice in real exam style
//                         </ListItem>
//                     </ul>
//                 </NavigationMenuContent>
//             </NavigationMenuItem>
//         </>
//     )
// }