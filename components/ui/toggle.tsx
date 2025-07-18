"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2",
    {
        variants: {
            variant: {
                // default: "bg-transparent",
                default: "bg-transparent",

                outline:
                    "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground" +
                    " dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200",

                primary: "text-black border-slate-400 border-2 border-b-4 hover:border-slate-900 hover:bg-slate-500 hover:text-white text-slat data-[state=on]:bg-slate-400 data-[state=on]:text-white",


                bw: "bg-white hover:bg-muted data-[state=on]:bg-gray-700 data-[state=on]:text-white"
            },
            size: {
                default: "h-10 px-3 min-w-10",
                sm: "h-9 px-2.5 min-w-9",
                lg: "h-11 px-5 min-w-11",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const Toggle = React.forwardRef<
    React.ElementRef<typeof TogglePrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({className, variant, size, ...props}, ref) => (
    <TogglePrimitive.Root
        ref={ref}
        className={cn(toggleVariants({variant, size, className}))}
        {...props}
    />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
