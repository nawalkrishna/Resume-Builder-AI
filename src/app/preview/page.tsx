"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useResume } from "@/lib/context/ResumeContext";
import { generateLaTeX } from "@/lib/templates/latex-template";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getTemplate } from "@/lib/templates/registry";

export default function PreviewPage() {
    const { data, saveResume, resumeName, setResumeName, resumeId } = useResume();
    const router = useRouter();
    const [isExporting, setIsExporting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [tempName, setTempName] = useState(resumeName);
    const [copyStatus, setCopyStatus] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const resumeRef = useRef<HTMLDivElement>(null);

    const TemplateComponent = getTemplate(data.template || "simple");

    const handleDownload = async () => {
        setIsExporting(true);
        try {
            const response = await fetch("/api/export", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Resume_${data.header.name.replace(/\s+/g, "_")}.pdf`;
                document.body.appendChild(a);
                a.click();
                a.remove();

                // Log download to history
                if (resumeId) {
                    await fetch("/api/downloads", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ resume_id: resumeId, format: "pdf" }),
                    });
                }
            } else {
                const errorData = await response.json();
                alert(`PDF generation failed: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Export error:", error);
            alert("Error exporting PDF.");
        } finally {
            setIsExporting(false);
        }
    };




    const handleSave = async () => {
        setIsSaving(true);
        setResumeName(tempName);
        await saveResume(tempName);
        setIsSaving(false);
        setShowSaveModal(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    };


    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopyStatus(type);
        setTimeout(() => setCopyStatus(null), 2000);
    };

    const handleExportJSON = () => {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Resume_${data.header.name.replace(/\s+/g, "_")}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    const handleExportLaTeX = () => {
        const latexString = generateLaTeX(data);
        const blob = new Blob([latexString], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Resume_${data.header.name.replace(/\s+/g, "_")}.tex`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    return (
        <main className="min-h-screen bg-slate-50/50 py-12 px-4 relative overflow-hidden">
            {/* Save Modal */}
            <AnimatePresence>
                {showSaveModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowSaveModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-2xl font-black text-slate-900 mb-2">Save Resume</h2>
                            <p className="text-slate-500 text-sm mb-6">Enter a name for your resume to save it to your dashboard.</p>

                            <Input
                                label="Resume Name"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                placeholder="e.g., Software Engineer Resume"
                            />

                            <div className="flex gap-3 mt-6">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setShowSaveModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1"
                                    onClick={handleSave}
                                    isLoading={isSaving}
                                >
                                    {resumeId ? "Update" : "Save"}
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Save Success Toast */}
            <AnimatePresence>
                {saveSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-semibold"
                    >
                        ✓ Resume saved to dashboard!
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto space-y-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 pb-10"
                >
                    <div className="space-y-3 text-center md:text-left">
                        <div className="inline-block px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">
                            Final Review
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Ready for Launch.</h1>
                        <p className="text-lg text-slate-500 font-medium">Download your resume and land your dream role.</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
                        <Button variant="outline" onClick={() => router.push("/dashboard")} className="bg-white">
                            Dashboard
                        </Button>
                        <Button variant="outline" onClick={() => router.push("/builder")} className="bg-white">
                            Back to Editor
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={() => {
                                setTempName(resumeName || data.header.name || "My Resume");
                                setShowSaveModal(true);
                            }}
                            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                        >
                            💾 Save to Dashboard
                        </Button>
                        <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block" />
                        <Button
                            variant="secondary"
                            onClick={handleExportJSON}
                        >
                            JSON
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={handleExportLaTeX}
                        >
                            LaTeX
                        </Button>
                        <Button
                            onClick={handleDownload}
                            isLoading={isExporting}
                            className="bg-indigo-600 shadow-xl shadow-indigo-200"
                        >
                            {isExporting ? "Generating..." : "Download PDF"}
                        </Button>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Action Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-3 space-y-6"
                    >
                        <div className="glass-card p-8 border-slate-200/60 space-y-6">
                            <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Direct Copy</h3>
                            <div className="space-y-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full justify-start text-xs rounded-xl h-10 border-slate-200"
                                    onClick={() => handleCopy(JSON.stringify(data, null, 2), "json")}
                                >
                                    {copyStatus === "json" ? "✓ Copied" : "Copy Resume JSON"}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full justify-start text-xs rounded-xl h-10 border-slate-200"
                                    onClick={() => handleCopy(generateLaTeX(data), "latex")}
                                >
                                    {copyStatus === "latex" ? "✓ Copied" : "Copy LaTeX Code"}
                                </Button>
                            </div>
                        </div>

                        <div className="bg-indigo-50/50 border border-indigo-100/50 p-8 rounded-3xl space-y-4">
                            <h3 className="font-black text-indigo-600 uppercase tracking-widest text-xs">ATS Optimization</h3>
                            <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                                This template is designed for 100% readability by Workday, Greenhouse, and Lever parsers.
                            </p>
                        </div>
                    </motion.div>

                    {/* Resume Canvas */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-9 flex justify-center"
                    >
                        <div
                            ref={resumeRef}
                            id="resume-container"
                            className="bg-white shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] rounded-sm overflow-hidden"
                        >
                            <TemplateComponent data={data} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
