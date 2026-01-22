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

  const features = [
    { icon: "🎯", title: "ATS Friendly", desc: "Clean semantic structure designed to pass every major parser." },
    { icon: "📄", title: "12+ Templates", desc: "Professional designs from minimal to creative, all optimized for impact." },
    { icon: "✨", title: "AI Enhanced", desc: "Smart suggestions to improve your content and stand out." },
    { icon: "⚡", title: "Instant Export", desc: "Download in PDF or LaTeX for maximum professional impact." },
    { icon: "🔄", title: "JSON Import", desc: "Bring your existing resume data and convert it instantly." },
    { icon: "☁️", title: "Cloud Saved", desc: "Access and edit your resumes from anywhere, anytime." },
  ];

  const stats = [
    { value: "12+", label: "Templates" },
    { value: "100%", label: "Free" },
    { value: "ATS", label: "Optimized" },
    { value: "AI", label: "Powered" },
  ];

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-indigo-50/30">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-100/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-100">
        <span className="text-xl font-black text-slate-900 tracking-tight">Resume Builder</span>
        <div className="flex items-center gap-3">
          <Link href="/convert">
            <Button variant="ghost" size="sm">JSON Converter</Button>
          </Link>
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
      <div className="flex-1 flex items-center justify-center px-4 py-16 md:py-20">
        <div className="max-w-5xl w-full space-y-12 text-center relative z-10 px-6">
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
              className="inline-block px-5 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-full text-indigo-600 text-xs font-bold tracking-widest uppercase"
            >
              ✨ ATS-Optimized & AI-Powered
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-tight">
              Build your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">career-ready</span> resume.
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Stop worrying about system rejection. Generate professional, ATS-friendly resumes with AI-powered suggestions in minutes.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-8 md:gap-16"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-indigo-600">{stat.value}</div>
                <div className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-2xl h-14 md:h-16 px-12 text-lg md:text-xl font-black transition-all hover:scale-[1.02] shadow-xl shadow-indigo-200"
              onClick={() => router.push("/templates")}
            >
              Start Building Free →
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto rounded-2xl h-14 md:h-16 px-12 text-lg md:text-xl font-black border-2 border-slate-200 transition-all hover:scale-[1.02] bg-white text-slate-700"
              onClick={() => router.push("/convert")}
            >
              Import JSON
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Everything you need to land the interview
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Powerful features designed for students and professionals who want results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="glass-card p-8 text-left space-y-4 hover:border-indigo-200 transition-all duration-300 group cursor-default"
              >
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-50" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Ready to build your perfect resume?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Join thousands of job seekers who've landed interviews with our ATS-optimized templates.
            </p>
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-slate-100 rounded-2xl h-14 px-12 text-lg font-black shadow-xl"
              onClick={() => router.push("/templates")}
            >
              Get Started — It's Free
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-100 text-center text-sm text-slate-500">
        <p>© 2025 Resume Builder. Made with ❤️ for job seekers.</p>
      </footer>
    </main>
  );
}

