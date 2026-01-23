"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { User } from "@supabase/supabase-js";

interface Resume {
    id: string;
    name: string;
    data: any;
    created_at: string;
    updated_at: string;
}

interface Download {
    id: string;
    format: string;
    downloaded_at: string;
    resumes: { name: string } | null;
}

interface DashboardClientProps {
    user: User;
    resumes: Resume[];
    downloads: Download[];
}

export default function DashboardClient({ user, resumes: initialResumes, downloads }: DashboardClientProps) {
    const [resumes, setResumes] = useState(initialResumes);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    // Check if user is admin
    useEffect(() => {
        const checkAdminStatus = async () => {
            const { data } = await supabase
                .from("admin_users")
                .select("role")
                .eq("user_id", user.id)
                .single();

            setIsAdmin(!!data);
        };
        checkAdminStatus();
    }, [supabase, user.id]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this resume?")) return;

        setDeletingId(id);
        const { error } = await supabase.from("resumes").delete().eq("id", id);

        if (!error) {
            setResumes(resumes.filter(r => r.id !== id));
        }
        setDeletingId(null);
    };

    const handleEdit = (resume: Resume) => {
        // Store resume data in localStorage and navigate to builder
        localStorage.setItem("editResumeId", resume.id);
        localStorage.setItem("resumeData", JSON.stringify(resume.data));
        localStorage.setItem("editResumeName", resume.name);
        router.push("/builder?edit=true");
    };

    const handlePreview = (resume: Resume) => {
        // Store resume data in localStorage and navigate to preview
        localStorage.setItem("editResumeId", resume.id);
        localStorage.setItem("resumeData", JSON.stringify(resume.data));
        localStorage.setItem("editResumeName", resume.name);
        router.push("/preview");
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <main className="min-h-screen bg-slate-50/50">
            {/* Header */}
            <header className="bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">R</div>
                            <span className="text-xl font-bold text-slate-900 tracking-tight">Resume.ai</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        {isAdmin && (
                            <Link href="/admin">
                                <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50 font-bold hidden md:flex">
                                    🛡️ Admin
                                </Button>
                            </Link>
                        )}
                        <div className="h-8 w-px bg-slate-100 hidden md:block" />
                        <span className="text-[13px] font-semibold text-slate-500 hidden sm:block">{user.email}</span>
                        <Button variant="outline" size="sm" onClick={handleLogout} className="h-9 font-bold bg-white">
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                        <p className="text-slate-500 font-medium text-[15px]">Manage your resumes and track downloads</p>
                    </div>
                    <Link href="/templates">
                        <Button size="md" className="h-12 shadow-lg shadow-indigo-200 font-bold px-8">
                            + Create New Resume
                        </Button>
                    </Link>
                </motion.div>

                {/* Resumes Grid */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Your Resumes</h2>
                        <div className="flex-1 h-px bg-slate-100" />
                    </div>

                    {resumes.length === 0 ? (
                        <div className="bg-white border border-dashed border-slate-300 rounded-[2rem] p-20 text-center flex flex-col items-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mb-6 text-slate-400">
                                📄
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No resumes found</h3>
                            <p className="text-slate-500 font-medium mb-8 max-w-xs">
                                You haven't created any resumes yet. Start with a professional template.
                            </p>
                            <Link href="/templates">
                                <Button size="lg" className="h-14 px-10">Start Building Free</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {resumes.map((resume, index) => (
                                <motion.div
                                    key={resume.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 hover:border-indigo-100 transition-all group"
                                >
                                    <div className="flex flex-col h-full space-y-6">
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1">
                                                <h3 className="font-bold text-slate-900 line-clamp-1">{resume.name}</h3>
                                                <p className="text-[13px] font-medium text-slate-400 italic">
                                                    Saved {formatDate(resume.updated_at)}
                                                </p>
                                            </div>
                                            <div className="w-10 h-10 bg-slate-50 group-hover:bg-indigo-50 group-hover:text-indigo-600 rounded-xl flex items-center justify-center text-slate-400 transition-colors">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-slate-50 flex items-center gap-2">
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                className="flex-1 h-9 font-bold"
                                                onClick={() => handlePreview(resume)}
                                            >
                                                Preview
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="flex-1 h-9 font-bold"
                                                onClick={() => handleEdit(resume)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-10 h-9 p-0 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                                                onClick={() => handleDelete(resume.id)}
                                                isLoading={deletingId === resume.id}
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
