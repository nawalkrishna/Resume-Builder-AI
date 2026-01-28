import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const ElegantTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-800 p-12 font-serif w-[794px] mx-auto min-h-[1123px] flex flex-col gap-10">
            {/* Header - Truly Elegant */}
            <header className="text-center space-y-4">
                <h1 className="text-4xl font-light text-slate-900 tracking-[0.1em] uppercase">{data.header.name}</h1>
                <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-[10px] items-center font-bold uppercase tracking-widest text-slate-400">
                    <span>{data.header.location}</span>
                    <span className="text-slate-200">|</span>
                    {data.header.linkedin && <><a href={data.header.linkedin} className="hover:text-slate-900">LinkedIn</a><span className="text-slate-200">|</span></>}
                    {data.header.github && <><a href={data.header.github} className="hover:text-slate-900">GitHub</a><span className="text-slate-200">|</span></>}
                    {data.header.email}
                    <span className="text-slate-200">|</span>
                    {data.header.phone}
                </div>
                {data.header.portfolio || data.header.leetcode || (data.header.customLinks && data.header.customLinks.length > 0) ? (
                    <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-2">
                        {data.header.leetcode && <a href={data.header.leetcode} className="hover:text-slate-900">LeetCode</a>}
                        {data.header.portfolio && <a href={data.header.portfolio} className="hover:text-slate-900">Portfolio</a>}
                        {data.header.customLinks?.map((link, i) => (
                            <a key={i} href={link.url} className="hover:text-slate-900">{link.name}</a>
                        ))}
                    </div>
                ) : null}
                <div className="w-24 h-px bg-slate-900 mx-auto mt-6" />
            </header>

            {/* Main Content */}
            <div className="space-y-10">
                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 mb-8 text-center">Experience</h2>
                        <div className="space-y-8">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex justify-between items-end border-b border-slate-100 pb-2">
                                        <div>
                                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">{exp.role}</h3>
                                            <p className="text-xs text-primary font-bold italic mt-0.5">{exp.organization}</p>
                                        </div>
                                        <span className="text-[9px] font-black text-slate-400 uppercase">{exp.duration}</span>
                                    </div>
                                    <ul className="list-disc list-outside ml-4 space-y-1.5 text-[11px] text-slate-600 leading-relaxed font-sans">
                                        {exp.bullets.map((bullet, j) => <li key={j}>{bullet}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                <section>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 mb-8 text-center">Education</h2>
                    <div className="space-y-6">
                        {data.education.map((edu, i) => (
                            <div key={i} className="flex justify-between items-center text-center">
                                <div className="flex-1 text-right pr-6">
                                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight">{edu.degree}</h3>
                                </div>
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-200 flex-shrink-0" />
                                <div className="flex-1 text-left pl-6">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase">{edu.institution}</p>
                                    <p className="text-[9px] text-slate-400 font-black mt-1 uppercase tracking-widest">{edu.duration}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                {data.projects.length > 0 && (
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 mb-8 text-center">Projects</h2>
                        <div className="space-y-6">
                            {data.projects.map((proj, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex justify-between items-end border-b border-slate-100 pb-2">
                                        <div>
                                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">{proj.name}</h3>
                                            <p className="text-xs text-primary font-bold italic mt-0.5">{proj.techStack}</p>
                                        </div>
                                        {proj.link && <a href={proj.link} className="text-[9px] font-black text-primary uppercase">View →</a>}
                                    </div>
                                    <ul className="list-disc list-outside ml-4 space-y-1.5 text-[11px] text-slate-600 leading-relaxed font-sans">
                                        {proj.bullets.map((bullet, j) => <li key={j}>{bullet}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 mb-8 text-center">Skills</h2>
                        <div className="flex flex-wrap justify-center gap-2">
                            {(data.skills.categories || []).map((cat, i) => (
                                (cat.skills || "").split(",").filter(s => s.trim()).map((skill, j) => (
                                    <span key={`${i}-${j}`} className="px-4 py-1.5 border border-slate-200 text-slate-600 text-[9px] font-bold uppercase tracking-wide rounded-full">
                                        {skill.trim()}
                                    </span>
                                ))
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements & Certifications */}
                <div className="grid grid-cols-2 gap-10">
                    {data.achievements.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 mb-6 text-center">Achievements</h2>
                            <ul className="space-y-2 text-[11px] text-slate-600 leading-relaxed font-sans">
                                {data.achievements.map((ach, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-primary">◆</span>
                                        <span>{ach}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                    {data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 mb-6 text-center">Certifications</h2>
                            <ul className="space-y-2 text-[11px] text-slate-600 leading-relaxed font-sans">
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
    );
};
