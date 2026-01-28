import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const TechTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-800 p-8 font-mono w-[794px] mx-auto min-h-[1123px] flex flex-col gap-6">
            {/* Header - Terminal Style but clean */}
            <header className="border-2 border-slate-900 rounded-2xl p-6 bg-slate-50 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                    <span className="text-slate-400 text-[10px] ml-2 font-bold uppercase tracking-tighter">/resume/root</span>
                </div>
                <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter uppercase">{data.header.name}</h1>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-[10px] text-slate-500 font-bold uppercase tracking-wide">
                    <div>Location: {data.header.location}</div>
                    <div>Email: {data.header.email}</div>
                    <div>Phone: {data.header.phone}</div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2 lowercase">
                        {data.header.github && <a href={data.header.github} className="text-primary hover:underline">github</a>}
                        {data.header.linkedin && <a href={data.header.linkedin} className="text-primary hover:underline">linkedin</a>}
                        {data.header.leetcode && <a href={data.header.leetcode} className="text-primary hover:underline">leetcode</a>}
                        {data.header.portfolio && <a href={data.header.portfolio} className="text-primary hover:underline">portfolio</a>}
                        {data.header.customLinks?.map((link, i) => (
                            <a key={i} href={link.url} className="text-primary hover:underline">{link.name.toLowerCase()}</a>
                        ))}
                    </div>
                </div>
            </header>

            {/* Skills - Tagged */}
            <section>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-4 border-b border-block pb-1 inline-block">Technical Stack</h2>
                <div className="flex flex-wrap gap-2">
                    {(data.skills.categories || []).map((cat, i) => (
                        <div key={i} className="px-3 py-1.5 bg-slate-100/50 rounded-lg border border-slate-200 text-[10px] font-black uppercase text-slate-600">
                            {cat.category}: {cat.skills}
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience */}
            {data.experience.length > 0 && (
                <section>
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-4 border-b border-block pb-1 inline-block">Experience</h2>
                    {data.experience.map((exp, i) => (
                        <div key={i} className="mb-6 relative pl-6 border-l-2 border-slate-100">
                            <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-primary" />
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="text-slate-900 font-black tracking-tight">{exp.role}</span>
                                <span className="text-slate-400 text-[10px] font-bold uppercase">{exp.duration}</span>
                            </div>
                            <p className="text-primary text-[10px] font-black uppercase mb-3 tracking-widest">{exp.organization}</p>
                            <ul className="space-y-1.5 text-xs text-slate-600 font-medium leading-relaxed">
                                {exp.bullets.map((bullet, j) => (
                                    <li key={j} className="flex items-start gap-2">
                                        <span className="text-primary">|</span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            <section>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-4 border-b border-block pb-1 inline-block">Foundation</h2>
                {data.education.map((edu, i) => (
                    <div key={i} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div>
                            <span className="text-slate-900 font-black">{edu.degree}</span>
                            <span className="text-slate-300 mx-2">/</span>
                            <span className="text-slate-500 font-bold uppercase text-[10px]">{edu.institution}</span>
                        </div>
                        <span className="text-slate-400 font-black text-[10px] uppercase">{edu.duration}</span>
                    </div>
                ))}
            </section>

            {/* Projects */}
            {data.projects.length > 0 && (
                <section>
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-4 border-b border-block pb-1 inline-block">Projects</h2>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="mb-6 relative pl-6 border-l-2 border-slate-100">
                            <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-primary" />
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="text-slate-900 font-black tracking-tight">{proj.name}</span>
                                {proj.link && <a href={proj.link} className="text-primary text-[10px] font-bold uppercase">repo →</a>}
                            </div>
                            <p className="text-primary text-[10px] font-black uppercase mb-3 tracking-widest">{proj.techStack}</p>
                            <ul className="space-y-1.5 text-xs text-slate-600 font-medium leading-relaxed">
                                {proj.bullets.map((bullet, j) => (
                                    <li key={j} className="flex items-start gap-2">
                                        <span className="text-primary">|</span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Achievements & Certifications */}
            <div className="grid grid-cols-2 gap-6">
                {data.achievements.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-4 border-b border-block pb-1 inline-block">Achievements</h2>
                        <ul className="space-y-2 text-xs text-slate-600 font-medium">
                            {data.achievements.map((ach, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-primary">&gt;</span>
                                    <span>{ach}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
                {data.certifications.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-4 border-b border-block pb-1 inline-block">Certifications</h2>
                        <ul className="space-y-2 text-xs text-slate-600 font-medium">
                            {data.certifications.map((cert, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-primary">[✓]</span>
                                    <span>{cert}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
};
