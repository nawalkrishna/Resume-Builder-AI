import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const BoldTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-900 w-[794px] mx-auto min-h-[1123px]">
            {/* Header - Bold Slate Accent */}
            <header className="bg-slate-900 text-white px-10 py-10">
                <h1 className="text-5xl font-black uppercase tracking-tight leading-none mb-4">{data.header.name}</h1>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <span className="flex items-center gap-2">{data.header.email}</span>
                    <span className="flex items-center gap-2">{data.header.phone}</span>
                    <span className="flex items-center gap-2">{data.header.location}</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-black uppercase tracking-[0.2em] mt-4">
                    {data.header.linkedin && <a href={data.header.linkedin} className="text-white hover:text-slate-400">LinkedIn</a>}
                    {data.header.github && <a href={data.header.github} className="text-white hover:text-slate-400">GitHub</a>}
                    {data.header.leetcode && <a href={data.header.leetcode} className="text-white hover:text-slate-400">LeetCode</a>}
                    {data.header.portfolio && <a href={data.header.portfolio} className="text-white hover:text-slate-400">Portfolio</a>}
                    {data.header.customLinks?.map((link, i) => (
                        <a key={i} href={link.url} className="text-white hover:text-slate-400">{link.name}</a>
                    ))}
                </div>
            </header>

            <div className="p-10 space-y-10">
                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900 border-b-8 border-slate-900 pb-2 mb-6 inline-block">
                            Expertise
                        </h2>
                        <div className="space-y-8">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-lg font-black uppercase tracking-tight">{exp.role}</h3>
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">{exp.duration}</span>
                                    </div>
                                    <p className="text-slate-400 font-black uppercase text-xs tracking-widest mb-4">{exp.organization}</p>
                                    <ul className="space-y-2 text-[11px] text-slate-600 font-medium leading-relaxed">
                                        {exp.bullets.map((bullet, j) => (
                                            <li key={j} className="flex items-start gap-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-1.5" />
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                <section>
                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900 border-b-8 border-slate-900 pb-2 mb-6 inline-block">
                        Education
                    </h2>
                    <div className="grid grid-cols-2 gap-8">
                        {data.education.map((edu, i) => (
                            <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <h3 className="font-black text-slate-900 uppercase text-xs mb-1">{edu.degree}</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">{edu.institution}</p>
                                <span className="text-[9px] font-black text-primary uppercase tracking-widest">{edu.duration}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                {data.projects.length > 0 && (
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900 border-b-8 border-slate-900 pb-2 mb-6 inline-block">
                            Projects
                        </h2>
                        <div className="space-y-6">
                            {data.projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-lg font-black uppercase tracking-tight">{proj.name}</h3>
                                        {proj.link && <a href={proj.link} className="text-[10px] font-black text-primary uppercase tracking-widest">View →</a>}
                                    </div>
                                    <p className="text-slate-400 font-black uppercase text-xs tracking-widest mb-4">{proj.techStack}</p>
                                    <ul className="space-y-2 text-[11px] text-slate-600 font-medium leading-relaxed">
                                        {proj.bullets.map((bullet, j) => (
                                            <li key={j} className="flex items-start gap-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-1.5" />
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900 border-b-8 border-slate-900 pb-2 mb-6 inline-block">
                            Skills
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {(data.skills.categories || []).map((cat, i) => (
                                (cat.skills || "").split(",").filter(s => s.trim()).map((skill, j) => (
                                    <span key={`${i}-${j}`} className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider rounded-xl">
                                        {skill.trim()}
                                    </span>
                                ))
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements & Certifications */}
                <div className="grid grid-cols-2 gap-8">
                    {data.achievements.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900 border-b-8 border-slate-900 pb-2 mb-6 inline-block">
                                Achievements
                            </h2>
                            <ul className="space-y-2 text-[11px] text-slate-600 font-medium">
                                {data.achievements.map((ach, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="text-primary font-black">★</span>
                                        <span>{ach}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                    {data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900 border-b-8 border-slate-900 pb-2 mb-6 inline-block">
                                Certifications
                            </h2>
                            <ul className="space-y-2 text-[11px] text-slate-600 font-medium">
                                {data.certifications.map((cert, i) => (
                                    <li key={i} className="flex items-start gap-3">
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
    );
};
