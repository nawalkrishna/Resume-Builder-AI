import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const ProfessionalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-800 w-[210mm] mx-auto min-h-[297mm] flex shadow-none print:shadow-none font-sans overflow-hidden">
            {/* Left Sidebar */}
            <aside className="w-[35%] bg-slate-900 text-white p-10 flex flex-col">
                {/* Photo placeholder / Initials */}
                <div className="w-28 h-28 bg-slate-800 rounded-2xl mx-auto mb-8 flex items-center justify-center text-4xl font-black shadow-2xl border border-slate-700">
                    {data.header.name.split(" ").map(n => n[0]).join("")}
                </div>

                <div className="space-y-10">
                    {/* Contact */}
                    <section>
                        <h3 className="text-[9.5pt] font-black uppercase tracking-[0.25em] text-slate-500 mb-5">Connectivity</h3>
                        <div className="space-y-4 text-[10pt]">
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
                                    <p className="font-black text-slate-100 text-[10.5pt] leading-tight mb-2 uppercase">{edu.degree}</p>
                                    <p className="text-[9.5pt] text-slate-400 font-bold mb-1">{edu.institution}</p>
                                    <p className="text-[8.5pt] text-primary font-black uppercase tracking-widest">{edu.duration}</p>
                                    {edu.cgpa && <p className="text-[9pt] text-emerald-500 font-black mt-1">GPA: {edu.cgpa}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-[15mm] flex flex-col">
                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight uppercase leading-none mb-3">{data.header.name}</h1>
                    <div className="flex items-center gap-4">
                        <div className="h-1 w-20 bg-primary/20 rounded-full" />
                        <p className="text-xl font-bold text-slate-400 tracking-widest uppercase">Expert Professional</p>
                    </div>
                </header>

                <div className="space-y-12">
                    {/* Experience */}
                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-[11pt] font-black uppercase tracking-[0.3em] text-slate-300 mb-8 border-b border-slate-100 pb-3 flex items-center justify-between">
                                Experience
                                <span className="text-slate-100 text-[8pt]">Professional Record</span>
                            </h2>
                            <div className="space-y-10">
                                {data.experience.map((exp, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-[12pt] font-black text-slate-900 tracking-tight uppercase">{exp.role}</h3>
                                            <span className="text-[9.5pt] font-black text-slate-400 tracking-widest uppercase">{exp.duration}</span>
                                        </div>
                                        <p className="text-[10.5pt] text-primary font-black uppercase tracking-wider mb-4">{exp.organization}</p>
                                        <ul className="space-y-2.5 text-[10.5pt] text-slate-600 font-medium leading-relaxed">
                                            {exp.bullets.map((bullet, j) => (
                                                <li key={j} className="flex items-start gap-4">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-2" />
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
                            <h2 className="text-[11pt] font-black uppercase tracking-[0.3em] text-slate-300 mb-8 border-b border-slate-100 pb-3">
                                Expertise
                            </h2>
                            <div className="grid grid-cols-2 gap-8">
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
                            <h2 className="text-[11pt] font-black uppercase tracking-[0.3em] text-slate-300 mb-8 border-b border-slate-100 pb-3">
                                Case Studies
                            </h2>
                            <div className="space-y-8">
                                {data.projects.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-[12pt] font-black text-slate-900 tracking-tight uppercase">{proj.name}</h3>
                                            {proj.link && <a href={proj.link} className="text-primary text-[9pt] font-black uppercase border-b-2 border-primary/10 hover:border-primary transition-all">View →</a>}
                                        </div>
                                        <p className="text-[10pt] text-slate-400 font-bold uppercase tracking-widest mb-3">{proj.techStack}</p>
                                        <ul className="space-y-2 text-[10pt] text-slate-600 font-medium">
                                            {proj.bullets.map((bullet, j) => (
                                                <li key={j} className="flex items-start gap-3">
                                                    <span className="text-slate-200 mt-2 text-[6pt]">■</span>
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
};
