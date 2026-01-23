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
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] -translate-y-1/2 opacity-70" />
      </div>

      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">R</div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Resume.ai</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/convert">
            <Button variant="ghost" size="sm" className="hidden md:flex">JSON Converter</Button>
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
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )
          )}
        </div>
      </header>

      {/* Hero */}
      <div className="flex-1 flex items-center justify-center px-6 py-20 md:py-32 relative">
        <div className="max-w-4xl w-full space-y-10 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100/50 rounded-full text-indigo-600 text-[13px] font-semibold"
            >
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              ATS-Optimized & AI-Powered
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1]">
              Build your <span className="text-indigo-600">career-ready</span> resume in minutes.
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Create professional, ATS-friendly resumes with AI-powered suggestions.
              Join 10,000+ students and professionals landing interviews today.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto h-14 px-10"
              onClick={() => router.push("/templates")}
            >
              Build Your Resume Now
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto h-14 px-10"
              onClick={() => router.push("/convert")}
            >
              Import Existing (JSON)
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-12 flex justify-center items-center gap-8 md:gap-16 border-t border-slate-100"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-left">
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-[13px] font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-24 px-6 relative z-10 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Everything you need to land the interview
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto font-medium">
              Powerful features designed for students and professionals who want results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all duration-300 group cursor-default"
              >
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-slate-50 border border-slate-100 rounded-xl group-hover:bg-indigo-50 group-hover:border-indigo-100 group-hover:scale-110 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-[17px] font-bold text-slate-900 mt-6 group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-[15px] font-medium leading-relaxed mt-2">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-slate-900 rounded-[2rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-200/20"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLzY8L2c+PC9zdmc+')] opacity-50" />
          <div className="relative space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Ready to land your dream job?
            </h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto font-medium">
              Join thousands of job seekers who've landed interviews with our ATS-optimized templates.
            </p>
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-50 transition-colors h-14 px-12"
              onClick={() => router.push("/templates")}
            >
              Get Started for Free
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center text-white font-bold text-sm">R</div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">Resume.ai</span>
          </div>
          <p className="text-[13px] font-medium text-slate-500 italic">
            Empowering job seekers with AI and professional design.
          </p>
          <div className="text-[13px] font-medium text-slate-400">
            © 2025 Resume.ai. Built with precision.
          </div>
        </div>
      </footer>
    </main>
  );
}

