"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ResumeData } from "@/lib/schemas/resume";
import { getTemplate } from "@/lib/templates/registry";
import Link from "next/link";

const sampleJSON = {
    header: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 8900",
        location: "San Francisco, CA",
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe",
        portfolio: "",
        leetcode: ""
    },
    education: [
        {
            institution: "Stanford University",
            degree: "B.S. in Computer Science",
            duration: "2018 - 2022",
            cgpa: "3.9"
        }
    ],
    experience: [
        {
            organization: "Tech Corp",
            role: "Software Engineer",
            duration: "2022 - Present",
            bullets: [
                "Developed scalable microservices using Node.js and Go",
                "Reduced API response time by 40% through optimization",
                "Led a team of 3 engineers on critical projects"
            ]
        }
    ],
    projects: [
        {
            name: "AI Resume Builder",
            techStack: "Next.js, TypeScript, Supabase",
            link: "https://github.com/johndoe/resume-builder",
            bullets: [
                "Built a modern resume builder with AI-powered suggestions",
                "Implemented real-time preview with 12 template options"
            ]
        }
    ],
    skills: {
        categories: [
            { category: "Languages", skills: "JavaScript, TypeScript, Python, Go" },
            { category: "Frameworks", skills: "React, Next.js, Node.js, Express" },
            { category: "Tools", skills: "Git, Docker, AWS, PostgreSQL" }
        ]
    },
    achievements: [
        "Winner of HackTech 2023",
        "Published research paper on ML optimization"
    ],
    certifications: [
        "AWS Solutions Architect Associate",
        "Google Cloud Professional Developer"
    ],
    template: "modern"
};

export default function ConvertPage() {
    const router = useRouter();
    const [jsonInput, setJsonInput] = useState(JSON.stringify(sampleJSON, null, 2));
    const [resumeData, setResumeData] = useState<ResumeData>(sampleJSON as ResumeData);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState("modern");

    // Parse JSON on input change
    useEffect(() => {
        try {
            const parsed = JSON.parse(jsonInput);
            parsed.template = selectedTemplate;
            setResumeData(parsed as ResumeData);
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    }, [jsonInput, selectedTemplate]);

    const TemplateComponent = getTemplate(resumeData.template || "simple");

    const handleImportToBuilder = () => {
        localStorage.setItem("resumeData", JSON.stringify(resumeData));
        localStorage.setItem("selectedTemplate", selectedTemplate);
        router.push("/builder?edit=true");
    };

    const handleCopyJSON = () => {
        navigator.clipboard.writeText(jsonInput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadJSON = () => {
        const blob = new Blob([jsonInput], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "resume.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleLoadSample = () => {
        setJsonInput(JSON.stringify(sampleJSON, null, 2));
    };

    const templates = [
        { id: "simple", name: "Simple" },
        { id: "modern", name: "Modern" },
        { id: "professional", name: "Professional" },
        { id: "creative", name: "Creative" },
        { id: "minimal", name: "Minimal" },
        { id: "executive", name: "Executive" },
        { id: "elegant", name: "Elegant" },
        { id: "bold", name: "Bold" },
    ];

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-[1800px] mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-xl font-black text-slate-900 tracking-tight">
                            Resume Builder
                        </Link>
                        <span className="text-slate-300">|</span>
                        <span className="text-sm font-semibold text-indigo-600">JSON Converter</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            value={selectedTemplate}
                            onChange={(e) => setSelectedTemplate(e.target.value)}
                            className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {templates.map((t) => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                        <Button variant="outline" size="sm" onClick={handleLoadSample}>
                            Load Sample
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCopyJSON}>
                            {copied ? "✓ Copied" : "Copy JSON"}
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleDownloadJSON}>
                            ⬇ Download JSON
                        </Button>
                        <Button onClick={handleImportToBuilder} className="bg-indigo-600">
                            Import to Builder →
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content - Split View */}
            <div className="flex h-[calc(100vh-60px)]">
                {/* Left Panel - JSON Editor */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-1/2 border-r border-slate-200 flex flex-col"
                >
                    <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            JSON Input
                        </span>
                        {error && (
                            <span className="text-xs text-red-500 font-medium">
                                ⚠ {error}
                            </span>
                        )}
                    </div>
                    <textarea
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        className="flex-1 p-4 font-mono text-sm resize-none focus:outline-none bg-slate-900 text-emerald-400"
                        placeholder="Paste your resume JSON here..."
                        spellCheck={false}
                    />
                </motion.div>

                {/* Right Panel - Live Preview */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-1/2 flex flex-col bg-slate-100"
                >
                    <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span className="text-sm font-bold text-slate-700">Live Preview</span>
                        <span className="text-xs text-slate-500 ml-2">
                            Template: {selectedTemplate}
                        </span>
                    </div>
                    <div className="flex-1 overflow-auto p-6 flex justify-center">
                        {error ? (
                            <div className="text-center text-slate-500 mt-20">
                                <div className="text-6xl mb-4">⚠️</div>
                                <p className="font-semibold">Invalid JSON</p>
                                <p className="text-sm mt-2">Fix the JSON syntax to see preview</p>
                            </div>
                        ) : (
                            <div className="bg-white shadow-2xl rounded-sm transform scale-[0.65] origin-top">
                                <TemplateComponent data={resumeData} />
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
