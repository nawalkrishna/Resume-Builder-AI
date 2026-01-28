import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const BoldTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-800 w-[210mm] mx-auto min-h-[297mm] flex flex-col shadow-none print:shadow-none font-sans">
            {/* Header - Bold Slate Accent */}
            <header className="bg-slate-900 text-white px-[25mm] py-12">
                <h1 className="text-5xl font-black uppercase tracking-tight leading-none mb-6">{data.header.name}</h1>
                <div className="flex flex-wrap gap-x-8 gap-y-2 text-[10pt] font-black uppercase tracking-[0.2em] text-slate-400">
                    <span className="flex items-center gap-2">{data.header.email}</span>
                    <span className="flex items-center gap-2">{data.header.phone}</span>
                    <span className="flex items-center gap-2">{data.header.location}</span>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-[9.5pt] font-black uppercase tracking-[0.25em] mt-6">
                    {data.header.linkedin && <a href={data.header.linkedin} className="text-white hover:text-primary transition-colors">LinkedIn</a>}
                    {data.header.github && <a href={data.header.github} className="text-white hover:text-primary transition-colors">GitHub</a>}
                    {data.header.leetcode && <a href={data.header.leetcode} className="text-white hover:text-primary transition-colors">LeetCode</a>}
                    {data.header.portfolio && <a href={data.header.portfolio} className="text-white hover:text-primary transition-colors">Portfolio</a>}
                    {data.header.customLinks?.map((link, i) => (
                        <a key={i} href={link.url} className="text-white hover:text-primary transition-colors">{link.name}</a>
                    ))}
                </div>
            </header>

            <div className="p-[25mm] space-y-12 flex-1">
                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-[11pt] font-black uppercase tracking-[0.3em] text-slate-900 border-b-[6px] border-slate-900 pb-2 mb-8 inline-block">
                            Professional Experience
                        </h2>
                        <div className="space-y-10">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">{exp.role}</h3>
                                        <span className="text-[9.5pt] font-black text-primary uppercase tracking-widest">{exp.duration}</span>
                                    </div>
                                    <p className="text-slate-500 font-black uppercase text-[10pt] tracking-widest mb-4">{exp.organization}</p>
                                    <ul className="space-y-2.5 text-[10.5pt] text-slate-600 font-medium leading-relaxed">
                                        {exp.bullets.map((bullet, j) => (
                                            <li key={j} className="flex items-start gap-4">
                                                <div className="w-2 h-2 rounded-full bg-slate-200 mt-2" />
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
                    <h2 className="text-[11pt] font-black uppercase tracking-[0.3em] text-slate-900 border-b-[6px] border-slate-900 pb-2 mb-8 inline-block">
                        Academic background
                    </h2>
                    <div className="grid grid-cols-2 gap-10">
                        {data.education.map((edu, i) => (
                            <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-black text-slate-900 uppercase text-[10.5pt] mb-2">{edu.degree}</h3>
                                    <p className="text-[9.5pt] text-slate-500 font-bold uppercase mb-4">{edu.institution}</p>
                                </div>
                                <div className="flex justify-between items-center mt-auto">
                                    <span className="text-[9pt] font-black text-primary uppercase tracking-widest">{edu.duration}</span>
                                    {edu.cgpa && <span className="text-[10pt] font-black text-emerald-600 uppercase tracking-tighter">GPA {edu.cgpa}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                {data.projects.length > 0 && (
                    <section>
                        <h2 className="text-[11pt] font-black uppercase tracking-[0.3em] text-slate-900 border-b-[6px] border-slate-900 pb-2 mb-8 inline-block">
                            Key Projects
                        </h2>
                        <div className="space-y-10">
                            {data.projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">{proj.name}</h3>
                                        {proj.link && <a href={proj.link} className="text-[9pt] font-black text-primary uppercase tracking-widest border-b-2 border-primary/20 hover:border-primary transition-all pb-0.5">View Project →</a>}
                                    </div>
                                    <p className="text-slate-500 font-black uppercase text-[10pt] tracking-widest mb-4">{proj.techStack}</p>
                                    <ul className="space-y-2.5 text-[10.5pt] text-slate-600 font-medium leading-relaxed">
                                        {proj.bullets.map((bullet, j) => (
                                            <li key={j} className="flex items-start gap-4">
                                                <div className="w-2 h-2 rounded-full bg-slate-200 mt-2" />
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
                        <h2 className="text-[11pt] font-black uppercase tracking-[0.3em] text-slate-900 border-b-[6px] border-slate-900 pb-2 mb-8 inline-block">
                            Expertise
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            {(data.skills.categories || []).map((cat, i) => (
                                (cat.skills || "").split(",").filter(s => s.trim()).map((skill, j) => (
                                    <span key={`${i}-${j}`} className="px-6 py-3 bg-slate-900 text-white text-[10pt] font-black uppercase tracking-wider rounded-2xl shadow-lg shadow-slate-200">
                                        {skill.trim()}
                                    </span>
                                ))
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};
