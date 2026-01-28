import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const CreativeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-slate-50 text-slate-800 w-[794px] mx-auto min-h-[1123px] p-10 font-sans leading-relaxed flex flex-col gap-8">
            {/* Header - Refined Creative Style */}
            <header className="relative py-12 px-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-slate-100 rounded-full blur-3xl -mr-20 -mt-20 opacity-50" />
                <div className="relative z-10">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase mb-4">
                        {data.header.name}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {data.header.email}
                        </span>
                        <span className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {data.header.phone}
                        </span>
                        <span className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {data.header.location}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest mt-4">
                        {data.header.linkedin && <a href={data.header.linkedin} className="text-primary hover:text-slate-900 border-b-2 border-primary/20 hover:border-primary transition-all">LinkedIn</a>}
                        {data.header.github && <a href={data.header.github} className="text-primary hover:text-slate-900 border-b-2 border-primary/20 hover:border-primary transition-all">GitHub</a>}
                        {data.header.leetcode && <a href={data.header.leetcode} className="text-primary hover:text-slate-900 border-b-2 border-primary/20 hover:border-primary transition-all">LeetCode</a>}
                        {data.header.portfolio && <a href={data.header.portfolio} className="text-primary hover:text-slate-900 border-b-2 border-primary/20 hover:border-primary transition-all">Portfolio</a>}
                        {data.header.customLinks?.map((link, i) => (
                            <a key={i} href={link.url} className="text-primary hover:text-slate-900 border-b-2 border-primary/20 hover:border-primary transition-all">{link.name}</a>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-8">
                {/* Left Side: Skills & Info */}
                <div className="col-span-4 space-y-8">
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">Expertise</h2>
                        <div className="flex flex-wrap gap-2">
                            {(data.skills.categories || []).map((cat, i) => (
                                (cat.skills || "").split(",").map((skill: string, j: number) => {
                                    const trimmed = skill.trim();
                                    if (!trimmed) return null;
                                    return (
                                        <span key={`${i}-${j}`} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-[9px] font-black uppercase shadow-sm">
                                            {trimmed}
                                        </span>
                                    );
                                })
                            ))}
                        </div>
                    </section>

                    {data.education.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">Education</h2>
                            <div className="space-y-4">
                                {data.education.map((edu, i) => (
                                    <div key={i} className="group">
                                        <div className="font-black text-slate-900 text-xs uppercase leading-tight">{edu.degree}</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">{edu.institution}</div>
                                        <div className="text-[9px] text-primary font-black mt-1">{edu.duration}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Side: Experience & Projects */}
                <div className="col-span-8 space-y-8">
                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-3">
                                <div className="h-px bg-slate-200 flex-1" />
                                Professional History
                            </h2>
                            <div className="space-y-8">
                                {data.experience.map((exp, i) => (
                                    <div key={i} className="relative">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">{exp.role}</h3>
                                                <p className="text-[11px] font-black text-primary uppercase tracking-widest mt-1">{exp.organization}</p>
                                            </div>
                                            <span className="text-[9px] font-black text-slate-400 border border-slate-200 px-2 py-1 rounded-md uppercase">{exp.duration}</span>
                                        </div>
                                        <ul className="space-y-2 text-[11px] text-slate-600 font-medium leading-relaxed">
                                            {exp.bullets.map((bullet, j) => (
                                                <li key={j} className="flex items-start gap-3">
                                                    <span className="w-1 h-1 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.projects.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-3">
                                <div className="h-px bg-slate-200 flex-1" />
                                Projects
                            </h2>
                            <div className="space-y-6">
                                {data.projects.map((proj, i) => (
                                    <div key={i} className="relative">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">{proj.name}</h3>
                                                <p className="text-[11px] font-black text-primary uppercase tracking-widest mt-1">{proj.techStack}</p>
                                            </div>
                                            {proj.link && <a href={proj.link} className="text-[9px] font-black text-primary border border-slate-200 px-2 py-1 rounded-md uppercase">View →</a>}
                                        </div>
                                        <ul className="space-y-2 text-[11px] text-slate-600 font-medium leading-relaxed">
                                            {proj.bullets.map((bullet, j) => (
                                                <li key={j} className="flex items-start gap-3">
                                                    <span className="w-1 h-1 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Achievements & Certifications */}
                    <div className="grid grid-cols-2 gap-6">
                        {data.achievements.length > 0 && (
                            <section>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">Achievements</h2>
                                <ul className="space-y-2 text-[11px] text-slate-600 font-medium">
                                    {data.achievements.map((ach, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-primary">★</span>
                                            <span>{ach}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                        {data.certifications.length > 0 && (
                            <section>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">Certifications</h2>
                                <ul className="space-y-2 text-[11px] text-slate-600 font-medium">
                                    {data.certifications.map((cert, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-primary">✓</span>
                                            <span>{cert}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
