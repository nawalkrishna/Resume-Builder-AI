import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const CompactTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-900 p-6 font-sans text-[9pt] leading-[1.3] w-[794px] mx-auto min-h-[1123px] flex flex-col">
            {/* Header - Minimalist & Space Saving */}
            <header className="flex justify-between items-start border-b-[1.5pt] border-slate-900 pb-3 mb-4">
                <div className="flex-1">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-[0.8]">{data.header.name}</h1>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2 text-[8pt] text-slate-600 font-bold uppercase tracking-wider">
                        <span>{data.header.location}</span>
                        <span className="text-slate-300">|</span>
                        <span>{data.header.phone}</span>
                        <span className="text-slate-300">|</span>
                        <span>{data.header.email}</span>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-0.5 text-[8pt] font-black text-blue-600 uppercase tracking-tighter">
                    {data.header.linkedin && <a href={data.header.linkedin} className="hover:underline">LinkedIn</a>}
                    {data.header.github && <a href={data.header.github} className="hover:underline">GitHub</a>}
                    {data.header.leetcode && <a href={data.header.leetcode} className="hover:underline">LeetCode</a>}
                    {data.header.portfolio && <a href={data.header.portfolio} className="hover:underline">Portfolio</a>}
                    {data.header.customLinks?.map((link, i) => (
                        <a key={i} href={link.url} className="hover:underline">{link.name}</a>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-6 flex-1">
                {/* Main Column (80%) */}
                <div className="col-span-8 space-y-4">
                    {/* Experience */}
                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-[9pt] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 mb-2 pb-0.5">Experience</h2>
                            <div className="space-y-3">
                                {data.experience.map((exp, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-0.5">
                                            <h3 className="font-bold text-slate-900 text-[10pt]">{exp.role} <span className="text-slate-400 font-normal mx-1">@</span> {exp.organization}</h3>
                                            <span className="text-slate-500 font-bold text-[8pt] italic">{exp.duration}</span>
                                        </div>
                                        <ul className="ml-3.5 space-y-0.5">
                                            {exp.bullets.map((bullet, j) => (
                                                <li key={j} className="text-slate-700 list-disc list-outside marker:text-slate-300 pl-1">{bullet}</li>
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
                            <h2 className="text-[9pt] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 mb-2 pb-0.5">Projects</h2>
                            <div className="space-y-3">
                                {data.projects.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-0.5">
                                            <h3 className="font-bold text-slate-900 text-[10pt]">{proj.name} <span className="text-slate-400 font-normal mx-1">—</span> <span className="text-slate-500 font-medium text-[8.5pt] italic">{proj.techStack}</span></h3>
                                            {proj.link && <a href={proj.link} className="text-blue-600 text-[8pt] font-bold uppercase hover:underline">Link →</a>}
                                        </div>
                                        <ul className="ml-3.5 space-y-0.5">
                                            {proj.bullets.map((bullet, j) => (
                                                <li key={j} className="text-slate-700 list-disc list-outside marker:text-slate-300 pl-1">{bullet}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar (20%) */}
                <div className="col-span-4 space-y-5 border-l border-slate-50 pl-6">
                    {/* Education */}
                    <section>
                        <h2 className="text-[9pt] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Education</h2>
                        {data.education.map((edu, i) => (
                            <div key={i} className="mb-3">
                                <div className="font-bold text-slate-900 leading-tight">{edu.institution}</div>
                                <div className="text-[8.5pt] text-slate-600 mt-0.5">{edu.degree}</div>
                                <div className="text-[8pt] font-bold text-slate-400 uppercase tracking-tighter mt-1">{edu.duration}</div>
                                {edu.cgpa && <div className="text-[8.5pt] text-emerald-600 font-bold mt-0.5">GPA: {edu.cgpa}</div>}
                            </div>
                        ))}
                    </section>

                    {/* Skills */}
                    {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                        <section>
                            <h2 className="text-[9pt] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Expertise</h2>
                            <div className="space-y-2.5">
                                {(data.skills.categories || []).map((cat, i) => (
                                    cat.skills && (
                                        <div key={i}>
                                            <div className="text-[8pt] font-black uppercase tracking-wider text-slate-400 mb-0.5">{cat.category}</div>
                                            <div className="text-[9pt] text-slate-600 leading-tight">{cat.skills}</div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Achievements */}
                    {data.achievements.length > 0 && (
                        <section>
                            <h2 className="text-[9pt] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Honors</h2>
                            <ul className="space-y-1.5">
                                {data.achievements.map((ach, i) => (
                                    <li key={i} className="text-[8.5pt] text-slate-600 leading-tight flex gap-2">
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
                            <h2 className="text-[9pt] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Notice</h2>
                            <ul className="space-y-1.5">
                                {data.certifications.map((cert, i) => (
                                    <li key={i} className="text-[8.5pt] text-slate-600 leading-tight flex gap-2">
                                        <span className="text-slate-300 font-black">✓</span>
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
