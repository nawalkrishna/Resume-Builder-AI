"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { createClient } from "@/lib/supabase/client";

export const Navbar = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        checkUser();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        window.location.reload();
    };

    return (

        <nav className="fixed w-full z-50 top-0 left-0 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl transition-all">
            <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Logo />
                </Link>
                <div className="flex items-center gap-8">
                    <Link href="/convert" className="text-slate-500 hover:text-primary font-bold text-sm transition-colors">
                        JSON Editor
                    </Link>
                    {!loading && (
                        user ? (
                            <div className="flex items-center gap-6">
                                <Link href="/dashboard">
                                    <Button size="sm">Dashboard</Button>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-slate-500 hover:text-rose-500 font-bold text-sm transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-6">
                                <Link href="/auth/login" className="text-slate-600 hover:text-primary transition-colors text-sm font-bold">
                                    Login
                                </Link>
                                <Link href="/templates">
                                    <Button variant="outline" size="sm" className="rounded-full px-6 h-9 font-bold border-primary text-primary hover:bg-primary/5 shadow-sm hover:shadow-md transition-all">
                                        + Build Resume
                                    </Button>
                                </Link>
                            </div>
                        )
                    )}
                </div>
            </div>
        </nav>
    );
};
