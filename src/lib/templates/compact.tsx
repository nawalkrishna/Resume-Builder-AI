import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const CompactTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-800 font-sans text-[10.5pt] leading-[1.5] w-full flex flex-col shadow-none print:shadow-none p-4">
            {/* Ultra-High Density Header */}
            <header className="border-b-[1.5pt] border-slate-900 pb-2 mb-4">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">{data.header.name}</h1>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2 text-[8.5pt] text-slate-500 font-bold uppercase tracking-tight">
                            <span>{data.header.location}</span>
                            <span className="text-slate-300">•</span>
                            <span>{data.header.phone}</span>
                            <span className="text-slate-300">•</span>
                            <span>{data.header.email}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 text-[8pt] font-black text-primary uppercase tracking-tighter">
                        {data.header.linkedin && <a href={data.header.linkedin} className="hover:underline">LinkedIn</a>}
                        {data.header.github && <a href={data.header.github} className="hover:underline">GitHub</a>}
                        {data.header.leetcode && <a href={data.header.leetcode} className="hover:underline">LeetCode</a>}
                        {data.header.portfolio && <a href={data.header.portfolio} className="hover:underline">Portfolio</a>}
                        {data.header.customLinks?.map((link, i) => (
                            <a key={i} href={link.url} className="hover:underline">{link.name}</a>
                        ))}
                    </div>
                </div>
            </header>

            <div className="flex gap-x-6 flex-1">
                {/* Unified High-Density Content Column (approx 70% width) */}
                <div className="w-[70%] space-y-7">
                    {/* 1. Experience */}
                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-[9pt] font-black uppercase tracking-[0.2em] text-white bg-slate-900 px-3 py-1 mb-3 inline-block">Experience</h2>
                            <div className="space-y-4">
                                {data.experience.map((exp, i) => (
                                    <div key={i} className="relative">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-slate-900 text-[10.5pt] uppercase tracking-tight">{exp.role}</h3>
                                            <span className="text-slate-500 font-bold text-[8.5pt] uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{exp.duration}</span>
                                        </div>
                                        <p className="text-primary font-black uppercase text-[9pt] tracking-widest mb-1.5">{exp.organization}</p>
                                        <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700">
                                            {exp.bullets.map((bullet, j) => (
                                                <li key={j} className="pl-1">{bullet}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* 2. Education (Moved to Left Column) */}
                    {data.education.length > 0 && (
                        <section>
                            <h2 className="text-[9pt] font-black uppercase tracking-[0.2em] text-white bg-slate-900 px-3 py-1 mb-3 inline-block">Education</h2>
                            <div className="space-y-3">
                                {data.education.map((edu, i) => (
                                    <div key={i} className="flex justify-between items-start border-l-2 border-slate-100 pl-4 py-1">
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-[10.5pt] uppercase tracking-tight">{edu.degree}</h3>
                                            <p className="text-[9.5pt] text-slate-600 font-bold italic mt-0.5">{edu.institution}</p>
                                            {edu.cgpa && <p className="text-[9pt] text-emerald-600 font-bold mt-1 uppercase tracking-tighter">GPA: {edu.cgpa}</p>}
                                        </div>
                                        <span className="text-[8.5pt] font-bold text-slate-400 uppercase tracking-widest">{edu.duration}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* 3. Projects */}
                    {data.projects.length > 0 && (
                        <section>
                            <h2 className="text-[9pt] font-black uppercase tracking-[0.2em] text-white bg-slate-900 px-3 py-1 mb-3 inline-block">Projects</h2>
                            <div className="space-y-4">
                                {data.projects.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-slate-900 text-[10pt] uppercase tracking-tight">{proj.name}</h3>
                                            {proj.link && <a href={proj.link} className="text-primary text-[8pt] font-black uppercase hover:underline tracking-widest italic decoration-2 underline-offset-4">Case Study →</a>}
                                        </div>
                                        <p className="text-slate-500 font-bold uppercase text-[8.5pt] tracking-widest mb-1.5 italic opacity-80">{proj.techStack}</p>
                                        <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700">
                                            {proj.bullets.map((bullet, j) => (
                                                <li key={j} className="pl-1">{bullet}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Dense Utility Sidebar (approx 26% width) */}
                <div className="w-[26%] space-y-6">
                    {/* Expertise */}
                    {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                        <section>
                            <h2 className="text-[9pt] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-1 mb-3">Expertise</h2>
                            <div className="space-y-4">
                                {(data.skills.categories || []).map((cat, i) => (
                                    cat.skills && (
                                        <div key={i}>
                                            <div className="text-[8pt] font-black uppercase tracking-wider text-slate-900 mb-1">{cat.category}</div>
                                            <div className="text-[9pt] text-slate-600 leading-snug font-medium">{cat.skills}</div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Honors */}
                    {data.achievements.length > 0 && (
                        <section>
                            <h2 className="text-[9pt] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-1 mb-3">Honors</h2>
                            <ul className="space-y-2 list-none">
                                {data.achievements.map((ach, i) => (
                                    <li key={i} className="text-[9pt] text-slate-600 leading-snug font-medium italic border-l border-slate-100 pl-3">
                                        {ach}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Certifications */}
                    {data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-[9pt] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-1 mb-3">Certification</h2>
                            <ul className="space-y-2 text-[9pt] text-slate-600 font-medium border-l border-slate-100 pl-3 leading-tight list-none">
                                {data.certifications.map((cert, i) => (
                                    <li key={i}>{cert}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};
