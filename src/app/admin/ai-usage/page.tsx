import { createClient } from "@/lib/supabase/server";

async function getAIUsage() {
    const supabase = await createClient();

    // Get all AI usage
    const { data: usage, count: totalCount } = await supabase
        .from("ai_usage")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .limit(50);

    // Get usage by type
    const typeCount: Record<string, number> = {};
    usage?.forEach((u: any) => {
        typeCount[u.type] = (typeCount[u.type] || 0) + 1;
    });

    // Get total cost
    const totalCost = usage?.reduce((sum: number, u: any) => sum + (parseFloat(u.cost_usd) || 0), 0) || 0;

    // Get usage by user
    const userUsage: Record<string, number> = {};
    usage?.forEach((u: any) => {
        userUsage[u.user_id] = (userUsage[u.user_id] || 0) + 1;
    });

    const topUsersByAI = Object.entries(userUsage)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([userId, count]) => ({ userId, count }));

    return {
        recentUsage: usage || [],
        totalCount: totalCount || 0,
        byType: Object.entries(typeCount).map(([type, count]) => ({ type, count })),
        totalCost,
        topUsers: topUsersByAI,
    };
}

export default async function AIUsagePage() {
    const data = await getAIUsage();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">AI Usage</h1>
                <p className="text-slate-400 mt-1">Monitor OpenAI API usage and costs</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <p className="text-slate-400 text-sm">Total Requests</p>
                    <p className="text-3xl font-bold text-white mt-1">{data.totalCount}</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <p className="text-slate-400 text-sm">Estimated Cost</p>
                    <p className="text-3xl font-bold text-green-400 mt-1">${data.totalCost.toFixed(4)}</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <p className="text-slate-400 text-sm">Unique Users</p>
                    <p className="text-3xl font-bold text-white mt-1">{data.topUsers.length}</p>
                </div>
            </div>

            {/* Usage by Type */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Usage by Type</h2>
                    {data.byType.length === 0 ? (
                        <p className="text-slate-400">No AI usage yet</p>
                    ) : (
                        <div className="space-y-3">
                            {data.byType.map((item) => (
                                <div key={item.type} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                                    <span className="text-white font-medium capitalize">{item.type}</span>
                                    <span className="text-2xl font-bold text-indigo-400">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Top Users by AI Usage</h2>
                    {data.topUsers.length === 0 ? (
                        <p className="text-slate-400">No AI usage yet</p>
                    ) : (
                        <div className="space-y-3">
                            {data.topUsers.map((user, index) => (
                                <div key={user.userId} className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-lg">
                                    <span className="text-lg font-bold text-slate-500">#{index + 1}</span>
                                    <code className="text-slate-300 text-sm flex-1">{user.userId.slice(0, 12)}...</code>
                                    <span className="text-white font-bold">{user.count} uses</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Usage Table */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-700">
                    <h2 className="text-lg font-semibold text-white">Recent AI Requests</h2>
                </div>
                <table className="w-full">
                    <thead className="bg-slate-800">
                        <tr>
                            <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">User</th>
                            <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">Type</th>
                            <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">Tokens</th>
                            <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">Cost</th>
                            <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.recentUsage.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                                    No AI requests yet
                                </td>
                            </tr>
                        ) : (
                            data.recentUsage.map((usage: any) => (
                                <tr key={usage.id} className="border-t border-slate-700">
                                    <td className="px-6 py-4">
                                        <code className="text-slate-300 text-xs">{usage.user_id?.slice(0, 8)}...</code>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-indigo-600/20 text-indigo-400 text-xs rounded capitalize">
                                            {usage.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white">{usage.tokens_used || 0}</td>
                                    <td className="px-6 py-4 text-green-400">${(parseFloat(usage.cost_usd) || 0).toFixed(6)}</td>
                                    <td className="px-6 py-4 text-slate-400 text-sm">
                                        {new Date(usage.created_at).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
