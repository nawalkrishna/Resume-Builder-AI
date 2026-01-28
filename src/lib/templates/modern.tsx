import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-800 p-[25mm] font-sans leading-normal w-[210mm] mx-auto min-h-[297mm] flex flex-col shadow-none print:shadow-none">
            {/* Header - Modern slate accent */}
            <header className="mb-6">
                <div className="flex items-end justify-between border-b-2 border-slate-900 pb-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-none">{data.header.name}</h1>
                        <p className="text-slate-500 font-bold mt-2 uppercase tracking-[0.2em] text-[10pt]">{data.header.location}</p>
                    </div>
                    <div className="text-right text-[9pt] text-slate-500 space-y-1 font-bold">
                        <p>{data.header.phone}</p>
                        <p>{data.header.email}</p>
                        <div className="flex flex-wrap gap-4 justify-end mt-2 uppercase tracking-tighter">
                            {data.header.linkedin && <a href={data.header.linkedin} className="text-primary hover:underline transition-all">LinkedIn</a>}
                            {data.header.github && <a href={data.header.github} className="text-primary hover:underline transition-all">GitHub</a>}
                            {data.header.leetcode && <a href={data.header.leetcode} className="text-primary hover:underline transition-all">LeetCode</a>}
                            {data.header.portfolio && <a href={data.header.portfolio} className="text-primary hover:underline transition-all">Portfolio</a>}
                            {data.header.customLinks?.map((link, i) => (
                                <a key={i} href={link.url} className="text-primary hover:underline">{link.name}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            <div className="space-y-6 flex-1">
                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 border-l-4 border-slate-100 pl-4">Professional Experience</h2>
                        <div className="space-y-8">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[12pt] font-extrabold text-slate-900 uppercase tracking-tight">{exp.role}</h3>
                                        <span className="text-[10pt] font-black text-slate-400 uppercase tracking-wider">{exp.duration}</span>
                                    </div>
                                    <p className="text-primary text-[10.5pt] font-black uppercase tracking-wide mb-3">{exp.organization}</p>
                                    <ul className="space-y-2 text-[10.5pt] text-slate-600 font-medium leading-relaxed">
                                        {exp.bullets.map((bullet, j) => (
                                            <li key={j} className="flex items-start gap-4">
                                                <span className="text-slate-300 mt-2 text-[8pt]">•</span>
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
                    <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 border-l-4 border-slate-100 pl-4">Education</h2>
                    <div className="space-y-4">
                        {data.education.map((edu, i) => (
                            <div key={i} className="flex justify-between items-baseline bg-slate-50/50 p-4 rounded-xl border border-slate-100/60">
                                <div>
                                    <h3 className="text-[11pt] font-extrabold text-slate-900 uppercase tracking-tight">{edu.degree}</h3>
                                    <p className="text-[10pt] text-slate-500 font-bold uppercase mt-1.5">{edu.institution} {edu.cgpa && <span className="text-emerald-600 ml-2">• GPA {edu.cgpa}</span>}</p>
                                </div>
                                <span className="text-[10pt] font-black text-slate-400 uppercase tracking-wider">{edu.duration}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                {data.projects.length > 0 && (
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 border-l-4 border-slate-100 pl-4">Projects</h2>
                        <div className="space-y-6">
                            {data.projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[11pt] font-extrabold text-slate-900 uppercase tracking-tight">{proj.name}</h3>
                                        {proj.link && <a href={proj.link} className="text-primary text-[9pt] font-black uppercase border-b-2 border-primary/20 hover:border-primary transition-all">View Project →</a>}
                                    </div>
                                    <p className="text-[9.5pt] text-slate-500 font-bold uppercase tracking-wide mb-2">{proj.techStack}</p>
                                    <ul className="space-y-1 text-[9.5pt] text-slate-600 font-medium leading-relaxed">
                                        {proj.bullets.map((bullet, j) => (
                                            <li key={j} className="flex items-start gap-4">
                                                <span className="text-slate-300 mt-2 text-[8pt]">•</span>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills Grid */}
                {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 border-l-4 border-slate-100 pl-4">Expertise</h2>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            {(data.skills.categories || []).map((cat, i) => (
                                cat.skills && (
                                    <div key={i}>
                                        <h4 className="text-[9.5pt] font-black text-slate-500 uppercase tracking-widest mb-1.5">{cat.category}</h4>
                                        <p className="text-[10.5pt] text-slate-700 font-medium leading-snug">{cat.skills}</p>
                                    </div>
                                )
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements */}
                {data.achievements.length > 0 && (
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 border-l-4 border-slate-100 pl-4">Achievements</h2>
                        <ul className="space-y-1 text-[9.5pt] text-slate-600 font-medium leading-relaxed">
                            {data.achievements.map((ach, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <span className="text-slate-300 mt-2 text-[8pt]">•</span>
                                    <span>{ach}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Certifications */}
                {data.certifications.length > 0 && (
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 border-l-4 border-slate-100 pl-4">Certifications</h2>
                        <ul className="space-y-1 text-[9.5pt] text-slate-600 font-medium leading-relaxed">
                            {data.certifications.map((cert, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <span className="text-slate-300 mt-2 text-[8pt]">•</span>
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
