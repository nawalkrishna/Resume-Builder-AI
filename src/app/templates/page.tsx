"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { templateList, sampleResumeData, TemplateInfo } from "@/lib/templates";
import { getTemplate } from "@/lib/templates/registry";

export default function TemplatesPage() {
    const [selectedTemplate, setSelectedTemplate] = useState<string>("simple");
    const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
    const router = useRouter();

    const handleSelectTemplate = () => {
        // Store selected template in localStorage
        localStorage.setItem("selectedTemplate", selectedTemplate);
        
        // Check if user came from import flow
        const importIntent = localStorage.getItem("importIntent") === "true";
        if (importIntent) {
            router.push("/builder?import=true");
        } else {
            router.push("/builder");
        }
    };

    const displayTemplate = hoveredTemplate || selectedTemplate;
    const TemplateComponent = getTemplate(displayTemplate);

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="text-xl font-black text-white tracking-tight">
                        Resume Builder
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-slate-400 hover:text-white text-sm">
                            ← Dashboard
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-black text-white mb-2">Choose Your Template</h1>
                    <p className="text-slate-400">Select a template to get started. You can change it later.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Template Grid */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-white mb-4">Templates ({templateList.length})</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2">
                            {templateList.map((template, index) => {
                                // Get the specific template component for this thumbnail
                                const ThumbnailTemplateComponent = getTemplate(template.id);
                                
                                return (
                                <motion.div
                                    key={template.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${selectedTemplate === template.id
                                            ? "border-indigo-500 ring-2 ring-indigo-500/50"
                                            : "border-slate-700 hover:border-slate-500"
                                        }`}
                                    onClick={() => setSelectedTemplate(template.id)}
                                    onMouseEnter={() => setHoveredTemplate(template.id)}
                                    onMouseLeave={() => setHoveredTemplate(null)}
                                >
                                    {/* Template Thumbnail */}
                                    <div
                                        className="aspect-[3/4] bg-white p-2 overflow-hidden"
                                        style={{ fontSize: "3px" }}
                                    >
                                        <div className="transform scale-[0.15] origin-top-left w-[666%] h-[666%]">
                                            <ThumbnailTemplateComponent data={{ ...sampleResumeData, template: template.id }} />
                                        </div>
                                    </div>

                                    {/* Template Info */}
                                    <div className="p-3 bg-slate-800">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: template.color }}
                                            />
                                            <h3 className="text-sm font-semibold text-white">{template.name}</h3>
                                        </div>
                                        <p className="text-xs text-slate-400 line-clamp-1">{template.description}</p>
                                    </div>

                                    {/* Selected Badge */}
                                    {selectedTemplate === template.id && (
                                        <div className="absolute top-2 right-2 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
                                            ✓ Selected
                                        </div>
                                    )}
                                </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Live Preview */}
                    <div className="sticky top-24">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white">Preview</h2>
                            <span className="text-sm text-slate-400">
                                {templateList.find(t => t.id === displayTemplate)?.name}
                            </span>
                        </div>
                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                            <div className="aspect-[8.5/11] overflow-y-auto">
                                <TemplateComponent data={{ ...sampleResumeData, template: displayTemplate }} />
                            </div>
                        </div>

                        {/* Action Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSelectTemplate}
                            className="w-full mt-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                        >
                            Use {templateList.find(t => t.id === selectedTemplate)?.name} Template →
                        </motion.button>
                    </div>
                </div>
            </div>
        </main>
    );
}
