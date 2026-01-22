"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

interface Settings {
    signups_enabled: boolean;
    ai_enabled: boolean;
    max_resumes_per_user: number;
    max_ai_uses_per_day: number;
    site_name: string;
}

export default function SettingsPage() {
    const supabase = createClient();
    const [settings, setSettings] = useState<Settings>({
        signups_enabled: true,
        ai_enabled: true,
        max_resumes_per_user: 10,
        max_ai_uses_per_day: 20,
        site_name: "Resume Builder",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase
                .from("system_settings")
                .select("*");

            if (data) {
                const settingsObj: any = {};
                data.forEach((row: any) => {
                    try {
                        settingsObj[row.key] = JSON.parse(row.value);
                    } catch {
                        settingsObj[row.key] = row.value;
                    }
                });
                setSettings({
                    signups_enabled: settingsObj.signups_enabled ?? true,
                    ai_enabled: settingsObj.ai_enabled ?? true,
                    max_resumes_per_user: settingsObj.max_resumes_per_user ?? 10,
                    max_ai_uses_per_day: settingsObj.max_ai_uses_per_day ?? 20,
                    site_name: settingsObj.site_name ?? "Resume Builder",
                });
            }
            setLoading(false);
        };

        fetchSettings();
    }, [supabase]);

    const handleSave = async () => {
        setSaving(true);
        setSaveMessage(null);

        const updates = [
            { key: "signups_enabled", value: JSON.stringify(settings.signups_enabled) },
            { key: "ai_enabled", value: JSON.stringify(settings.ai_enabled) },
            { key: "max_resumes_per_user", value: JSON.stringify(settings.max_resumes_per_user) },
            { key: "max_ai_uses_per_day", value: JSON.stringify(settings.max_ai_uses_per_day) },
            { key: "site_name", value: JSON.stringify(settings.site_name) },
        ];

        for (const update of updates) {
            await supabase
                .from("system_settings")
                .upsert({ key: update.key, value: update.value, updated_at: new Date().toISOString() });
        }

        setSaving(false);
        setSaveMessage("Settings saved successfully!");
        setTimeout(() => setSaveMessage(null), 3000);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Settings</h1>
                    <p className="text-slate-400 mt-1">Configure platform behavior</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {saveMessage && (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-400">
                    {saveMessage}
                </div>
            )}

            {/* Settings Sections */}
            <div className="space-y-6">
                {/* General */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-white">General</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Site Name</label>
                            <input
                                type="text"
                                value={settings.site_name}
                                onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Feature Toggles */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-white">Feature Toggles</h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                            <div>
                                <p className="text-white font-medium">Enable New Signups</p>
                                <p className="text-slate-400 text-sm">Allow new users to register</p>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, signups_enabled: !settings.signups_enabled })}
                                className={`w-14 h-7 rounded-full transition-colors ${settings.signups_enabled ? "bg-indigo-600" : "bg-slate-600"
                                    }`}
                            >
                                <div
                                    className={`w-5 h-5 bg-white rounded-full transition-transform ${settings.signups_enabled ? "translate-x-8" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                            <div>
                                <p className="text-white font-medium">Enable AI Enhancement</p>
                                <p className="text-slate-400 text-sm">Allow users to use AI features</p>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, ai_enabled: !settings.ai_enabled })}
                                className={`w-14 h-7 rounded-full transition-colors ${settings.ai_enabled ? "bg-indigo-600" : "bg-slate-600"
                                    }`}
                            >
                                <div
                                    className={`w-5 h-5 bg-white rounded-full transition-transform ${settings.ai_enabled ? "translate-x-8" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Limits */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-white">Limits</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Max Resumes per User</label>
                            <input
                                type="number"
                                value={settings.max_resumes_per_user}
                                onChange={(e) => setSettings({ ...settings, max_resumes_per_user: parseInt(e.target.value) || 10 })}
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Max AI Uses per Day</label>
                            <input
                                type="number"
                                value={settings.max_ai_uses_per_day}
                                onChange={(e) => setSettings({ ...settings, max_ai_uses_per_day: parseInt(e.target.value) || 20 })}
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
