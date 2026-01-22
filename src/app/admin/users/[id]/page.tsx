"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface UserData {
    id: string;
    resumes: any[];
    downloads: any[];
    aiUsage: any[];
    profile: any;
}

export default function UserDetailPage() {
    const params = useParams();
    const router = useRouter();
    const userId = params.id as string;
    const supabase = createClient();

    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            // Fetch resumes
            const { data: resumes } = await supabase
                .from("resumes")
                .select("*")
                .eq("user_id", userId)
                .order("created_at", { ascending: false });

            // Fetch downloads
            const { data: downloads } = await supabase
                .from("download_history")
                .select("*, resumes(name)")
                .eq("user_id", userId)
                .order("downloaded_at", { ascending: false })
                .limit(10);

            // Fetch AI usage
            const { data: aiUsage } = await supabase
                .from("ai_usage")
                .select("*")
                .eq("user_id", userId)
                .order("created_at", { ascending: false })
                .limit(10);

            // Fetch profile
            const { data: profile } = await supabase
                .from("user_profiles")
                .select("*")
                .eq("user_id", userId)
                .single();

            setUserData({
                id: userId,
                resumes: resumes || [],
                downloads: downloads || [],
                aiUsage: aiUsage || [],
                profile: profile,
            });
            setLoading(false);
        };

        fetchUserData();
    }, [userId, supabase]);

    const handleBanUser = async () => {
        setActionLoading(true);
        const isBanned = userData?.profile?.is_banned;

        // Upsert profile
        await supabase
            .from("user_profiles")
            .upsert({
                user_id: userId,
                is_banned: !isBanned,
                ban_reason: !isBanned ? "Banned by admin" : null,
            });

        // Refresh data
        const { data: profile } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("user_id", userId)
            .single();

        setUserData((prev) => prev ? { ...prev, profile } : null);
        setActionLoading(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!userData) {
        return <div className="text-white">User not found</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/users" className="text-slate-400 hover:text-white">
                    ← Back to Users
                </Link>
            </div>

            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-white">User Details</h1>
                    <code className="text-slate-400 text-sm mt-1">{userId}</code>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleBanUser}
                        disabled={actionLoading}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${userData.profile?.is_banned
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : "bg-red-600 hover:bg-red-700 text-white"
                            }`}
                    >
                        {actionLoading ? "..." : userData.profile?.is_banned ? "Unban User" : "Ban User"}
                    </button>
                </div>
            </div>

            {/* Status Banner */}
            {userData.profile?.is_banned && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                    <p className="text-red-400 font-medium">⚠️ This user is currently banned</p>
                    {userData.profile.ban_reason && (
                        <p className="text-red-300 text-sm mt-1">Reason: {userData.profile.ban_reason}</p>
                    )}
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <p className="text-slate-400 text-sm">Total Resumes</p>
                    <p className="text-3xl font-bold text-white mt-1">{userData.resumes.length}</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <p className="text-slate-400 text-sm">Total Downloads</p>
                    <p className="text-3xl font-bold text-white mt-1">{userData.downloads.length}</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <p className="text-slate-400 text-sm">AI Enhances</p>
                    <p className="text-3xl font-bold text-white mt-1">{userData.aiUsage.length}</p>
                </div>
            </div>

            {/* Resumes */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Resumes</h2>
                {userData.resumes.length === 0 ? (
                    <p className="text-slate-400">No resumes created</p>
                ) : (
                    <div className="space-y-3">
                        {userData.resumes.map((resume: any) => (
                            <div key={resume.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                                <div>
                                    <p className="text-white font-medium">{resume.name}</p>
                                    <p className="text-slate-400 text-xs">
                                        Created: {new Date(resume.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Recent Downloads */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Recent Downloads</h2>
                {userData.downloads.length === 0 ? (
                    <p className="text-slate-400">No downloads yet</p>
                ) : (
                    <div className="space-y-3">
                        {userData.downloads.map((download: any) => (
                            <div key={download.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                                <div>
                                    <p className="text-white font-medium">{download.resumes?.name || "Deleted Resume"}</p>
                                    <p className="text-slate-400 text-xs">
                                        {new Date(download.downloaded_at).toLocaleString()}
                                    </p>
                                </div>
                                <span className="text-xs bg-indigo-600/20 text-indigo-400 px-2 py-1 rounded uppercase">
                                    {download.format}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
