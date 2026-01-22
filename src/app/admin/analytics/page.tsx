import { createClient } from "@/lib/supabase/server";

async function getAnalytics() {
    const supabase = await createClient();

    // Get resumes by day (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: resumes } = await supabase
        .from("resumes")
        .select("created_at")
        .gte("created_at", thirtyDaysAgo.toISOString());

    // Group by date
    const resumesByDate: Record<string, number> = {};
    resumes?.forEach((r: any) => {
        const date = new Date(r.created_at).toLocaleDateString();
        resumesByDate[date] = (resumesByDate[date] || 0) + 1;
    });

    // Get downloads by format
    const { data: downloads } = await supabase
        .from("download_history")
        .select("format");

    const downloadsByFormat: Record<string, number> = {};
    downloads?.forEach((d: any) => {
        downloadsByFormat[d.format] = (downloadsByFormat[d.format] || 0) + 1;
    });

    // Get top users by resume count
    const { data: allResumes } = await supabase
        .from("resumes")
        .select("user_id");

    const userResumeCounts: Record<string, number> = {};
    allResumes?.forEach((r: any) => {
        userResumeCounts[r.user_id] = (userResumeCounts[r.user_id] || 0) + 1;
    });

    const topUsers = Object.entries(userResumeCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([userId, count]) => ({ userId, count }));

    return {
        resumesByDate: Object.entries(resumesByDate).map(([date, count]) => ({ date, count })),
        downloadsByFormat: Object.entries(downloadsByFormat).map(([format, count]) => ({ format, count })),
        topUsers,
    };
}

export default async function AnalyticsPage() {
    const analytics = await getAnalytics();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Analytics</h1>
                <p className="text-slate-400 mt-1">Platform usage insights</p>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Resumes Over Time */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Resumes Created (Last 30 Days)</h2>
                    {analytics.resumesByDate.length === 0 ? (
                        <p className="text-slate-400">No data yet</p>
                    ) : (
                        <div className="space-y-2">
                            {analytics.resumesByDate.slice(-10).map((item) => (
                                <div key={item.date} className="flex items-center gap-4">
                                    <span className="text-slate-400 text-sm w-24">{item.date}</span>
                                    <div className="flex-1 bg-slate-700 rounded-full h-4">
                                        <div
                                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full"
                                            style={{ width: `${Math.min(item.count * 20, 100)}%` }}
                                        />
                                    </div>
                                    <span className="text-white font-medium w-8">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Downloads by Format */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Downloads by Format</h2>
                    {analytics.downloadsByFormat.length === 0 ? (
                        <p className="text-slate-400">No downloads yet</p>
                    ) : (
                        <div className="space-y-4">
                            {analytics.downloadsByFormat.map((item) => (
                                <div key={item.format} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 rounded ${item.format === "pdf" ? "bg-red-500" : "bg-green-500"}`} />
                                        <span className="text-white font-medium uppercase">{item.format}</span>
                                    </div>
                                    <span className="text-2xl font-bold text-white">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Top Users */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Top Users by Resume Count</h2>
                {analytics.topUsers.length === 0 ? (
                    <p className="text-slate-400">No users yet</p>
                ) : (
                    <div className="space-y-3">
                        {analytics.topUsers.map((user, index) => (
                            <div key={user.userId} className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-lg">
                                <span className="text-2xl font-bold text-slate-500 w-8">#{index + 1}</span>
                                <code className="text-slate-300 text-sm flex-1">{user.userId.slice(0, 16)}...</code>
                                <span className="text-white font-bold text-xl">{user.count} resumes</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
