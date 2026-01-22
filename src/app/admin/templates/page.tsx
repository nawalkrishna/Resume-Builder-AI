"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

interface Template {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    is_active: boolean;
    is_premium: boolean;
    created_at: string;
}

export default function TemplatesPage() {
    const supabase = createClient();
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        is_premium: false,
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        const { data } = await supabase
            .from("resume_templates")
            .select("*")
            .order("created_at", { ascending: false });
        setTemplates(data || []);
        setLoading(false);
    };

    const handleCreate = async () => {
        setSaving(true);
        await supabase.from("resume_templates").insert({
            name: formData.name,
            slug: formData.slug.toLowerCase().replace(/\s+/g, "-"),
            description: formData.description,
            is_premium: formData.is_premium,
        });

        setFormData({ name: "", slug: "", description: "", is_premium: false });
        setShowForm(false);
        setSaving(false);
        fetchTemplates();
    };

    const handleToggleActive = async (id: string, isActive: boolean) => {
        await supabase
            .from("resume_templates")
            .update({ is_active: !isActive })
            .eq("id", id);
        fetchTemplates();
    };

    const handleTogglePremium = async (id: string, isPremium: boolean) => {
        await supabase
            .from("resume_templates")
            .update({ is_premium: !isPremium })
            .eq("id", id);
        fetchTemplates();
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete this template?")) {
            await supabase.from("resume_templates").delete().eq("id", id);
            fetchTemplates();
        }
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
                    <h1 className="text-3xl font-bold text-white">Templates</h1>
                    <p className="text-slate-400 mt-1">Manage resume templates</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    {showForm ? "Cancel" : "+ Add Template"}
                </button>
            </div>

            {/* Create Form */}
            {showForm && (
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-white">Add New Template</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                                placeholder="Template name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Slug</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                                placeholder="template-slug"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                            placeholder="Template description"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={formData.is_premium}
                            onChange={(e) => setFormData({ ...formData, is_premium: e.target.checked })}
                            className="w-4 h-4"
                        />
                        <label className="text-slate-300">Premium Template</label>
                    </div>
                    <button
                        onClick={handleCreate}
                        disabled={saving || !formData.name || !formData.slug}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                        {saving ? "Adding..." : "Add Template"}
                    </button>
                </div>
            )}

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className={`bg-slate-800/50 border border-slate-700 rounded-xl p-6 ${!template.is_active ? "opacity-50" : ""
                            }`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                                <code className="text-slate-400 text-xs">{template.slug}</code>
                            </div>
                            <div className="flex gap-2">
                                {template.is_premium && (
                                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                                        Premium
                                    </span>
                                )}
                                {!template.is_active && (
                                    <span className="px-2 py-1 bg-slate-600 text-slate-300 text-xs rounded">
                                        Inactive
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="text-slate-400 text-sm mb-4">{template.description || "No description"}</p>

                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={() => handleToggleActive(template.id, template.is_active)}
                                className="px-3 py-1 bg-slate-700 text-white rounded text-sm hover:bg-slate-600"
                            >
                                {template.is_active ? "Disable" : "Enable"}
                            </button>
                            <button
                                onClick={() => handleTogglePremium(template.id, template.is_premium)}
                                className="px-3 py-1 bg-yellow-600/50 text-yellow-300 rounded text-sm hover:bg-yellow-600"
                            >
                                {template.is_premium ? "Make Free" : "Make Premium"}
                            </button>
                            <button
                                onClick={() => handleDelete(template.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
