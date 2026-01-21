"use client";

import React from "react";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface FormWrapperProps {
    currentStep: number;
    totalSteps: number;
    title: string;
    description: string;
    children: React.ReactNode;
    steps: string[];
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
    currentStep,
    totalSteps,
    title,
    description,
    children,
    steps,
}) => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            {/* Header with Dashboard link */}
            <div className="flex justify-between items-center mb-8">
                <Link href="/dashboard" className="text-sm font-medium text-slate-500 hover:text-slate-700 flex items-center gap-1">
                    ← Dashboard
                </Link>
            </div>
            <div className="space-y-12">

                {/* Step Indicator */}
                <div className="relative px-2">
                    <div className="absolute top-[1.25rem] left-0 w-full h-[3px] bg-neutral-200/60 -translate-y-1/2" />
                    <div className="relative flex justify-between items-center">
                        {steps.map((step, index) => {
                            const isActive = index === currentStep;
                            const isCompleted = index < currentStep;

                            return (
                                <div key={step} className="flex flex-col items-center gap-3 relative z-10">
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            scale: isActive ? 1.15 : 1,
                                            backgroundColor: isActive || isCompleted ? "var(--color-primary)" : "#fff",
                                            borderColor: isActive || isCompleted ? "var(--color-primary)" : "var(--color-neutral-200)",
                                            color: isActive || isCompleted ? "#fff" : "var(--color-neutral-400)",
                                        }}
                                        className={clsx(
                                            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300",
                                            isActive && "shadow-xl shadow-primary/40 ring-4 ring-primary/10"
                                        )}
                                    >
                                        {isCompleted ? (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            index + 1
                                        )}
                                    </motion.div>
                                    <motion.span
                                        animate={{
                                            color: isActive ? "var(--color-neutral-900)" : "var(--color-neutral-400)",
                                            fontWeight: isActive ? 700 : 500,
                                        }}
                                        className="text-[10px] sm:text-xs uppercase tracking-widest text-center whitespace-nowrap"
                                    >
                                        {step}
                                    </motion.span>
                                </div>
                            );
                        })}
                    </div>
                    {/* Progress Bar Fill */}
                    <motion.div
                        className="absolute top-[1.25rem] left-0 h-[3px] bg-primary -translate-y-1/2 z-0"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>

                {/* Content Header */}
                <div className="space-y-3 text-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                                {title}
                            </h1>
                            <p className="text-base sm:text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                                {description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Form Content */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: "backOut" }}
                            className="glass-card p-8 sm:p-10"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
