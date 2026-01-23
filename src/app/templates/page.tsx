"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { templateList, sampleResumeData } from "@/lib/templates";
import { getTemplate } from "@/lib/templates/registry";
import { useResume } from "@/lib/context/ResumeContext";

export default function TemplatesPage() {
    const { setFullData, resetData } = useResume();
    const [selectedTemplate, setSelectedTemplate] = useState<string>("simple");
    const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
    const [useSampleData, setUseSampleData] = useState(true);
    const router = useRouter();

    const handleSelectTemplate = () => {
        // Store selected template in localStorage
        localStorage.setItem("selectedTemplate", selectedTemplate);

        if (useSampleData) {
            setFullData({ ...sampleResumeData, template: selectedTemplate });
        } else {
            resetData();
            // We still need to set the template after reset
            // But since setFullData is safer, let's just use it with empty data if needed
            // Actually resetData already sets it to 'simple', so we overwrite:
            setFullData({
                header: { name: "", location: "", phone: "", email: "", linkedin: "", github: "", leetcode: "", portfolio: "", customLinks: [] },
                education: [],
                experience: [],
                projects: [],
                skills: { categories: [{ category: "Languages", skills: "" }, { category: "Frameworks / Libraries", skills: "" }, { category: "Tools / Platforms", skills: "" }, { category: "Relevant Concepts", skills: "" }] },
                achievements: [],
                certifications: [],
                template: selectedTemplate
            });
        }

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
        <main className="min-h-screen bg-slate-50/50">
            {/* Header */}
            <header className="bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">R</div>
                            <span className="text-xl font-bold text-slate-900 tracking-tight">Resume.ai</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-[13px] font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-wider">
                            ← Back to Dashboard
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
                >
                    <div className="space-y-1">
                        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Pick your design</h1>
                        <p className="text-slate-500 font-medium text-lg">Every template is optimized by recruiters for readability.</p>
                    </div>
                    <div className="px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-2">
                        <span className="text-[12px] font-bold text-indigo-700 uppercase tracking-widest italic">AATS Optimized</span>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12">
                    {/* Template Grid */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Available Templates ({templateList.length})</h2>
                            <div className="flex-1 h-px bg-slate-100" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
                            {templateList.map((template, index) => {
                                const ThumbnailTemplateComponent = getTemplate(template.id);

                                return (
                                    <motion.div
                                        key={template.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ y: -4 }}
                                        className={`group relative cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 ${selectedTemplate === template.id
                                            ? "border-indigo-600 ring-4 ring-indigo-500/5 bg-white shadow-xl shadow-indigo-100"
                                            : "border-slate-200 bg-white hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-200"
                                            }`}
                                        onClick={() => setSelectedTemplate(template.id)}
                                        onMouseEnter={() => setHoveredTemplate(template.id)}
                                        onMouseLeave={() => setHoveredTemplate(null)}
                                    >
                                        {/* Template Thumbnail Container */}
                                        <div className="p-4 bg-slate-50/50">
                                            <div className="aspect-[3/4.2] bg-white border border-slate-100 rounded-xl overflow-hidden shadow-inner p-1" style={{ fontSize: "2.5px" }}>
                                                <div className="w-[750%] h-[750%] transform scale-[0.1333] origin-top-left relative">
                                                    <ThumbnailTemplateComponent data={{ ...sampleResumeData, template: template.id }} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Template Info */}
                                        <div className="p-4 bg-white border-t border-slate-50">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className={`text-sm font-bold tracking-tight transition-colors ${selectedTemplate === template.id ? 'text-indigo-600' : 'text-slate-900 group-hover:text-indigo-600'}`}>{template.name}</h3>
                                                {selectedTemplate === template.id && (
                                                    <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white scale-90">
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-[12px] font-medium text-slate-400 line-clamp-1 italic group-hover:text-slate-500 transition-colors">{template.description}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Stick Preview Section */}
                    <div className="lg:sticky lg:top-28">
                        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <h2 className="text-lg font-bold text-slate-900 tracking-tight">Full Preview</h2>
                                    <p className="text-[13px] font-bold text-indigo-500 uppercase tracking-widest">
                                        {templateList.find(t => t.id === displayTemplate)?.name} Edition
                                    </p>
                                </div>
                                <div className="text-slate-400">
                                    📄
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-3xl p-4 flex flex-col aspect-[1/1.3] shadow-inner border border-slate-100 overflow-hidden">
                                <div className="flex-1 bg-white shadow-2xl rounded-2xl overflow-y-auto custom-scrollbar border border-slate-100">
                                    <TemplateComponent data={{ ...sampleResumeData, template: displayTemplate }} />
                                </div>
                            </div>

                            {/* Controls & Action */}
                            <div className="space-y-6">
                                <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-lg shadow-sm">💡</div>
                                            <div>
                                                <p className="text-[13px] font-bold text-slate-900 leading-none">Smart Prefill</p>
                                                <p className="text-[11px] font-medium text-slate-400 mt-1 italic">Populate with recruiter-approved data</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setUseSampleData(!useSampleData)}
                                            className={`w-12 h-7 rounded-full transition-all relative p-1 ${useSampleData ? "bg-indigo-600 border-indigo-600" : "bg-slate-300 border-slate-300"}`}
                                        >
                                            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 ${useSampleData ? "translate-x-5" : "translate-x-0"}`} />
                                        </button>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSelectTemplate}
                                    className="w-full h-14 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 group/btn text-lg"
                                >
                                    Select This Design
                                    <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
