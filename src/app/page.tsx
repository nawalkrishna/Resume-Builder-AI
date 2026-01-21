"use client";

import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();
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

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-white/50">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-black text-slate-900 tracking-tight">Resume Builder</span>
        <div className="flex items-center gap-3">
          {!loading && (
            user ? (
              <Link href="/dashboard">
                <Button size="sm">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )
          )}
        </div>
      </header>

      {/* Hero */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-4xl w-full space-y-12 text-center relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-5 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-xs font-bold tracking-widest uppercase"
            >
              ATS-Optimized &amp; Student-First
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-tight">
              Build your <span className="text-indigo-600 italic">career-ready</span> resume in minutes.
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Stop worrying about system rejection. Generate professional, system-readable resumes designed to clear the noise and get you the interview.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-2xl h-14 md:h-16 px-12 text-lg md:text-xl font-black transition-all hover:scale-[1.02]"
              onClick={() => router.push("/builder")}
            >
              Start Building
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto rounded-2xl h-14 md:h-16 px-12 text-lg md:text-xl font-black border-2 border-slate-200 transition-all hover:scale-[1.02] bg-white text-slate-700"
              onClick={() => router.push("/builder?import=true")}
            >
              Import JSON
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center gap-3 text-xs md:text-sm font-bold text-slate-400 group cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 group-hover:bg-indigo-500 transition-colors" />
            Save &amp; Manage Resumes • Export PDF/LaTeX • 100% Free
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12"
          >
            {[
              { title: "ATS Friendly", desc: "Clean semantic structure designed to pass every major parser." },
              { title: "Single Column", desc: "No complex layouts or tables that break standard HR systems." },
              { title: "Instant Export", desc: "Download in PDF or LaTeX for maximum professional impact." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="glass-card p-8 text-left space-y-4 hover:border-indigo-200 transition-all duration-300 group"
              >
                <div className="w-10 h-10 flex items-center justify-center text-xl font-black text-indigo-500 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{feature.title}</h3>
                <p className="text-slate-500 text-sm font-semibold leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
