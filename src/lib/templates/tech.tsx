import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const TechTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-800 p-[25mm] font-mono w-[210mm] mx-auto min-h-[297mm] flex flex-col gap-10 shadow-none print:shadow-none">
            {/* Header - Terminal Style but clean */}
            <header className="border-[3px] border-slate-900 rounded-[2rem] p-10 bg-slate-50 relative overflow-hidden shadow-xl ring-1 ring-slate-200">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-4 h-4 rounded-full bg-rose-400/80 shadow-sm" />
                    <div className="w-4 h-4 rounded-full bg-amber-400/80 shadow-sm" />
                    <div className="w-4 h-4 rounded-full bg-emerald-400/80 shadow-sm" />
                    <span className="text-slate-400 text-[11pt] ml-4 font-black uppercase tracking-widest opacity-60">~/system/user/resume</span>
                </div>
                <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter uppercase leading-none drop-shadow-sm">{data.header.name}</h1>
                <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-[10.5pt] text-slate-500 font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-2"><span className="text-primary opacity-50">&gt;</span> Location: {data.header.location}</div>
                    <div className="flex items-center gap-2"><span className="text-primary opacity-50">&gt;</span> Email: {data.header.email}</div>
                    <div className="flex items-center gap-2"><span className="text-primary opacity-50">&gt;</span> Phone: {data.header.phone}</div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 lowercase bg-slate-100/50 p-3 rounded-lg border border-slate-200/50">
                        {data.header.github && <a href={data.header.github} className="text-primary font-black hover:text-indigo-600 transition-colors">./github</a>}
                        {data.header.linkedin && <a href={data.header.linkedin} className="text-primary font-black hover:text-indigo-600 transition-colors">./linkedin</a>}
                        {data.header.leetcode && <a href={data.header.leetcode} className="text-primary font-black hover:text-indigo-600 transition-colors">./leetcode</a>}
                        {data.header.portfolio && <a href={data.header.portfolio} className="text-primary font-black hover:text-indigo-600 transition-colors">./portfolio</a>}
                    </div>
                </div>
            </header>

            <div className="space-y-12">
                {/* Skills - Tagged */}
                <section>
                    <h2 className="text-[11pt] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 border-b-4 border-slate-100 pb-2 inline-block">Technical_Core</h2>
                    <div className="flex flex-wrap gap-3">
                        {(data.skills.categories || []).map((cat, i) => (
                            <div key={i} className="px-5 py-2.5 bg-slate-900 rounded-xl border border-slate-700 text-[10pt] font-black uppercase text-slate-100 shadow-lg hover:translate-y-[-2px] transition-transform">
                                <span className="text-primary opacity-50 mr-2">$</span>
                                <span className="text-slate-400 mr-2">{cat.category}:</span> {cat.skills}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-[11pt] font-black uppercase tracking-[0.4em] text-slate-400 mb-8 border-b-4 border-slate-100 pb-2 inline-block">Lifecycle.Execute()</h2>
                        <div className="space-y-10">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="relative pl-10 border-l-[3px] border-slate-100 group">
                                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-[3px] border-primary group-hover:bg-primary transition-colors" />
                                    <div className="flex justify-between items-baseline mb-2">
                                        <span className="text-[13pt] text-slate-900 font-black tracking-tight uppercase">{exp.role}</span>
                                        <span className="text-slate-400 text-[10pt] font-black uppercase tracking-widest">{exp.duration}</span>
                                    </div>
                                    <p className="text-primary text-[10.5pt] font-black uppercase mb-4 tracking-[0.2em]">{exp.organization}</p>
                                    <ul className="space-y-3 text-[10.5pt] text-slate-600 font-medium leading-[1.6]">
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
                        <h2 className="text-[11pt] font-black uppercase tracking-[0.4em] text-slate-400 mb-8 border-b-4 border-slate-100 pb-2 inline-block">Modules.Deploy()</h2>
                        <div className="space-y-10">
                            {data.projects.map((proj, i) => (
                                <div key={i} className="relative pl-10 border-l-[3px] border-slate-100 group">
                                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-[3px] border-emerald-500 group-hover:bg-emerald-500 transition-colors" />
                                    <div className="flex justify-between items-baseline mb-2">
                                        <span className="text-[13pt] text-slate-900 font-black tracking-tight uppercase">{proj.name}</span>
                                        {proj.link && <a href={proj.link} className="text-emerald-600 text-[10pt] font-black uppercase border-b-2 border-emerald-500/20 hover:border-emerald-500 transition-all">./deploy →</a>}
                                    </div>
                                    <p className="text-emerald-600 text-[10.5pt] font-black uppercase mb-4 tracking-[0.2em]">{proj.techStack}</p>
                                    <ul className="space-y-3 text-[10.5pt] text-slate-600 font-medium leading-[1.6]">
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
                            <div key={i} className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl overflow-hidden group">
                                <div className="z-10">
                                    <span className="text-slate-100 font-black text-[12pt] tracking-tight uppercase">{edu.degree}</span>
                                    <span className="text-slate-700 mx-4 font-black">//</span>
                                    <span className="text-slate-400 font-black uppercase text-[10pt] tracking-widest">{edu.institution}</span>
                                </div>
                                <span className="text-primary font-black text-[10pt] uppercase tracking-widest bg-slate-800 px-4 py-1.5 rounded-lg border border-slate-700">{edu.duration}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};
