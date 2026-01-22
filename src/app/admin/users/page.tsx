import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

async function getUsers() {
    const supabase = await createClient();

    // Get all unique users from resumes table with their resume counts
    const { data: resumes } = await supabase
        .from("resumes")
        .select("user_id, created_at");

    // Group by user_id
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

    // Get user profiles
    const { data: profiles } = await supabase
        .from("user_profiles")
        .select("*");

    const profileMap = new Map(profiles?.map((p: any) => [p.user_id, p]) || []);

    // Combine data
    const users = Array.from(userMap.entries()).map(([userId, data]) => ({
        id: userId,
        resumeCount: data.resumeCount,
        firstSeen: data.firstSeen,
        profile: profileMap.get(userId) || null,
    }));

    return users;
}

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Users</h1>
                    <p className="text-slate-400 mt-1">Manage platform users</p>
                </div>
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-800">
                        <tr>
                            <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">User ID</th>
                            <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">Resumes</th>
                            <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">Status</th>
                            <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">First Seen</th>
                            <th className="text-left px-6 py-4 text-slate-400 font-medium text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="border-t border-slate-700 hover:bg-slate-800/50">
                                    <td className="px-6 py-4">
                                        <code className="text-sm text-slate-300 bg-slate-700 px-2 py-1 rounded">
                                            {user.id.slice(0, 8)}...
                                        </code>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-white font-medium">{user.resumeCount}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.profile?.is_banned ? (
                                            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                                                Banned
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                                                Active
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 text-sm">
                                        {new Date(user.firstSeen).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            href={`/admin/users/${user.id}`}
                                            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                                        >
                                            View Details →
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Stats */}
            <div className="text-slate-400 text-sm">
                Total: {users.length} users
            </div>
        </div>
    );
}
