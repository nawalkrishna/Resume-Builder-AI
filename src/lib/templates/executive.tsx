import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const ExecutiveTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-800 w-[210mm] mx-auto min-h-[297mm] flex flex-col shadow-none print:shadow-none font-sans">
            {/* Header - Executive Banner */}
            <header className="bg-slate-900 text-white px-[25mm] py-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/20 rounded-full -mr-32 -mt-32 blur-3xl" />
                <h1 className="text-3xl font-light tracking-wide mb-3 relative z-10">{data.header.name}</h1>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-[9.5pt] text-slate-300 relative z-10 font-medium">
                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />{data.header.email}</span>
                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />{data.header.phone}</span>
                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />{data.header.location}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-[9pt] relative z-10 font-bold uppercase tracking-[0.2em]">
                    {data.header.linkedin && <a href={data.header.linkedin} className="text-slate-400 hover:text-white transition-colors border-b border-slate-700 pb-1">LinkedIn</a>}
                    {data.header.github && <a href={data.header.github} className="text-slate-400 hover:text-white transition-colors border-b border-slate-700 pb-1">GitHub</a>}
                    {data.header.leetcode && <a href={data.header.leetcode} className="text-slate-400 hover:text-white transition-colors border-b border-slate-700 pb-1">LeetCode</a>}
                    {data.header.portfolio && <a href={data.header.portfolio} className="text-slate-400 hover:text-white transition-colors border-b border-slate-700 pb-1">Portfolio</a>}
                    {data.header.customLinks?.map((link, i) => (
                        <a key={i} href={link.url} className="text-slate-400 hover:text-white transition-colors border-b border-slate-700 pb-1">{link.name}</a>
                    ))}
                </div>
            </header>

            <div className="px-[25mm] py-6 space-y-6">
                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.3em] text-slate-400 border-b-2 border-slate-100 pb-2 mb-4">
                            Experience
                        </h2>
                        <div className="space-y-6">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[12pt] font-bold text-slate-900 tracking-tight uppercase">{exp.role}</h3>
                                        <span className="text-[9pt] text-slate-400 font-black uppercase tracking-widest">{exp.duration}</span>
                                    </div>
                                    <p className="text-primary text-[10pt] font-black uppercase tracking-widest mb-2">{exp.organization}</p>
                                    <ul className="space-y-1.5 text-[9.5pt] text-slate-600 leading-[1.6] font-medium">
                                        {exp.bullets.map((bullet, j) => (
                                            <li key={j} className="flex items-start gap-4">
                                                <span className="text-slate-300 mt-2.5 w-4 h-[2px] bg-slate-200 shrink-0" />
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
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.3em] text-slate-400 border-b-2 border-slate-100 pb-2 mb-4">
                            Projects
                        </h2>
                        <div className="space-y-6">
                            {data.projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[12pt] font-bold text-slate-900 tracking-tight uppercase">{proj.name}</h3>
                                        {proj.link && <a href={proj.link} className="text-[9pt] text-primary font-black uppercase tracking-widest border-b-2 border-primary/20 hover:border-primary transition-all">Review →</a>}
                                    </div>
                                    <p className="text-slate-400 text-[10pt] font-bold uppercase tracking-widest mb-2 italic">{proj.techStack}</p>
                                    <ul className="space-y-1.5 text-[9.5pt] text-slate-600 leading-[1.6] font-medium">
                                        {proj.bullets.map((bullet, j) => (
                                            <li key={j} className="flex items-start gap-4">
                                                <span className="text-slate-300 mt-2.5 w-4 h-[2px] bg-slate-200 shrink-0" />
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Two Column Layout */}
                <div className="grid grid-cols-2 gap-8">
                    {/* Left */}
                    <div className="space-y-6">
                        {/* Education */}
                        <section>
                            <h2 className="text-[10pt] font-black uppercase tracking-[0.3em] text-slate-400 border-b-2 border-slate-100 pb-2 mb-4">
                                Education
                            </h2>
                            <div className="space-y-4">
                                {data.education.map((edu, i) => (
                                    <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <h3 className="text-[11pt] font-bold text-slate-900 uppercase tracking-tight mb-1">{edu.degree}</h3>
                                        <p className="text-[10pt] text-slate-500 font-bold uppercase tracking-tight">{edu.institution}</p>
                                        <div className="mt-2 flex justify-between items-center text-[9pt] font-black uppercase tracking-widest text-slate-400">
                                            <span>{edu.duration}</span>
                                            {edu.cgpa && <span className="text-slate-300 bg-white px-2 py-0.5 rounded-lg border border-slate-100">GPA {edu.cgpa}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Certifications */}
                        {data.certifications.length > 0 && (
                            <section>
                                <h2 className="text-[11pt] font-black uppercase tracking-[0.4em] text-slate-400 border-b-2 border-slate-100 pb-3 mb-6">
                                    Certifications
                                </h2>
                                <ul className="space-y-3 text-[10.5pt] text-slate-600 font-medium">
                                    {data.certifications.map((cert, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            {cert}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>

                    {/* Right */}
                    <div className="space-y-6">
                        {/* Skills */}
                        {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                            <section>
                                <h2 className="text-[10pt] font-black uppercase tracking-[0.3em] text-slate-400 border-b-2 border-slate-100 pb-2 mb-4">
                                    Expertise
                                </h2>
                                <div className="space-y-4">
                                    {(data.skills.categories || []).map((cat, i) => (
                                        cat.skills && (
                                            <div key={i}>
                                                <p className="font-black text-slate-900 text-[9pt] uppercase tracking-widest mb-1 flex items-center gap-2">
                                                    <span className="w-3 h-[2px] bg-primary" />
                                                    {cat.category}
                                                </p>
                                                <p className="text-[9.5pt] text-slate-500 leading-relaxed font-medium pl-5">{cat.skills}</p>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Achievements */}
                        {data.achievements.length > 0 && (
                            <section>
                                <h2 className="text-[10pt] font-black uppercase tracking-[0.3em] text-slate-400 border-b-2 border-slate-100 pb-2 mb-4">
                                    Achievements
                                </h2>
                                <ul className="space-y-2 text-[9.5pt] text-slate-600 font-medium italic">
                                    {data.achievements.map((ach, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-primary font-black mt-[-4px]">“</span>
                                            <span>{ach}</span>
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
