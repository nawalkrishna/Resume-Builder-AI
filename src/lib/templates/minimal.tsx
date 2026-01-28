import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const MinimalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-700 p-[25mm] font-sans leading-[1.6] w-[210mm] mx-auto min-h-[297mm] flex flex-col shadow-none print:shadow-none">
            {/* Header - Ultra minimal */}
            <header className="mb-12 border-b border-slate-100 pb-10">
                <h1 className="text-5xl font-light text-slate-900 tracking-tight mb-4">{data.header.name}</h1>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10.5pt] text-slate-500 font-medium">
                    <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-slate-300" />{data.header.email}</span>
                    <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-slate-300" />{data.header.phone}</span>
                    <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-slate-300" />{data.header.location}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[10pt] text-slate-400 font-bold uppercase tracking-widest">
                    {data.header.linkedin && <a href={data.header.linkedin} className="hover:text-primary transition-colors">LinkedIn</a>}
                    {data.header.github && <a href={data.header.github} className="hover:text-primary transition-colors">GitHub</a>}
                    {data.header.leetcode && <a href={data.header.leetcode} className="hover:text-primary transition-colors">LeetCode</a>}
                    {data.header.portfolio && <a href={data.header.portfolio} className="hover:text-primary transition-colors">Portfolio</a>}
                    {data.header.customLinks?.map((link, i) => (
                        <a key={i} href={link.url} className="hover:text-primary transition-colors">{link.name}</a>
                    ))}
                </div>
            </header>

            <div className="space-y-12 flex-1">
                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-[9pt] font-black uppercase tracking-[0.4em] text-slate-300 mb-8 border-l-2 border-slate-100 pl-4">Experience</h2>
                        <div className="space-y-10">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-[12pt] font-semibold text-slate-900 tracking-tight">{exp.role}</h3>
                                        <span className="text-[10pt] text-slate-400 font-medium">{exp.duration}</span>
                                    </div>
                                    <p className="text-[10.5pt] text-slate-500 font-bold mb-4 uppercase tracking-wide">{exp.organization}</p>
                                    <ul className="space-y-2.5 text-[10.5pt] text-slate-600 font-normal leading-relaxed">
                                        {exp.bullets.map((bullet, j) => (
                                            <li key={j} className="flex items-start gap-4">
                                                <span className="text-slate-200 mt-2.5 w-1 h-1 rounded-full bg-slate-300 shrink-0" />
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
                    <h2 className="text-[9pt] font-black uppercase tracking-[0.4em] text-slate-300 mb-8 border-l-2 border-slate-100 pl-4">Education</h2>
                    <div className="space-y-6">
                        {data.education.map((edu, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-[11.5pt] font-semibold text-slate-900 tracking-tight">{edu.degree}</h3>
                                    <span className="text-[10pt] text-slate-400 font-medium">{edu.duration}</span>
                                </div>
                                <p className="text-[10.5pt] text-slate-500 font-medium italic">{edu.institution} {edu.cgpa && <span className="text-slate-300 not-italic mx-2">|</span>} {edu.cgpa && <span className="not-italic font-bold text-slate-400">GPA {edu.cgpa}</span>}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                {data.projects.length > 0 && (
                    <section>
                        <h2 className="text-[9pt] font-black uppercase tracking-[0.4em] text-slate-300 mb-8 border-l-2 border-slate-100 pl-4">Projects</h2>
                        <div className="space-y-8">
                            {data.projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[12pt] font-semibold text-slate-900 tracking-tight">{proj.name}</h3>
                                        {proj.link && <a href={proj.link} className="text-[9pt] text-slate-400 hover:text-primary transition-colors flex items-center gap-1 font-bold italic underline underline-offset-4 decoration-slate-100">View Project →</a>}
                                    </div>
                                    <p className="text-[10pt] text-slate-400 font-bold uppercase tracking-widest mb-3">{proj.techStack}</p>
                                    <ul className="space-y-2 text-[10.5pt] text-slate-600 font-normal leading-relaxed">
                                        {proj.bullets.map((bullet, j) => (
                                            <li key={j} className="flex items-start gap-4 text-slate-600">
                                                <span className="text-slate-200 mt-2.5 w-1 h-1 rounded-full bg-slate-300 shrink-0" />
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
                        <h2 className="text-[9pt] font-black uppercase tracking-[0.4em] text-slate-300 mb-6 border-l-2 border-slate-100 pl-4">Capabilities</h2>
                        <div className="text-[11pt] text-slate-600 font-medium leading-relaxed bg-slate-50/50 p-8 rounded-3xl border border-slate-100/50">
                            {data.skills.categories.filter(cat => cat.skills).map((cat, i, arr) => (
                                <div key={i} className="mb-2 last:mb-0">
                                    <span className="font-black text-slate-400 uppercase text-[9pt] tracking-widest mr-4">{cat.category}:</span>
                                    <span>{cat.skills}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};
