import { createClient } from "@/lib/supabase/server";

async function getActivityLogs() {
    const supabase = await createClient();

    const { data: logs } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

    return logs || [];
}

export default async function SecurityPage() {
    const logs = await getActivityLogs();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Security</h1>
                <p className="text-slate-400 mt-1">Activity logs and security monitoring</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <p className="text-slate-400 text-sm">Total Logs</p>
                    <p className="text-3xl font-bold text-white mt-1">{logs.length}</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <p className="text-slate-400 text-sm">Today's Activity</p>
                    <p className="text-3xl font-bold text-white mt-1">
                        {logs.filter((l: any) =>
                            new Date(l.created_at).toDateString() === new Date().toDateString()
                        ).length}
                    </p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <p className="text-slate-400 text-sm">Unique Users</p>
                    <p className="text-3xl font-bold text-white mt-1">
                        {new Set(logs.map((l: any) => l.user_id)).size}
                    </p>
                </div>
            </div>

            {/* Activity Logs Table */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-700">
                    <h2 className="text-lg font-semibold text-white">Activity Logs</h2>
                </div>
                <table className="w-full">
                    <thead className="bg-slate-800">
                        <tr>
                            <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">User</th>
                            <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">Action</th>
                            <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">Details</th>
                            <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">IP</th>
                            <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                                    No activity logs yet. Logs will appear as users interact with the platform.
                                </td>
                            </tr>
                        ) : (
                            logs.map((log: any) => (
                                <tr key={log.id} className="border-t border-slate-700">
                                    <td className="px-6 py-4">
                                        <code className="text-slate-300 text-xs">
                                            {log.user_id?.slice(0, 8) || "System"}...
                                        </code>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-indigo-600/20 text-indigo-400 text-xs rounded">
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 text-sm max-w-xs truncate">
                                        {log.details ? JSON.stringify(log.details) : "-"}
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 text-sm">
                                        {log.ip_address || "-"}
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 text-sm">
                                        {new Date(log.created_at).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* GDPR Export Section */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">GDPR Compliance</h2>
                <p className="text-slate-400 mb-4">
                    Export all data for a specific user for GDPR compliance requests.
                </p>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Enter user ID..."
                        className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                    <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        Export User Data
                    </button>
                </div>
            </div>
        </div>
    );
}
