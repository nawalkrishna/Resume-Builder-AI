import { createClient } from "@/lib/supabase/server";
import { StatsCard } from "@/components/admin/StatsCard";

async function getStats() {
    const supabase = await createClient();

    // Get total users
    const { count: totalUsers } = await supabase
        .from("resumes")
        .select("user_id", { count: "exact", head: true });

    // Get unique users from resumes table
    const { data: uniqueUsers } = await supabase
        .from("resumes")
        .select("user_id");
    const uniqueUserCount = new Set(uniqueUsers?.map(u => u.user_id)).size;

    // Get total resumes
    const { count: totalResumes } = await supabase
        .from("resumes")
        .select("*", { count: "exact", head: true });

    // Get total downloads
    const { count: totalDownloads } = await supabase
        .from("download_history")
        .select("*", { count: "exact", head: true });

    // Get AI usage count
    const { count: totalAiUses } = await supabase
        .from("ai_usage")
        .select("*", { count: "exact", head: true });

    // Get recent activity
    const { data: recentResumes } = await supabase
        .from("resumes")
        .select("id, name, created_at, user_id")
        .order("created_at", { ascending: false })
        .limit(5);

    const { data: recentDownloads } = await supabase
        .from("download_history")
        .select("*, resumes(name)")
        .order("downloaded_at", { ascending: false })
        .limit(5);

    return {
        totalUsers: uniqueUserCount || 0,
        totalResumes: totalResumes || 0,
        totalDownloads: totalDownloads || 0,
        totalAiUses: totalAiUses || 0,
        recentResumes: recentResumes || [],
        recentDownloads: recentDownloads || [],
    };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-400 mt-1">Overview of your Resume Builder platform</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon="👥"
                    color="blue"
                />
                <StatsCard
                    title="Total Resumes"
                    value={stats.totalResumes}
                    icon="📄"
                    color="green"
                />
                <StatsCard
                    title="Total Downloads"
                    value={stats.totalDownloads}
                    icon="📥"
                    color="purple"
                />
                <StatsCard
                    title="AI Enhances"
                    value={stats.totalAiUses}
                    icon="✨"
                    color="orange"
                />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Resumes */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Recent Resumes</h2>
                    {stats.recentResumes.length === 0 ? (
                        <p className="text-slate-400 text-sm">No resumes created yet</p>
                    ) : (
                        <div className="space-y-3">
                            {stats.recentResumes.map((resume: any) => (
                                <div key={resume.id} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                                    <div>
                                        <p className="text-white font-medium">{resume.name}</p>
                                        <p className="text-slate-400 text-xs">
                                            {new Date(resume.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">
                                        {resume.user_id?.slice(0, 8)}...
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Downloads */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Recent Downloads</h2>
                    {stats.recentDownloads.length === 0 ? (
                        <p className="text-slate-400 text-sm">No downloads yet</p>
                    ) : (
                        <div className="space-y-3">
                            {stats.recentDownloads.map((download: any) => (
                                <div key={download.id} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                                    <div>
                                        <p className="text-white font-medium">{download.resumes?.name || "Deleted Resume"}</p>
                                        <p className="text-slate-400 text-xs">
                                            {new Date(download.downloaded_at).toLocaleDateString()}
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
        </div>
    );
}
