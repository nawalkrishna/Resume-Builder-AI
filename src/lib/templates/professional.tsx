import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const ProfessionalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-800 w-[210mm] mx-auto min-h-[297mm] flex shadow-none print:shadow-none font-sans overflow-hidden">
            {/* Left Sidebar */}
            <aside className="w-[35%] bg-slate-900 text-white p-6 flex flex-col">
                {/* Photo placeholder / Initials */}
                <div className="w-20 h-20 bg-slate-800 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl font-black shadow-2xl border border-slate-700">
                    {data.header.name.split(" ").map(n => n[0]).join("")}
                </div>

                <div className="space-y-6">
                    {/* Contact */}
                    <section>
                        <h3 className="text-[8.5pt] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Connectivity</h3>
                        <div className="space-y-3 text-[9pt]">
                            <p className="flex items-start gap-4 text-slate-200">
                                <span className="text-slate-500 mt-1">📍</span> {data.header.location}
                            </p>
                            <p className="flex items-start gap-4 text-slate-200">
                                <span className="text-slate-500 mt-1">📞</span> {data.header.phone}
                            </p>
                            <p className="flex items-start gap-4 text-slate-200 break-all leading-snug">
                                <span className="text-slate-500 mt-1">✉️</span> {data.header.email}
                            </p>
                            {data.header.linkedin && (
                                <p className="flex items-start gap-4">
                                    <span className="text-slate-500 mt-1">🔗</span> <a href={data.header.linkedin} className="text-slate-200 hover:text-primary transition-colors">LinkedIn</a>
                                </p>
                            )}
                            {data.header.github && (
                                <p className="flex items-start gap-4">
                                    <span className="text-slate-500 mt-1">💻</span> <a href={data.header.github} className="text-slate-200 hover:text-primary transition-colors">GitHub</a>
                                </p>
                            )}
                            {data.header.leetcode && (
                                <p className="flex items-start gap-4">
                                    <span className="text-slate-500 mt-1">⌨️</span> <a href={data.header.leetcode} className="text-slate-200 hover:text-primary transition-colors">LeetCode</a>
                                </p>
                            )}
                            {data.header.portfolio && (
                                <p className="flex items-start gap-4">
                                    <span className="text-slate-500 mt-1">🌐</span> <a href={data.header.portfolio} className="text-slate-200 hover:text-primary transition-colors">Portfolio</a>
                                </p>
                            )}
                        </div>
                    </section>

                    {/* Education */}
                    <section>
                        <h3 className="text-[9.5pt] font-black uppercase tracking-[0.25em] text-slate-500 mb-5">Education</h3>
                        <div className="space-y-6">
                            {data.education.map((edu, i) => (
                                <div key={i} className="group">
                                    <p className="font-black text-slate-100 text-[9.5pt] leading-tight mb-1 uppercase">{edu.degree}</p>
                                    <p className="text-[8.5pt] text-slate-400 font-bold mb-0.5">{edu.institution}</p>
                                    <p className="text-[7.5pt] text-primary font-black uppercase tracking-widest">{edu.duration}</p>
                                    {edu.cgpa && <p className="text-[8pt] text-emerald-500 font-black mt-0.5">GPA: {edu.cgpa}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-[10mm] flex flex-col">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-none mb-2">{data.header.name}</h1>
                    <div className="flex items-center gap-3">
                        <div className="h-1 w-12 bg-primary/20 rounded-full" />
                    </div>
                </header>

                <div className="space-y-8">
                    {/* Experience */}
                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-slate-300 mb-6 border-b border-slate-100 pb-2">
                                Experience
                            </h2>
                            <div className="space-y-10">
                                {data.experience.map((exp, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-[12pt] font-black text-slate-900 tracking-tight uppercase">{exp.role}</h3>
                                            <span className="text-[9.5pt] font-black text-slate-400 tracking-widest uppercase">{exp.duration}</span>
                                        </div>
                                        <p className="text-[10.5pt] text-primary font-black uppercase tracking-wider mb-4">{exp.organization}</p>
                                        <ul className="space-y-1.5 text-[9.5pt] text-slate-600 font-medium leading-relaxed">
                                            {exp.bullets.map((bullet, j) => (
                                                <li key={j} className="flex items-start gap-3">
                                                    <div className="w-1 h-1 rounded-full bg-slate-200 mt-2" />
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Expertise / Skills */}
                    {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                        <section>
                            <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-slate-300 mb-6 border-b border-slate-100 pb-2">
                                Expertise
                            </h2>
                            <div className="grid grid-cols-2 gap-6">
                                {(data.skills.categories || []).map((cat, i) => (
                                    cat.skills && (
                                        <div key={i}>
                                            <p className="text-[9.5pt] font-black text-slate-400 uppercase tracking-widest mb-2">{cat.category}</p>
                                            <p className="text-[10.5pt] text-slate-700 font-bold leading-snug">{cat.skills}</p>
                                        </div>
                                    )
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.projects.length > 0 && (
                        <section>
                            <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-slate-300 mb-6 border-b border-slate-100 pb-2">
                                Case Studies
                            </h2>
                            <div className="space-y-6">
                                {data.projects.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-[11pt] font-black text-slate-900 tracking-tight uppercase">{proj.name}</h3>
                                            {proj.link && <a href={proj.link} className="text-primary text-[8pt] font-black uppercase border-b-2 border-primary/10 hover:border-primary transition-all">View →</a>}
                                        </div>
                                        <p className="text-[9pt] text-slate-400 font-bold uppercase tracking-widest mb-2">{proj.techStack}</p>
                                        <ul className="space-y-1.5 text-[9pt] text-slate-600 font-medium">
                                            {proj.bullets.map((bullet, j) => (
                                                <li key={j} className="flex items-start gap-3">
                                                    <span className="text-slate-200 mt-1.5 text-[5pt]">■</span>
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Achievements */}
                    {data.achievements.length > 0 && (
                        <section>
                            <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-slate-300 mb-6 border-b border-slate-100 pb-2">
                                Honors & Awards
                            </h2>
                            <ul className="space-y-2 text-[9.5pt] text-slate-600 font-medium">
                                {data.achievements.map((ach, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-1 h-1 rounded-full bg-slate-200 mt-2" />
                                        <span>{ach}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Certifications */}
                    {data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-slate-300 mb-6 border-b border-slate-100 pb-2">
                                Certifications
                            </h2>
                            <ul className="space-y-2 text-[9.5pt] text-slate-600 font-medium">
                                {data.certifications.map((cert, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-1 h-1 rounded-full bg-slate-200 mt-2" />
                                        <span>{cert}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
};
