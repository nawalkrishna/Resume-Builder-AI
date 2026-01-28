import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-800 p-8 font-sans leading-relaxed w-[794px] mx-auto min-h-[1123px]">
            {/* Header - Modern slate accent */}
            <header className="mb-8">
                <div className="flex items-end justify-between border-b-2 border-slate-900 pb-6">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">{data.header.name}</h1>
                        <p className="text-slate-500 font-bold mt-1 uppercase tracking-widest text-xs">{data.header.location}</p>
                    </div>
                    <div className="text-right text-xs text-slate-500 space-y-1 font-bold">
                        <p>{data.header.phone}</p>
                        <p>{data.header.email}</p>
                        <div className="flex flex-wrap gap-4 justify-end mt-2 uppercase">
                            {data.header.linkedin && <a href={data.header.linkedin} className="text-primary hover:underline">LinkedIn</a>}
                            {data.header.github && <a href={data.header.github} className="text-primary hover:underline">GitHub</a>}
                            {data.header.leetcode && <a href={data.header.leetcode} className="text-primary hover:underline">LeetCode</a>}
                            {data.header.portfolio && <a href={data.header.portfolio} className="text-primary hover:underline">Portfolio</a>}
                            {data.header.customLinks?.map((link, i) => (
                                <a key={i} href={link.url} className="text-primary hover:underline">{link.name}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* Experience */}
            {data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Professional Experience</h2>
                    {data.experience.map((exp, i) => (
                        <div key={i} className="mb-6 last:mb-0">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-extrabold text-slate-900">{exp.role}</h3>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{exp.duration}</span>
                            </div>
                            <p className="text-primary text-xs font-black uppercase tracking-wide mt-0.5">{exp.organization}</p>
                            <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                                {exp.bullets.map((bullet, j) => (
                                    <li key={j} className="flex items-start gap-3">
                                        <span className="text-slate-300 mt-1.5">•</span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Layout Split for small sections */}
            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-12 space-y-6">
                    {/* Education */}
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Education</h2>
                        {data.education.map((edu, i) => (
                            <div key={i} className="flex justify-between items-baseline bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                                <div>
                                    <h3 className="font-extrabold text-slate-900">{edu.degree}</h3>
                                    <p className="text-xs text-slate-500 font-bold uppercase mt-1">{edu.institution} {edu.cgpa && `• ${edu.cgpa}`}</p>
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{edu.duration}</span>
                            </div>
                        ))}
                    </section>

                    {/* Projects */}
                    {data.projects.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Projects</h2>
                            <div className="space-y-4">
                                {data.projects.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-extrabold text-slate-900">{proj.name}</h3>
                                            {proj.link && <a href={proj.link} className="text-primary text-xs font-bold">View →</a>}
                                        </div>
                                        <p className="text-xs text-slate-400 font-bold uppercase mt-1">{proj.techStack}</p>
                                        <ul className="mt-2 space-y-1 text-sm text-slate-600">
                                            {proj.bullets.map((bullet, j) => (
                                                <li key={j} className="flex items-start gap-3">
                                                    <span className="text-slate-300 mt-1.5">•</span>
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
                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Technical Skills</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {(data.skills.categories || []).map((cat, i) => (
                                    cat.skills && (
                                        <div key={i} className="text-sm">
                                            <span className="font-bold text-slate-800">{cat.category}:</span>{" "}
                                            <span className="text-slate-600">{cat.skills}</span>
                                        </div>
                                    )
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Achievements & Certifications */}
                    <div className="grid grid-cols-2 gap-8">
                        {data.achievements.length > 0 && (
                            <section>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Achievements</h2>
                                <ul className="text-sm text-slate-600 space-y-1">
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
                                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Certifications</h2>
                                <ul className="text-sm text-slate-600 space-y-1">
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
