import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const ElegantTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-800 p-[25mm] font-serif w-[210mm] mx-auto min-h-[297mm] flex flex-col gap-12 shadow-none print:shadow-none">
            {/* Header - Truly Elegant */}
            <header className="text-center space-y-6">
                <h1 className="text-5xl font-light text-slate-900 tracking-[0.2em] uppercase leading-none drop-shadow-sm">{data.header.name}</h1>
                <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 text-[10.5pt] items-center font-bold uppercase tracking-widest text-slate-400">
                    <span>{data.header.location}</span>
                    <span className="text-slate-200">|</span>
                    {data.header.linkedin && <><a href={data.header.linkedin} className="hover:text-slate-900 transition-colors">LinkedIn</a><span className="text-slate-200">|</span></>}
                    {data.header.github && <><a href={data.header.github} className="hover:text-slate-900 transition-colors">GitHub</a><span className="text-slate-200">|</span></>}
                    <span className="text-slate-500">{data.header.email}</span>
                    <span className="text-slate-200">|</span>
                    <span className="text-slate-500">{data.header.phone}</span>
                </div>
                {data.header.portfolio || data.header.leetcode || (data.header.customLinks && data.header.customLinks.length > 0) ? (
                    <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-[9.5pt] font-bold uppercase tracking-[0.15em] text-slate-400 mt-4 italic">
                        {data.header.leetcode && <a href={data.header.leetcode} className="hover:text-slate-900 transition-colors underline decoration-slate-100 underline-offset-4">LeetCode</a>}
                        {data.header.portfolio && <a href={data.header.portfolio} className="hover:text-slate-900 transition-colors underline decoration-slate-100 underline-offset-4">Portfolio</a>}
                        {data.header.customLinks?.map((link, i) => (
                            <a key={i} href={link.url} className="hover:text-slate-900 transition-colors underline decoration-slate-100 underline-offset-4">{link.name}</a>
                        ))}
                    </div>
                ) : null}
                <div className="w-32 h-[1.5px] bg-slate-900 mx-auto mt-10 scale-x-125" />
            </header>

            {/* Main Content */}
            <div className="space-y-12">
                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-[11pt] font-black uppercase tracking-[0.5em] text-slate-900 mb-10 text-center flex items-center justify-center gap-6">
                            <span className="h-px w-12 bg-slate-100" />
                            Experience
                            <span className="h-px w-12 bg-slate-100" />
                        </h2>
                        <div className="space-y-12">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex justify-between items-end border-b-2 border-slate-50 pb-3">
                                        <div>
                                            <h3 className="text-[13pt] font-black text-slate-900 uppercase tracking-tight leading-none">{exp.role}</h3>
                                            <p className="text-[11pt] text-primary font-bold italic mt-2 opacity-80">{exp.organization}</p>
                                        </div>
                                        <span className="text-[10pt] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-md">{exp.duration}</span>
                                    </div>
                                    <ul className="list-disc list-outside ml-6 space-y-2.5 text-[11pt] text-slate-600 leading-[1.7] font-sans font-medium">
                                        {exp.bullets.map((bullet, j) => <li key={j} className="pl-1">{bullet}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                <section>
                    <h2 className="text-[11pt] font-black uppercase tracking-[0.5em] text-slate-900 mb-10 text-center flex items-center justify-center gap-6">
                        <span className="h-px w-12 bg-slate-100" />
                        Education
                        <span className="h-px w-12 bg-slate-100" />
                    </h2>
                    <div className="space-y-8">
                        {data.education.map((edu, i) => (
                            <div key={i} className="flex justify-between items-center text-center group">
                                <div className="flex-1 text-right pr-10">
                                    <h3 className="text-[12pt] font-black text-slate-900 uppercase tracking-tight">{edu.degree}</h3>
                                </div>
                                <div className="w-3 h-3 rounded-full bg-white border-2 border-slate-200 group-hover:bg-primary group-hover:border-primary transition-all flex-shrink-0" />
                                <div className="flex-1 text-left pl-10">
                                    <p className="text-[11pt] text-slate-500 font-bold uppercase tracking-wide">{edu.institution}</p>
                                    <p className="text-[10pt] text-slate-300 font-black mt-2 uppercase tracking-[0.2em]">{edu.duration}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                {data.projects.length > 0 && (
                    <section>
                        <h2 className="text-[11pt] font-black uppercase tracking-[0.5em] text-slate-900 mb-10 text-center flex items-center justify-center gap-6">
                            <span className="h-px w-12 bg-slate-100" />
                            Key Projects
                            <span className="h-px w-12 bg-slate-100" />
                        </h2>
                        <div className="space-y-12">
                            {data.projects.map((proj, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex justify-between items-end border-b-2 border-slate-50 pb-3">
                                        <div>
                                            <h3 className="text-[13pt] font-black text-slate-900 uppercase tracking-tight leading-none">{proj.name}</h3>
                                            <p className="text-[11pt] text-primary font-bold italic mt-2 opacity-80">{proj.techStack}</p>
                                        </div>
                                        {proj.link && <a href={proj.link} className="text-[10pt] font-black text-primary uppercase border-b-2 border-primary/20 hover:border-primary transition-colors pb-0.5 tracking-widest">Repository →</a>}
                                    </div>
                                    <ul className="list-disc list-outside ml-6 space-y-2.5 text-[11pt] text-slate-600 leading-[1.7] font-sans font-medium">
                                        {proj.bullets.map((bullet, j) => <li key={j} className="pl-1">{bullet}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                    <section>
                        <h2 className="text-[11pt] font-black uppercase tracking-[0.5em] text-slate-900 mb-10 text-center flex items-center justify-center gap-6">
                            <span className="h-px w-12 bg-slate-100" />
                            Skills
                            <span className="h-px w-12 bg-slate-100" />
                        </h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {(data.skills.categories || []).map((cat, i) => (
                                (cat.skills || "").split(",").filter(s => s.trim()).map((skill, j) => (
                                    <span key={`${i}-${j}`} className="px-6 py-2.5 border-2 border-slate-100 text-slate-700 text-[10.5pt] font-bold uppercase tracking-widest rounded-full hover:bg-slate-50 transition-colors">
                                        {skill.trim()}
                                    </span>
                                ))
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements & Certifications */}
                <div className="grid grid-cols-2 gap-12">
                    {data.achievements.length > 0 && (
                        <section>
                            <h2 className="text-[11pt] font-black uppercase tracking-[0.3em] text-slate-900 mb-8 text-center flex items-center justify-center gap-4">
                                <span className="h-px w-6 bg-slate-100" />
                                Achievements
                            </h2>
                            <ul className="space-y-4 text-[11pt] text-slate-600 leading-relaxed font-sans font-medium">
                                {data.achievements.map((ach, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <span className="text-primary text-[14pt] leading-none mt-[-2px]">◆</span>
                                        <span>{ach}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                    {data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-[11pt] font-black uppercase tracking-[0.3em] text-slate-900 mb-8 text-center flex items-center justify-center gap-4">
                                <span className="h-px w-6 bg-slate-100" />
                                Certifications
                            </h2>
                            <ul className="space-y-4 text-[11pt] text-slate-600 leading-relaxed font-sans font-medium">
                                {data.certifications.map((cert, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <span className="text-primary text-[14pt] leading-none mt-[-2px]">✓</span>
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
