import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const CreativeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-slate-50 text-slate-800 w-[210mm] mx-auto min-h-[297mm] p-[25mm] font-sans leading-relaxed flex flex-col gap-10 shadow-none print:shadow-none">
            {/* Header - Refined Creative Style */}
            <header className="relative py-10 px-8 bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden ring-1 ring-slate-100">
                <div className="absolute top-0 right-0 w-48 h-48 bg-slate-100 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -ml-12 -mb-12 opacity-30" />
                <div className="relative z-10">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-4 leading-none">
                        {data.header.name}
                    </h1>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[9pt] font-black uppercase tracking-widest text-slate-400">
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
                    <div className="flex flex-wrap gap-4 text-[9pt] font-black uppercase tracking-widest mt-6">
                        {data.header.linkedin && <a href={data.header.linkedin} className="text-primary hover:text-slate-900 border-b-2 border-primary/20 hover:border-primary transition-all pb-1">LinkedIn</a>}
                        {data.header.github && <a href={data.header.github} className="text-primary hover:text-slate-900 border-b-2 border-primary/20 hover:border-primary transition-all pb-1">GitHub</a>}
                        {data.header.leetcode && <a href={data.header.leetcode} className="text-primary hover:text-slate-900 border-b-2 border-primary/20 hover:border-primary transition-all pb-1">LeetCode</a>}
                        {data.header.portfolio && <a href={data.header.portfolio} className="text-primary hover:text-slate-900 border-b-2 border-primary/20 hover:border-primary transition-all pb-1">Portfolio</a>}
                        {data.header.customLinks?.map((link, i) => (
                            <a key={i} href={link.url} className="text-primary hover:text-slate-900 border-b-2 border-primary/20 hover:border-primary transition-all pb-1">{link.name}</a>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-8 flex-1">
                {/* Left Side: Skills & Info */}
                <div className="col-span-4 space-y-8">
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-3">
                            Expertise
                            <div className="h-1 w-6 bg-primary/10 rounded-full" />
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {(data.skills.categories || []).map((cat, i) => (
                                (cat.skills || "").split(",").map((skill: string, j: number) => {
                                    const trimmed = skill.trim();
                                    if (!trimmed) return null;
                                    return (
                                        <span key={`${i}-${j}`} className="px-4 py-2 bg-white border border-slate-100 text-slate-700 rounded-xl text-[9pt] font-bold uppercase tracking-wider shadow-sm hover:border-primary/30 transition-colors">
                                            {trimmed}
                                        </span>
                                    );
                                })
                            ))}
                        </div>
                    </section>

                    {data.education.length > 0 && (
                        <section>
                            <h2 className="text-[11pt] font-black uppercase tracking-[0.25em] text-primary mb-6 flex items-center gap-4">
                                Education
                                <div className="h-1 w-8 bg-primary/10 rounded-full" />
                            </h2>
                            <div className="space-y-6">
                                {data.education.map((edu, i) => (
                                    <div key={i} className="group bg-white p-4 rounded-2xl border border-slate-50 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="font-black text-slate-900 text-[10pt] uppercase leading-tight mb-1">{edu.degree}</div>
                                        <div className="text-[9pt] text-slate-400 font-bold uppercase">{edu.institution}</div>
                                        <div className="text-[9pt] text-primary font-black mt-2 tracking-widest">{edu.duration}</div>
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
                            <h2 className="text-[11pt] font-black uppercase tracking-[0.25em] text-primary mb-8 flex items-center gap-4">
                                Career Path
                                <div className="h-px bg-slate-200 flex-1" />
                            </h2>
                            <div className="space-y-10">
                                {data.experience.map((exp, i) => (
                                    <div key={i} className="relative group">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-[11pt] font-black text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors">{exp.role}</h3>
                                                <p className="text-[10pt] font-black text-primary uppercase tracking-[0.1em] mt-0.5 opacity-80">{exp.organization}</p>
                                            </div>
                                            <span className="text-[9pt] font-black text-slate-400 border border-slate-50 px-3 py-1 rounded-lg uppercase tracking-widest bg-white">{exp.duration}</span>
                                        </div>
                                        <ul className="space-y-2 text-[10pt] text-slate-600 font-medium leading-[1.6]">
                                            {exp.bullets.map((bullet, j) => (
                                                <li key={j} className="flex items-start gap-4">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-2 flex-shrink-0 group-hover:bg-primary/30 transition-colors" />
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
                            <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-3">
                                Signature Work
                                <div className="h-px bg-slate-200 flex-1" />
                            </h2>
                            <div className="space-y-8">
                                {data.projects.map((proj, i) => (
                                    <div key={i} className="relative group">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-[11pt] font-black text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors">{proj.name}</h3>
                                                <p className="text-[10pt] font-black text-primary uppercase tracking-[0.1em] mt-0.5 opacity-80">{proj.techStack}</p>
                                            </div>
                                            {proj.link && <a href={proj.link} className="text-[8.5pt] font-black text-primary border-2 border-primary/10 px-3 py-1 rounded-lg uppercase tracking-widest bg-white hover:bg-primary hover:text-white transition-all shadow-sm">Explore →</a>}
                                        </div>
                                        <ul className="space-y-2 text-[10pt] text-slate-600 font-medium leading-[1.6]">
                                            {proj.bullets.map((bullet, j) => (
                                                <li key={j} className="flex items-start gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-2 flex-shrink-0 group-hover:bg-primary/30 transition-colors" />
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
                    <div className="grid grid-cols-2 gap-6 pt-4">
                        {data.achievements.length > 0 && (
                            <section className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm">
                                <h2 className="text-[10pt] font-black uppercase tracking-[0.15em] text-primary mb-4">Milestones</h2>
                                <ul className="space-y-3 text-[10pt] text-slate-600 font-medium">
                                    {data.achievements.map((ach, i) => (
                                        <li key={i} className="flex items-start gap-3 group">
                                            <span className="text-primary font-black animate-bounce group-hover:animate-none">★</span>
                                            <span>{ach}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                        {data.certifications.length > 0 && (
                            <section className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm">
                                <h2 className="text-[10pt] font-black uppercase tracking-[0.15em] text-primary mb-4">Accreditation</h2>
                                <ul className="space-y-3 text-[10pt] text-slate-600 font-medium">
                                    {data.certifications.map((cert, i) => (
                                        <li key={i} className="flex items-start gap-3 group">
                                            <span className="text-primary font-black">✓</span>
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
