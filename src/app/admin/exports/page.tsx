"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function ExportsPage() {
    const supabase = createClient();
    const [exporting, setExporting] = useState<string | null>(null);

    const handleExportUsers = async () => {
        setExporting("users");

        // Get all unique users from resumes
        const { data: resumes } = await supabase
            .from("resumes")
            .select("user_id, created_at");

        const userMap = new Map<string, { resumeCount: number; firstSeen: string }>();
        resumes?.forEach((resume: any) => {
            if (userMap.has(resume.user_id)) {
                userMap.get(resume.user_id)!.resumeCount++;
            } else {
                userMap.set(resume.user_id, {
                    resumeCount: 1,
                    firstSeen: resume.created_at,
                });
            }
        });

        // Convert to CSV
        let csv = "User ID,Resume Count,First Seen\n";
        userMap.forEach((data, userId) => {
            csv += `${userId},${data.resumeCount},${data.firstSeen}\n`;
        });

        // Download
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `users_export_${new Date().toISOString().split("T")[0]}.csv`;
        a.click();

        setExporting(null);
    };

    const handleExportResumes = async () => {
        setExporting("resumes");

        const { data: resumes } = await supabase
            .from("resumes")
            .select("id, name, user_id, created_at, updated_at");

        // Convert to CSV
        let csv = "ID,Name,User ID,Created At,Updated At\n";
        resumes?.forEach((r: any) => {
            csv += `${r.id},"${r.name}",${r.user_id},${r.created_at},${r.updated_at}\n`;
        });

        // Download
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `resumes_export_${new Date().toISOString().split("T")[0]}.csv`;
        a.click();

        setExporting(null);
    };

    const handleExportDownloads = async () => {
        setExporting("downloads");

        const { data: downloads } = await supabase
            .from("download_history")
            .select("id, user_id, resume_id, format, downloaded_at");

        // Convert to CSV
        let csv = "ID,User ID,Resume ID,Format,Downloaded At\n";
        downloads?.forEach((d: any) => {
            csv += `${d.id},${d.user_id},${d.resume_id},${d.format},${d.downloaded_at}\n`;
        });

        // Download
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `downloads_export_${new Date().toISOString().split("T")[0]}.csv`;
        a.click();

        setExporting(null);
    };

    const handleExportAIUsage = async () => {
        setExporting("ai");

        const { data: usage } = await supabase
            .from("ai_usage")
            .select("*");

        // Convert to CSV
        let csv = "ID,User ID,Type,Tokens,Cost USD,Created At\n";
        usage?.forEach((u: any) => {
            csv += `${u.id},${u.user_id},${u.type},${u.tokens_used},${u.cost_usd},${u.created_at}\n`;
        });

        // Download
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ai_usage_export_${new Date().toISOString().split("T")[0]}.csv`;
        a.click();

        setExporting(null);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Exports</h1>
                <p className="text-slate-400 mt-1">Download platform data as CSV files</p>
            </div>

            {/* Export Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">👥</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white">Users</h3>
                            <p className="text-slate-400 text-sm mt-1">
                                Export all users with their resume counts
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleExportUsers}
                        disabled={exporting === "users"}
                        className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {exporting === "users" ? "Exporting..." : "Export Users CSV"}
                    </button>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">📄</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white">Resumes</h3>
                            <p className="text-slate-400 text-sm mt-1">
                                Export all resumes with metadata
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleExportResumes}
                        disabled={exporting === "resumes"}
                        className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                        {exporting === "resumes" ? "Exporting..." : "Export Resumes CSV"}
                    </button>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">📥</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white">Downloads</h3>
                            <p className="text-slate-400 text-sm mt-1">
                                Export download history
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleExportDownloads}
                        disabled={exporting === "downloads"}
                        className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                        {exporting === "downloads" ? "Exporting..." : "Export Downloads CSV"}
                    </button>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">🤖</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white">AI Usage</h3>
                            <p className="text-slate-400 text-sm mt-1">
                                Export AI enhancement usage data
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleExportAIUsage}
                        disabled={exporting === "ai"}
                        className="mt-4 w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
                    >
                        {exporting === "ai" ? "Exporting..." : "Export AI Usage CSV"}
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Export Information</h3>
                <ul className="space-y-2 text-slate-400 text-sm">
                    <li>• All exports are in CSV format, compatible with Excel and Google Sheets</li>
                    <li>• Large exports may take a few seconds to generate</li>
                    <li>• Files are named with the current date for easy organization</li>
                </ul>
            </div>
        </div>
    );
}
