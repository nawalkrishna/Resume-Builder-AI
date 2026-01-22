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
        <main className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="text-xl font-black text-slate-900 tracking-tight">
                        Resume Builder
                    </Link>
                    <div className="flex items-center gap-4">
                        {isAdmin && (
                            <Link href="/admin">
                                <Button variant="outline" size="sm" className="border-indigo-500 text-indigo-600 hover:bg-indigo-50">
                                    🛡️ Admin Panel
                                </Button>
                            </Link>
                        )}
                        <span className="text-sm text-slate-500">{user.email}</span>
                        <Button variant="outline" size="sm" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard</h1>
                        <p className="text-slate-500 font-medium">Manage your resumes and track downloads</p>
                    </div>
                    <Link href="/templates">
                        <Button className="shadow-lg shadow-indigo-200">
                            + Create New Resume
                        </Button>
                    </Link>
                </motion.div>

                {/* Resumes Grid */}
                <section className="space-y-4">
                    <h2 className="text-lg font-bold text-slate-900">Your Resumes</h2>

                    {resumes.length === 0 ? (
                        <div className="glass-card p-12 text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">No resumes yet</h3>
                            <p className="text-slate-500 text-sm mb-4">Create your first resume to get started</p>
                            <Link href="/templates">
                                <Button>Create Resume</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {resumes.map((resume, index) => (
                                <motion.div
                                    key={resume.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="glass-card p-6 space-y-4 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-bold text-slate-900">{resume.name}</h3>
                                            <p className="text-xs text-slate-500">
                                                Updated {formatDate(resume.updated_at)}
                                            </p>
                                        </div>
                                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                                            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => handlePreview(resume)}
                                        >
                                            Preview
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => handleEdit(resume)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500 hover:bg-red-50"
                                            onClick={() => handleDelete(resume.id)}
                                            isLoading={deletingId === resume.id}
                                        >
                                            Delete
                                        </Button>
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
