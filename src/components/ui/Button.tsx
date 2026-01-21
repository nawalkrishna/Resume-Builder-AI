import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
        const variants = {
            primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md",
            secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
            outline: "border-2 border-slate-200 bg-transparent text-slate-700 hover:bg-slate-50",
            ghost: "bg-transparent hover:bg-slate-100 text-slate-600",
            destructive: "bg-rose-500 text-white hover:bg-rose-600 shadow-md",
        };

        const sizes = {
            sm: "h-10 px-4 text-sm font-bold",
            md: "h-12 px-8 text-base font-bold",
            lg: "h-14 px-10 text-lg font-black tracking-tight",
        };

        return (
            <button
                ref={ref}
                disabled={isLoading || props.disabled}
                className={cn(
                    "inline-flex items-center justify-center rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none gap-2",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
