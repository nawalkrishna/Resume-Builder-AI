"use client";

import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import Image from "next/image";
import { Logo } from "@/components/ui/Logo";

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
    {
      icon: "🎯",
      title: "ATS Optimized",
      desc: "Built with industry-standard semantic structures to breeze through Applicant Tracking Systems.",
    },
    {
      icon: "✨",
      title: "AI Optimization",
      desc: "Turn basic job duties into powerful achievement statements with our intelligent suggestion engine.",
    },
    {
      icon: "🎨",
      title: "Premium Designs",
      desc: "Access a curated collection of modern templates designed by recruitment experts for maximum impact.",
    },
    {
      icon: "⚡",
      title: "Instant Export",
      desc: "Generate and download your resume in high-fidelity PDF format in seconds, ready for submission.",
    },
    {
      icon: "🔄",
      title: "Data Studio",
      desc: "Maximum flexibility with advanced editing tools. Import, export, and sync your data seamlessly.",
    },
    {
      icon: "☁️",
      title: "Secure Cloud",
      desc: "Your data is encrypted and saved in the cloud. Access, edit, and update your resumes anywhere.",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-white overflow-x-hidden font-outfit">
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-6 pt-4 md:pt-8 pb-6 overflow-hidden">
        {/* Abstract background light */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight">
                Build Your Future <br />
                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">With Resume.ai</span>
              </h1>
              <p className="text-base text-slate-500 font-medium max-w-xl leading-relaxed">
                Smart resume building for modern professionals. Forge a path to your dream career with AI-optimized content that demands attention.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Button
                size="md"
                className="h-10 px-6 rounded-xl text-sm font-bold bg-primary hover:bg-primary-dark transition-all shadow-lg shadow-sky-100 flex-1 sm:flex-none"
                onClick={() => router.push("/templates")}
              >
                Build My Resume
              </Button>
              <Button
                size="md"
                variant="outline"
                className="h-10 px-6 rounded-xl text-sm font-bold border border-primary text-primary hover:bg-primary/5 transition-all flex-1 sm:flex-none"
                onClick={() => router.push("/convert")}
              >
                Data Studio
              </Button>
            </div>

            <div className="flex flex-wrap items-start gap-10 pt-4">
              <div className="space-y-2">
                <div className="text-4xl font-black text-accent">48%</div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Higher Hire Rate</div>
              </div>
              <div className="w-px h-16 bg-slate-100 hidden sm:block" />
              <div className="space-y-2 max-w-[200px]">
                <div className="text-4xl font-bold" style={{ color: "#FFB800" }}>12%</div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Salary Increase</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Resume Mockup */}
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-4 border border-slate-100 overflow-hidden group">
              <div className="w-full aspect-[3/4.2] bg-slate-50 rounded-lg overflow-hidden flex flex-col">
                {/* AI Insight Dashboard Visualization */}
                <div className="w-full h-full bg-white p-8 flex flex-col gap-8 relative overflow-hidden">
                  {/* Circular Analysis Animation */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-20 -right-20 w-64 h-64 border-[32px] border-primary/5 rounded-full pointer-events-none"
                  />

                  {/* Dashboard Header - Score Gauge */}
                  <div className="flex items-center gap-8 relative z-10">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="64" cy="64" r="56" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                        <motion.circle
                          cx="64" cy="64" r="56" fill="none" stroke="url(#scoreGradient)" strokeWidth="10" strokeLinecap="round"
                          initial={{ strokeDasharray: "0 360" }}
                          animate={{ strokeDasharray: "310 360" }}
                          transition={{ duration: 2, delay: 0.5 }}
                        />
                        <defs>
                          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#0ea5e9" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-slate-800">92%</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Strength</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="h-6 w-40 bg-slate-900 rounded-lg" />
                      <div className="h-3 w-24 bg-primary/20 rounded-full" />
                      <div className="flex gap-2 pt-2">
                        <div className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-md border border-emerald-100 italic">Excellent Match</div>
                      </div>
                    </div>
                  </div>

                  {/* Analysis Metrics */}
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    {[
                      { label: "Impact Score", val: "High", color: "text-emerald-500" },
                      { label: "Keyword Density", val: "88%", color: "text-blue-500" },
                      { label: "Action Verbs", val: "Optimal", color: "text-purple-500" },
                      { label: "Layout Flow", val: "Perfect", color: "text-primary" }
                    ].map((m, i) => (
                      <div key={i} className="bg-slate-50/50 border border-slate-100 p-4 rounded-2xl space-y-1">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{m.label}</div>
                        <div className={`text-sm font-black ${m.color}`}>{m.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Real-time Insights List */}
                  <div className="space-y-4 relative z-10">
                    <div className="text-[11px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Section Analysis
                    </div>
                    <div className="space-y-3">
                      {[
                        { text: "Strong quantifiable achievements detected", status: "win" },
                        { text: "Optimized for Engineering Management roles", status: "match" },
                        { text: "Detected 4 missing industry keywords", status: "fix" }
                      ].map((insight, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs font-medium text-slate-600">
                          {insight.status === 'fix' ? (
                            <div className="w-5 h-5 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center font-bold">!</div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">✓</div>
                          )}
                          {insight.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* PDF/DOCX floating icons */}
              <div className="absolute top-8 right-8 flex flex-col gap-3 z-30">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[10px] font-black text-rose-500 border border-slate-50 hover:scale-110 transition-transform cursor-pointer">PDF</div>
                <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[10px] font-black text-sky-500 border border-slate-50 hover:scale-110 transition-transform cursor-pointer">DOCX</div>
              </div>

              {/* ATS Perfect Badge */}
              <div className="absolute bottom-12 left-8 px-5 py-2.5 bg-accent/10 border border-accent/20 rounded-full flex items-center gap-3 text-accent font-black text-xs uppercase tracking-widest shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                ATS Optimized
              </div>

              {/* AI Suggestions floating card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-8 max-w-[280px] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 border border-slate-50 space-y-4 z-20"
              >
                <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest">
                  ✨ AI Suggestions
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3 text-xs text-slate-500 font-medium leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-sky-50 flex-shrink-0 flex items-center justify-center text-primary font-bold">→</div>
                    Optimized cloud infrastructure...
                  </div>
                  <div className="flex gap-3 text-xs text-slate-500 font-medium leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-sky-50 flex-shrink-0 flex items-center justify-center text-primary font-bold">→</div>
                    Architected robust API layers...
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Background glowing circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-sky-200/20 rounded-full blur-[80px] pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Trustpilot / Companies Section */}
      <section className="py-8 border-y border-slate-50 flex flex-wrap justify-center gap-x-12 gap-y-6 items-center opacity-40 grayscale group-hover:grayscale-0 transition-all px-6">
        {["Google", "Microsoft", "Amazon", "Apple", "Uber", "Netflix"].map((name) => (
          <span key={name} className="text-lg font-black text-slate-400 font-sans italic tracking-widest">{name}</span>
        ))}
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">
              Tools to <span className="text-primary">elevate your career</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              Everything you need to craft a professional resume that gets you noticed by top-tier recruiters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:shadow-sky-100 transition-all group border-b-4 border-b-transparent hover:border-b-primary"
              >
                <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform shadow-inner">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-4">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Secondary CTA */}
      <section className="py-12 px-6 bg-slate-50/30 flex justify-center">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full max-w-3xl"
        >
          <Link href="/templates">
            <Button size="md" className="w-full h-12 shadow-xl shadow-sky-100 font-bold px-8 rounded-xl text-sm">
              Build My Resume
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 font-medium text-xs">
          <Logo className="grayscale opacity-60 scale-90" />
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <div>© 2026 Resume.ai. All rights reserved.</div>
        </div>
      </footer>
    </main >
  );
}
