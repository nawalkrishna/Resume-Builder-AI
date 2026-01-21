import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="text-sm font-bold text-neutral-800 uppercase tracking-wider ml-1">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={cn(
                        "flex h-12 w-full rounded-2xl border-2 border-neutral-200/60 bg-white/50 px-4 py-2 text-sm font-semibold transition-all duration-300 backdrop-blur-sm",
                        "hover:border-neutral-300 hover:bg-white",
                        "focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none",
                        "disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-neutral-400 placeholder:font-medium",
                        error && "border-destructive/50 focus:border-destructive focus:ring-destructive/10 bg-destructive/5",
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="text-xs font-bold text-destructive pl-1 animate-in fade-in slide-in-from-left-2">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
