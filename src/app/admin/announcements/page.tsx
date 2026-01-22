"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

interface Announcement {
    id: string;
    title: string;
    content: string;
    type: "info" | "warning" | "success";
    is_active: boolean;
    created_at: string;
    expires_at: string | null;
}

export default function AnnouncementsPage() {
    const supabase = createClient();
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        type: "info" as "info" | "warning" | "success",
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        const { data } = await supabase
            .from("announcements")
            .select("*")
            .order("created_at", { ascending: false });
        setAnnouncements(data || []);
        setLoading(false);
    };

    const handleCreate = async () => {
        setSaving(true);
        const { data: { user } } = await supabase.auth.getUser();

        await supabase.from("announcements").insert({
            title: formData.title,
            content: formData.content,
            type: formData.type,
            created_by: user?.id,
        });

        setFormData({ title: "", content: "", type: "info" });
        setShowForm(false);
        setSaving(false);
        fetchAnnouncements();
    };

    const handleToggle = async (id: string, isActive: boolean) => {
        await supabase
            .from("announcements")
            .update({ is_active: !isActive })
            .eq("id", id);
        fetchAnnouncements();
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete this announcement?")) {
            await supabase.from("announcements").delete().eq("id", id);
            fetchAnnouncements();
        }
    };

    const typeColors = {
        info: "bg-blue-500/20 text-blue-400 border-blue-500/50",
        warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
        success: "bg-green-500/20 text-green-400 border-green-500/50",
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Announcements</h1>
                    <p className="text-slate-400 mt-1">Broadcast messages to all users</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    {showForm ? "Cancel" : "+ New Announcement"}
                </button>
            </div>

            {/* Create Form */}
            {showForm && (
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-white">Create Announcement</h2>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                            placeholder="Announcement title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Content</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 h-24"
                            placeholder="Announcement content"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                        >
                            <option value="info">Info</option>
                            <option value="warning">Warning</option>
                            <option value="success">Success</option>
                        </select>
                    </div>
                    <button
                        onClick={handleCreate}
                        disabled={saving || !formData.title || !formData.content}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                        {saving ? "Creating..." : "Create Announcement"}
                    </button>
                </div>
            )}

            {/* Announcements List */}
            <div className="space-y-4">
                {announcements.length === 0 ? (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center">
                        <p className="text-slate-400">No announcements yet</p>
                    </div>
                ) : (
                    announcements.map((announcement) => (
                        <div
                            key={announcement.id}
                            className={`border rounded-xl p-6 ${typeColors[announcement.type]} ${!announcement.is_active ? "opacity-50" : ""
                                }`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-semibold">{announcement.title}</h3>
                                        <span className="text-xs uppercase font-medium">{announcement.type}</span>
                                        {!announcement.is_active && (
                                            <span className="text-xs bg-slate-600 px-2 py-1 rounded">Inactive</span>
                                        )}
                                    </div>
                                    <p className="mt-2 opacity-80">{announcement.content}</p>
                                    <p className="text-xs mt-3 opacity-60">
                                        Created: {new Date(announcement.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleToggle(announcement.id, announcement.is_active)}
                                        className="px-3 py-1 bg-slate-700 text-white rounded text-sm hover:bg-slate-600"
                                    >
                                        {announcement.is_active ? "Disable" : "Enable"}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(announcement.id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
