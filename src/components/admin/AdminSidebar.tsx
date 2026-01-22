"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/users", label: "Users", icon: "👥" },
    { href: "/admin/analytics", label: "Analytics", icon: "📈" },
    { href: "/admin/ai-usage", label: "AI Usage", icon: "🤖" },
    { href: "/admin/settings", label: "Settings", icon: "⚙️" },
    { href: "/admin/announcements", label: "Announcements", icon: "📢" },
    { href: "/admin/templates", label: "Templates", icon: "📄" },
    { href: "/admin/moderation", label: "Moderation", icon: "🛡️" },
    { href: "/admin/security", label: "Security", icon: "🔐" },
    { href: "/admin/exports", label: "Exports", icon: "📤" },
];

export const AdminSidebar: React.FC = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-slate-900 min-h-screen border-r border-slate-800 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-slate-800">
                <Link href="/admin" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">R</span>
                    </div>
                    <div>
                        <h1 className="text-white font-bold">Resume Builder</h1>
                        <p className="text-xs text-slate-400">Admin Panel</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                    ? "bg-indigo-600 text-white"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
                >
                    <span className="text-lg">🏠</span>
                    <span className="font-medium">Back to App</span>
                </Link>
            </div>
        </aside>
    );
};
