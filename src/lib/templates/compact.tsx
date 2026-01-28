import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const CompactTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-800 p-[25mm] font-sans text-[10pt] leading-[1.5] w-[210mm] mx-auto min-h-[297mm] flex flex-col shadow-none print:shadow-none">
            {/* Header - Minimalist & Space Saving */}
            <header className="flex justify-between items-start border-b-[1.5pt] border-slate-900 pb-4 mb-6">
                <div className="flex-1">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-tight">{data.header.name}</h1>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[9pt] text-slate-500 font-bold uppercase tracking-wide">
                        <span>{data.header.location}</span>
                        <span className="text-slate-300">•</span>
                        <span>{data.header.phone}</span>
                        <span className="text-slate-300">•</span>
                        <span>{data.header.email}</span>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1 text-[8.5pt] font-black text-primary uppercase tracking-tight">
                    {data.header.linkedin && <a href={data.header.linkedin} className="hover:underline">LinkedIn</a>}
                    {data.header.github && <a href={data.header.github} className="hover:underline">GitHub</a>}
                    {data.header.leetcode && <a href={data.header.leetcode} className="hover:underline">LeetCode</a>}
                    {data.header.portfolio && <a href={data.header.portfolio} className="hover:underline">Portfolio</a>}
                    {data.header.customLinks?.map((link, i) => (
                        <a key={i} href={link.url} className="hover:underline">{link.name}</a>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8 flex-1">
                {/* Main Column (65%) - Increased width for resume feel */}
                <div className="col-span-8 space-y-6">
                    {/* Experience */}
                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 mb-4 pb-1">Professional Experience</h2>
                            <div className="space-y-4">
                                {data.experience.map((exp, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-slate-900 text-[11pt]">{exp.role} <span className="text-slate-400 font-normal mx-1">@</span> {exp.organization}</h3>
                                            <span className="text-slate-500 font-bold text-[9pt] italic">{exp.duration}</span>
                                        </div>
                                        <ul className="ml-4 space-y-1">
                                            {exp.bullets.map((bullet, j) => (
                                                <li key={j} className="text-slate-700 list-disc list-outside marker:text-slate-300 pl-2">{bullet}</li>
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
                            <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 mb-4 pb-1">Key Projects</h2>
                            <div className="space-y-4">
                                {data.projects.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-slate-900 text-[11pt]">{proj.name} <span className="text-slate-400 font-normal mx-1">—</span> <span className="text-slate-500 font-medium text-[9.5pt] italic">{proj.techStack}</span></h3>
                                            {proj.link && <a href={proj.link} className="text-primary text-[8.5pt] font-bold uppercase hover:underline">View Project →</a>}
                                        </div>
                                        <ul className="ml-4 space-y-1">
                                            {proj.bullets.map((bullet, j) => (
                                                <li key={j} className="text-slate-700 list-disc list-outside marker:text-slate-300 pl-2">{bullet}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar (35%) */}
                <div className="col-span-4 space-y-6 border-l border-slate-50 pl-8">
                    {/* Education */}
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Education</h2>
                        {data.education.map((edu, i) => (
                            <div key={i} className="mb-4">
                                <div className="font-bold text-slate-900 text-[10pt] leading-tight">{edu.institution}</div>
                                <div className="text-[9.5pt] text-slate-600 mt-1">{edu.degree}</div>
                                <div className="text-[8.5pt] font-bold text-slate-400 uppercase tracking-tighter mt-1">{edu.duration}</div>
                                {edu.cgpa && <div className="text-[9pt] text-emerald-600 font-bold mt-1">GPA: {edu.cgpa}</div>}
                            </div>
                        ))}
                    </section>

                    {/* Skills */}
                    {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                        <section>
                            <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Expertise</h2>
                            <div className="space-y-3">
                                {(data.skills.categories || []).map((cat, i) => (
                                    cat.skills && (
                                        <div key={i}>
                                            <div className="text-[8.5pt] font-black uppercase tracking-wider text-slate-400 mb-1">{cat.category}</div>
                                            <div className="text-[10pt] text-slate-600 leading-tight">{cat.skills}</div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Achievements */}
                    {data.achievements.length > 0 && (
                        <section>
                            <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Honors</h2>
                            <ul className="space-y-2">
                                {data.achievements.map((ach, i) => (
                                    <li key={i} className="text-[9.5pt] text-slate-600 leading-snug flex gap-2">
                                        <span className="text-slate-300 font-black">•</span>
                                        {ach}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Certifications */}
                    {data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Certifications</h2>
                            <ul className="space-y-2">
                                {data.certifications.map((cert, i) => (
                                    <li key={i} className="text-[9.5pt] text-slate-600 leading-snug flex gap-2">
                                        <span className="text-slate-300 font-black">•</span>
                                        {cert}
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
