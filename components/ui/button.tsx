import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                // default:
                //     "bg-white text-black border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 text-slat",

                default: "bg-white text-black border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 text-slate-900 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700",

                // destructive:
                //     "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                // destructiveOutline:
                //     "bg-white text-destructive hover:bg-destructive/90 hover:text-white border-destructive/20 border-2 border-b-4",

                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-red-600 dark:text-white dark:hover:bg-red-700",

                destructiveOutline:
                    "bg-white text-destructive hover:bg-destructive/90 hover:text-white border-destructive/20 border-2 border-b-4 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white dark:border-red-600",



                // outline:
                //     "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                outline:
                    "border border-input bg-background text-foreground hover:bg-[hsl(215,25%,22%)] hover:text-white",



                ghost: "bg-transparent text-slate-500 border-transparent",
                link: "text-primary underline-offset-4 hover:underline",

                // primary:
                //     "bg-sky-400 text-primary-foreground hover:bg-sky-400/90 border-sky-500 border-b-4 active:border-b-0",
                // primaryOutline: "bg-white text-sky-500 hover:bg-slate-100",

                primary: "bg-sky-400 text-white hover:bg-sky-400/90 border-sky-500 border-b-4 active:border-b-0 dark:bg-sky-600 dark:text-white dark:hover:bg-sky-600/90 dark:border-sky-700",
                primaryOutline: "bg-white text-sky-500 hover:bg-slate-100 border border-sky-200 dark:bg-zinc-900 dark:text-sky-400 dark:hover:bg-zinc-800 dark:border-sky-700",


                // secondary:
                //     "bg-green-500 text-primary-foreground hover:bg-green-500/90 border-green-600 border-b-4 active:border-b-0",
                // secondaryOutline: "bg-white text-green-500 hover:bg-slate-100",
                secondary:
                    "bg-green-500 text-white hover:bg-green-500/90 border-green-600 border-b-4 active:border-b-0 dark:bg-green-600 dark:text-white dark:hover:bg-green-600/90 dark:border-green-700",
                secondaryOutline: "bg-white text-green-500 hover:bg-slate-100 border border-green-200 dark:bg-zinc-900 dark:text-green-400 dark:hover:bg-zinc-800 dark:border-green-700",





                danger:
                    "bg-rose-500 text-primary-foreground hover:bg-rose-500/90 border-rose-600 border-b-4 active:border-b-0",
                dangerOutline: "bg-white text-rose-500 hover:bg-slate-100",
                // super:
                //     "bg-indigo-500 text-primary-foreground hover:bg-indigo-500/90 border-indigo-600 border-b-4 active:border-b-0",
                // superOutline: "bg-white text-indigo-500 hover:bg-slate-100",

                super:
                    "bg-indigo-500 text-white hover:bg-indigo-500/90 border-indigo-600 border-b-4 active:border-b-0 dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-600/90 dark:border-indigo-700",
                superOutline: "bg-white text-indigo-500 hover:bg-slate-100 border border-indigo-200 dark:bg-zinc-900 dark:text-indigo-400 dark:hover:bg-zinc-800 dark:border-indigo-700",

                // sidebar:
                //     "bg-transparent text-slate-500 border-2 border-transparent hover:bg-slate-100 transition-none",
                // sidebarOutline:
                //     "bg-sky-500/15 text-sky-500 border-sky-300 border-2 hover:bg-sky-500/20 transition-none",

                sidebar:
                    "bg-transparent text-slate-500 border-2 border-transparent hover:bg-slate-100 transition-none dark:text-slate-400 dark:hover:bg-slate-700",
                sidebarOutline: "bg-sky-500/15 text-sky-500 border-sky-300 border-2 hover:bg-sky-500/20 transition-none dark:bg-sky-600/15 dark:text-sky-400 dark:border-sky-500 dark:hover:bg-sky-600/20",

                locked:
                    "bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0",
            },
            size: {
                default: "h-11 px-4 py-2",
                sm: "h-9 px-3",
                lg: "h-12 px-8",
                xsm: "h-6 px-2",
                icon: "h-10 w-10",
                rounded: "rounded-full",
            },
        },
        defaultVariants: {
          variant: "default",
          size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, variant, size, asChild = false, ...props}, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({variant, size, className}))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
