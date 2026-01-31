import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const ElegantTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-800 font-serif leading-snug w-full flex flex-col shadow-none print:shadow-none text-[9.5pt] flex-1" style={{ fontFamily: "Merriweather, serif" }}>
            {/* Header - Truly Elegant & Balanced */}
            <header className="text-center pt-10 pb-4">
                <h1 className="text-3xl font-normal text-slate-900 tracking-[0.25em] uppercase leading-tight mb-4">{data.header.name}</h1>
                <div className="flex justify-center flex-wrap gap-x-8 gap-y-1 text-[8.5pt] font-medium uppercase tracking-widest text-slate-500 max-w-2xl mx-auto">
                    {data.header.location && <span>{data.header.location}</span>}
                    {data.header.phone && <span className="text-slate-200">|</span>}
                    {data.header.phone && <span>{data.header.phone}</span>}
                    {data.header.email && <span className="text-slate-200">|</span>}
                    {data.header.email && <span className="lowercase italic tracking-normal">{data.header.email}</span>}
                </div>

                {(data.header.linkedin || data.header.github || data.header.leetcode || data.header.portfolio || (data.header.customLinks && data.header.customLinks.length > 0)) && (
                    <div className="flex justify-center flex-wrap gap-x-6 gap-y-1 text-[8pt] font-bold uppercase tracking-[0.1em] text-primary/70 mt-3 italic">
                        {data.header.linkedin && <a href={data.header.linkedin} className="hover:text-primary transition-colors hover:underline decoration-primary/20 underline-offset-4">LinkedIn</a>}
                        {data.header.github && <a href={data.header.github} className="hover:text-primary transition-colors hover:underline decoration-primary/20 underline-offset-4">GitHub</a>}
                        {data.header.leetcode && <a href={data.header.leetcode} className="hover:text-primary transition-colors hover:underline decoration-primary/20 underline-offset-4">LeetCode</a>}
                        {data.header.portfolio && <a href={data.header.portfolio} className="hover:text-primary transition-colors hover:underline decoration-primary/20 underline-offset-4">Portfolio</a>}
                        {data.header.customLinks?.map((link, i) => (
                            <a key={i} href={link.url} className="hover:text-primary transition-colors hover:underline decoration-primary/20 underline-offset-4">{link.name}</a>
                        ))}
                    </div>
                )}

                <div className="w-12 h-[1px] bg-slate-900 mt-6 mx-auto opacity-20" />
            </header>

            {/* Main Content - Compressed for PDF fit */}
            <div className="space-y-4 px-10 pb-6">
                {/* 1. Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section>
                        <h2 className="text-[9pt] font-black uppercase tracking-[0.4em] text-slate-900 mb-4 text-center flex items-center justify-center gap-6 opacity-90">
                            <span className="h-px w-16 bg-slate-100" />
                            Experience
                            <span className="h-px w-16 bg-slate-100" />
                        </h2>
                        <div className="space-y-4">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <div className="max-w-[75%]">
                                            <h3 className="text-[11pt] font-bold text-slate-900 uppercase tracking-tight leading-snug">{exp.role}</h3>
                                            <p className="text-[9.5pt] text-primary font-bold uppercase mt-0.5 tracking-wider opacity-80">{exp.organization}</p>
                                        </div>
                                        <span className="text-[8.5pt] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{exp.duration}</span>
                                    </div>
                                    <ul className="space-y-0.5 text-[9pt] text-slate-600 leading-normal font-sans font-medium flex flex-col">
                                        {exp.bullets.map((bullet, j) => (
                                            <li key={j} className="flex items-start gap-4">
                                                <span className="text-slate-200 mt-1.5 text-[5pt] shrink-0">■</span>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 2. Education */}
                {data.education && data.education.length > 0 && (
                    <section>
                        <h2 className="text-[9pt] font-black uppercase tracking-[0.4em] text-slate-900 mb-6 text-center flex items-center justify-center gap-6 opacity-90">
                            <span className="h-px w-16 bg-slate-100" />
                            Education
                            <span className="h-px w-16 bg-slate-100" />
                        </h2>
                        <div className="space-y-4">
                            {data.education.map((edu, i) => (
                                <div key={i} className="flex justify-between items-start text-center max-w-2xl mx-auto">
                                    <div className="flex-1 text-right pr-6 pt-1">
                                        <h3 className="text-[10pt] font-bold text-slate-900 uppercase tracking-tight">{edu.degree}</h3>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-slate-100 border border-slate-200 mt-2.5 shrink-0" />
                                    <div className="flex-1 text-left pl-6">
                                        <p className="text-[9pt] text-slate-500 font-bold uppercase tracking-wide leading-none mb-1">{edu.institution}</p>
                                        <p className="text-[8.5pt] text-slate-300 font-black uppercase tracking-[0.15em]">{edu.duration}</p>
                                        {edu.cgpa && <p className="text-[8pt] text-primary font-black mt-1">GPA {edu.cgpa}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 3. Key Projects */}
                {data.projects && data.projects.length > 0 && (
                    <section>
                        <h2 className="text-[9pt] font-black uppercase tracking-[0.4em] text-slate-900 mb-6 text-center flex items-center justify-center gap-6 opacity-90">
                            <span className="h-px w-16 bg-slate-100" />
                            Key Projects
                            <span className="h-px w-16 bg-slate-100" />
                        </h2>
                        <div className="space-y-4">
                            {data.projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <div className="max-w-[75%]">
                                            <h3 className="text-[11pt] font-bold text-slate-900 uppercase tracking-tight leading-snug">{proj.name}</h3>
                                            <p className="text-[9pt] text-primary font-bold italic mt-0.5 opacity-70">{proj.techStack}</p>
                                        </div>
                                        {proj.link && <a href={proj.link} className="text-[8pt] font-black text-primary uppercase border-b border-primary/20 hover:border-primary transition-colors pb-0.5 tracking-widest whitespace-nowrap italic">Link →</a>}
                                    </div>
                                    <ul className="space-y-0.5 text-[9pt] text-slate-600 leading-normal font-sans font-medium flex flex-col">
                                        {proj.bullets.map((bullet, j) => (
                                            <li key={j} className="flex items-start gap-4">
                                                <span className="text-slate-200 mt-1.5 text-[5pt] shrink-0">■</span>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 4. Skills - Compact & Organized */}
                {data.skills && data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                    <section>
                        <h2 className="text-[9pt] font-black uppercase tracking-[0.4em] text-slate-900 mb-6 text-center flex items-center justify-center gap-6 opacity-90">
                            <span className="h-px w-16 bg-slate-100" />
                            Capabilities
                            <span className="h-px w-16 bg-slate-100" />
                        </h2>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-4 max-w-3xl mx-auto font-sans">
                            {(data.skills.categories || []).map((cat, i) => (
                                cat.skills && (
                                    <div key={i} className="text-center md:text-left">
                                        <h4 className="text-[8.5pt] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{cat.category}</h4>
                                        <p className="text-[10pt] text-slate-700 font-medium leading-relaxed italic">{cat.skills}</p>
                                    </div>
                                )
                            ))}
                        </div>
                    </section>
                )}

                {/* 5. Achievements & Certifications (Strict Conditional) */}
                {((data.achievements && data.achievements.length > 0) || (data.certifications && data.certifications.length > 0)) && (
                    <div className="grid grid-cols-2 gap-12 pt-2">
                        {data.achievements && data.achievements.length > 0 && (
                            <section>
                                <h2 className="text-[9pt] font-black uppercase tracking-[0.2em] text-slate-900 mb-6 flex items-center gap-4">
                                    Awards
                                    <div className="h-px bg-slate-100 flex-1" />
                                </h2>
                                <ul className="space-y-3 text-[9.5pt] text-slate-600 leading-snug font-sans font-medium italic">
                                    {data.achievements.map((ach, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <span className="text-primary text-[10pt]">◆</span>
                                            <span>{ach}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                        {data.certifications && data.certifications.length > 0 && (
                            <section>
                                <h2 className="text-[9pt] font-black uppercase tracking-[0.2em] text-slate-900 mb-6 flex items-center gap-4">
                                    Certs
                                    <div className="h-px bg-slate-100 flex-1" />
                                </h2>
                                <ul className="space-y-3 text-[9.5pt] text-slate-600 leading-snug font-sans font-medium">
                                    {data.certifications.map((cert, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <span className="text-primary text-[10pt]">✓</span>
                                            <span>{cert}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
