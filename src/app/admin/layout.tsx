"use client";

import React from "react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminGuard>
            <div className="flex min-h-screen bg-slate-900">
                <AdminSidebar />
                <main className="flex-1 p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </AdminGuard>
    );
}
