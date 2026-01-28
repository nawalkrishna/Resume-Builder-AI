import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const TechTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-800 p-[25mm] font-mono w-[210mm] mx-auto min-h-[297mm] flex flex-col gap-10 shadow-none print:shadow-none">
            {/* Header - Terminal Style but clean */}
            <header className="border-[3px] border-slate-900 rounded-[1.5rem] p-6 bg-slate-50 relative overflow-hidden shadow-xl ring-1 ring-slate-200">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-rose-400/80 shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/80 shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400/80 shadow-sm" />
                    <span className="text-slate-400 text-[9pt] ml-3 font-black uppercase tracking-widest opacity-60">~/system/user/resume</span>
                </div>
                <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase leading-none drop-shadow-sm">{data.header.name}</h1>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[9pt] text-slate-500 font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-2"><span className="text-primary opacity-50">&gt;</span> Location: {data.header.location}</div>
                    <div className="flex items-center gap-2"><span className="text-primary opacity-50">&gt;</span> Email: {data.header.email}</div>
                    <div className="flex items-center gap-2"><span className="text-primary opacity-50">&gt;</span> Phone: {data.header.phone}</div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 lowercase bg-slate-100/50 p-2 rounded-lg border border-slate-200/50">
                        {data.header.github && <a href={data.header.github} className="text-primary font-black hover:text-indigo-600 transition-colors">./github</a>}
                        {data.header.linkedin && <a href={data.header.linkedin} className="text-primary font-black hover:text-indigo-600 transition-colors">./linkedin</a>}
                        {data.header.leetcode && <a href={data.header.leetcode} className="text-primary font-black hover:text-indigo-600 transition-colors">./leetcode</a>}
                        {data.header.portfolio && <a href={data.header.portfolio} className="text-primary font-black hover:text-indigo-600 transition-colors">./portfolio</a>}
                    </div>
                </div>
            </header>

            <div className="space-y-6">
                {/* Skills - Tagged */}
                <section>
                    <h2 className="text-[10pt] font-black uppercase tracking-[0.3em] text-slate-400 mb-3 border-b-4 border-slate-100 pb-1 inline-block">Technical_Core</h2>
                    <div className="flex flex-wrap gap-3">
                        {(data.skills.categories || []).map((cat, i) => (
                            <div key={i} className="px-4 py-2 bg-slate-900 rounded-lg border border-slate-700 text-[9pt] font-black uppercase text-slate-100 shadow-lg hover:translate-y-[-2px] transition-transform">
                                <span className="text-primary opacity-50 mr-2">$</span>
                                <span className="text-slate-400 mr-2">{cat.category}:</span> {cat.skills}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 border-b-4 border-slate-100 pb-1 inline-block">Lifecycle.Execute()</h2>
                        <div className="space-y-6">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="relative pl-10 border-l-[3px] border-slate-100 group">
                                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-[3px] border-primary group-hover:bg-primary transition-colors" />
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="text-[11pt] text-slate-900 font-black tracking-tight uppercase">{exp.role}</span>
                                        <span className="text-slate-400 text-[9pt] font-black uppercase tracking-widest">{exp.duration}</span>
                                    </div>
                                    <p className="text-primary text-[9.5pt] font-black uppercase mb-2 tracking-[0.15em]">{exp.organization}</p>
                                    <ul className="space-y-1.5 text-[9pt] text-slate-600 font-medium leading-relaxed">
                                        {exp.bullets.map((bullet, j) => (
                                            <li key={j} className="flex items-start gap-4">
                                                <span className="text-primary font-black opacity-30 mt-1">::</span>
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
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 border-b-4 border-slate-100 pb-1 inline-block">Modules.Deploy()</h2>
                        <div className="space-y-6">
                            {data.projects.map((proj, i) => (
                                <div key={i} className="relative pl-10 border-l-[3px] border-slate-100 group">
                                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-[3px] border-emerald-500 group-hover:bg-emerald-500 transition-colors" />
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="text-[11pt] text-slate-900 font-black tracking-tight uppercase">{proj.name}</span>
                                        {proj.link && <a href={proj.link} className="text-emerald-600 text-[9pt] font-black uppercase border-b-2 border-emerald-500/20 hover:border-emerald-500 transition-all">./deploy →</a>}
                                    </div>
                                    <p className="text-emerald-600 text-[9.5pt] font-black uppercase mb-2 tracking-[0.15em]">{proj.techStack}</p>
                                    <ul className="space-y-1.5 text-[9pt] text-slate-600 font-medium leading-relaxed">
                                        {proj.bullets.map((bullet, j) => (
                                            <li key={j} className="flex items-start gap-4">
                                                <span className="text-emerald-500 font-black opacity-30 mt-1">::</span>
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
                    <h2 className="text-[11pt] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 border-b-4 border-slate-100 pb-2 inline-block">Boot_Sequence</h2>
                    <div className="space-y-4">
                        {data.education.map((edu, i) => (
                            <div key={i} className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xl overflow-hidden group">
                                <div className="z-10">
                                    <span className="text-slate-100 font-black text-[10pt] tracking-tight uppercase">{edu.degree}</span>
                                    <span className="text-slate-700 mx-3 font-black">//</span>
                                    <span className="text-slate-400 font-black uppercase text-[9pt] tracking-widest">{edu.institution}</span>
                                </div>
                                <span className="text-primary font-black text-[9pt] uppercase tracking-widest bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">{edu.duration}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Achievements */}
                {data.achievements.length > 0 && (
                    <section>
                        <h2 className="text-[11pt] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 border-b-4 border-slate-100 pb-2 inline-block">Rewards.Claim()</h2>
                        <ul className="space-y-3 text-[10.5pt] text-slate-600 font-medium leading-[1.6]">
                            {data.achievements.map((ach, i) => (
                                <li key={i} className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                                    <span className="text-amber-500 font-black opacity-30 mt-1">::</span>
                                    <span>{ach}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Certifications */}
                {data.certifications.length > 0 && (
                    <section>
                        <h2 className="text-[11pt] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 border-b-4 border-slate-100 pb-2 inline-block">System.Verify()</h2>
                        <ul className="space-y-3 text-[10.5pt] text-slate-600 font-medium leading-[1.6]">
                            {data.certifications.map((cert, i) => (
                                <li key={i} className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                                    <span className="text-emerald-500 font-black opacity-30 mt-1">::</span>
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
