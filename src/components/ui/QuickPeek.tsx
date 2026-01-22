"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useResume } from "@/lib/context/ResumeContext";
import { getTemplate } from "@/lib/templates/registry";
import { Button } from "./Button";

export const QuickPeek: React.FC = () => {
    const { data } = useResume();
    const [isOpen, setIsOpen] = useState(false);
    const TemplateComponent = getTemplate(data.template || "simple");

    return (
        <>
            {/* Floating Toggle Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed bottom-8 right-8 z-[100]"
            >
                <Button
                    size="lg"
                    className="rounded-full shadow-2xl shadow-primary/40 px-6 h-14 flex items-center gap-3 border-2 border-white/20 backdrop-blur-md"
                    onClick={() => setIsOpen(true)}
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="font-bold tracking-tight">Quick Peek</span>
                </Button>
            </motion.div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] bg-neutral-900/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-neutral-100 rounded-3xl w-full max-w-5xl h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-white/20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="p-6 flex items-center justify-between border-b border-slate-200 bg-white rounded-t-3xl">
                                <div className="space-y-1 text-left">
                                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Resume Draft</h2>
                                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Real-time Preview</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-xl h-10 w-10 p-0 text-xl font-bold bg-slate-50 border border-slate-200"
                                >
                                    ×
                                </Button>
                            </div>

                            {/* Modal Content - The Template */}
                            <div className="flex-1 overflow-y-auto p-4 sm:p-12 bg-neutral-200/50">
                                <div className="transform scale-[0.85] origin-top sm:scale-100 shadow-2xl bg-white mb-8 mx-auto">
                                    <TemplateComponent data={data} />
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-neutral-200 flex justify-center glass-card rounded-none rounded-b-3xl">
                                <p className="text-neutral-500 font-bold text-sm tracking-wide">
                                    This is a live preview. Your data is automatically saved.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
