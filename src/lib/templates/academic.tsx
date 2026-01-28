import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const AcademicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-gray-900 p-[25mm] font-serif w-[210mm] mx-auto min-h-[297mm] shadow-none print:shadow-none flex flex-col gap-10" style={{ fontFamily: "Georgia, serif" }}>
            {/* Header - Academic Style */}
            <header className="text-center mb-10 border-b-2 border-amber-700 pb-8">
                <h1 className="text-5xl font-bold text-amber-900 mb-6">{data.header.name}</h1>
                <div className="mt-4 text-[11.5pt] text-gray-700 flex justify-center flex-wrap gap-x-6 gap-y-2 items-center italic">
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-200" />{data.header.location}</span>
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-200" />{data.header.phone}</span>
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-200" />{data.header.email}</span>
                </div>
                <div className="mt-4 text-[10pt] text-amber-900 font-bold flex flex-wrap justify-center gap-x-8 gap-y-2 uppercase tracking-widest">
                    {data.header.linkedin && <a href={data.header.linkedin} className="hover:text-amber-600 transition-colors border-b border-amber-100 pb-0.5">LinkedIn</a>}
                    {data.header.github && <a href={data.header.github} className="hover:text-amber-600 transition-colors border-b border-amber-100 pb-0.5">GitHub</a>}
                    {data.header.leetcode && <a href={data.header.leetcode} className="hover:text-amber-600 transition-colors border-b border-amber-100 pb-0.5">LeetCode</a>}
                    {data.header.portfolio && <a href={data.header.portfolio} className="hover:text-amber-600 transition-colors border-b border-amber-100 pb-0.5">Portfolio</a>}
                    {data.header.customLinks?.map((link, i) => (
                        <a key={i} href={link.url} className="hover:text-amber-600 transition-colors border-b border-amber-100 pb-0.5">{link.name}</a>
                    ))}
                </div>
            </header>

            {/* Main Content */}
            <div className="space-y-12">
                {/* Education - Prominent for academics */}
                <section>
                    <h2 className="text-[14pt] font-black text-amber-900 border-b-2 border-amber-100 pb-2 mb-6 tracking-wide flex items-center gap-4">
                        EDUCATION
                        <div className="h-px bg-amber-50 flex-1" />
                    </h2>
                    <div className="space-y-8">
                        {data.education.map((edu, i) => (
                            <div key={i} className="group">
                                <div className="flex justify-between items-baseline mb-2">
                                    <span className="text-[13pt] font-bold text-slate-900">{edu.degree}</span>
                                    <span className="text-[11pt] text-slate-400 font-bold italic tracking-tight">{edu.duration}</span>
                                </div>
                                <div className="text-[12pt] text-amber-800 font-bold mb-2 group-hover:translate-x-1 transition-transform">{edu.institution}</div>
                                {edu.cgpa && <div className="text-[10pt] text-slate-500 font-bold bg-slate-50 inline-block px-3 py-1 rounded-md border border-slate-100">Cumulative GPA: {edu.cgpa}</div>}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Experience - Research/Teaching Focus */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-[14pt] font-black text-amber-900 border-b-2 border-amber-100 pb-2 mb-6 tracking-wide flex items-center gap-4">
                            RESEARCH & PROFESSIONAL EXPERIENCE
                            <div className="h-px bg-amber-50 flex-1" />
                        </h2>
                        <div className="space-y-10">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <span className="text-[13pt] font-bold text-slate-900">{exp.role}</span>
                                        <span className="text-[11pt] text-slate-400 font-bold italic tracking-tight">{exp.duration}</span>
                                    </div>
                                    <div className="text-[12pt] text-amber-800 font-bold mb-4">{exp.organization}</div>
                                    <ul className="space-y-3 text-[11pt] text-slate-600 list-none font-medium leading-[1.6]">
                                        {exp.bullets.map((bullet, j) => (
                                            <li key={j} className="flex items-start gap-4">
                                                <span className="text-amber-200 mt-2 shrink-0">■</span>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects - Publications Style */}
                {data.projects.length > 0 && (
                    <section>
                        <h2 className="text-[14pt] font-black text-amber-900 border-b-2 border-amber-100 pb-2 mb-6 tracking-wide flex items-center gap-4">
                            PROJECTS & PUBLICATIONS
                            <div className="h-px bg-amber-50 flex-1" />
                        </h2>
                        <div className="space-y-10">
                            {data.projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <span className="text-[13pt] font-bold text-slate-900">{proj.name}</span>
                                        {proj.link && <a href={proj.link} className="text-[11pt] font-bold text-amber-700 hover:text-amber-900 transition-colors decoration-dotted underline underline-offset-4">Reference →</a>}
                                    </div>
                                    <div className="text-[11pt] text-amber-800 font-bold italic mb-4 opacity-75">{proj.techStack}</div>
                                    <ul className="space-y-3 text-[11pt] text-slate-600 list-none font-medium leading-[1.6]">
                                        {proj.bullets.map((bullet, j) => (
                                            <li key={j} className="flex items-start gap-4">
                                                <span className="text-amber-200 mt-2 shrink-0">■</span>
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
                        <h2 className="text-[14pt] font-black text-amber-900 border-b-2 border-amber-100 pb-2 mb-6 tracking-wide flex items-center gap-4">
                            TECHNICAL PROFICIENCIES
                            <div className="h-px bg-amber-50 flex-1" />
                        </h2>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                            {(data.skills.categories || []).map((cat, i) => (
                                cat.skills && (
                                    <p key={i} className="text-[11pt] group">
                                        <span className="font-bold text-amber-900 uppercase tracking-tighter group-hover:text-amber-700 transition-colors">{cat.category}:</span>
                                        <span className="text-slate-600 font-medium ml-2">{cat.skills}</span>
                                    </p>
                                )
                            ))}
                        </div>
                    </section>
                )}

                {/* Awards & Honors */}
                <div className="grid grid-cols-2 gap-12">
                    {data.achievements.length > 0 && (
                        <section>
                            <h2 className="text-[14pt] font-black text-amber-900 border-b-2 border-amber-100 pb-2 mb-6 tracking-wide">AWARDS & HONORS</h2>
                            <ul className="space-y-3 text-[11pt] text-slate-600 list-none font-medium leading-[1.6]">
                                {data.achievements.map((ach, i) => (
                                    <li key={i} className="flex items-start gap-4 italic group">
                                        <span className="text-amber-500 shrink-0 group-hover:scale-125 transition-transform">★</span>
                                        <span>{ach}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-[14pt] font-black text-amber-900 border-b-2 border-amber-100 pb-2 mb-6 tracking-wide">CERTIFICATIONS</h2>
                            <ul className="space-y-3 text-[11pt] text-slate-600 list-none font-medium leading-[1.6]">
                                {data.certifications.map((cert, i) => (
                                    <li key={i} className="flex items-start gap-4 group">
                                        <span className="text-amber-500 shrink-0 group-hover:rotate-12 transition-transform">✓</span>
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
