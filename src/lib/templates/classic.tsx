import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const ClassicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-black p-[25mm] font-serif leading-relaxed w-[210mm] mx-auto min-h-[297mm] flex flex-col shadow-none print:shadow-none" style={{ fontFamily: "Times New Roman, serif" }}>
            {/* Header - Centered Classic Style */}
            <header className="text-center mb-10 border-b-2 border-slate-900 pb-6">
                <h1 className="text-4xl font-bold tracking-tight uppercase leading-none drop-shadow-sm">{data.header.name}</h1>
                <div className="mt-4 text-[10.5pt] space-x-4 font-medium text-slate-700">
                    <span>{data.header.location}</span>
                    <span className="text-slate-300">•</span>
                    <span>{data.header.phone}</span>
                    <span className="text-slate-300">•</span>
                    <span>{data.header.email}</span>
                </div>
                <div className="mt-3 text-[10pt] flex flex-wrap justify-center gap-x-4 gap-y-1 font-medium text-slate-800">
                    {data.header.linkedin && <a href={data.header.linkedin} className="underline decoration-slate-200 underline-offset-4 hover:decoration-slate-400 transition-colors">LinkedIn</a>}
                    {data.header.github && <a href={data.header.github} className="underline decoration-slate-200 underline-offset-4 hover:decoration-slate-400 transition-colors">GitHub</a>}
                    {data.header.leetcode && <a href={data.header.leetcode} className="underline decoration-slate-200 underline-offset-4 hover:decoration-slate-400 transition-colors">LeetCode</a>}
                    {data.header.portfolio && <a href={data.header.portfolio} className="underline decoration-slate-200 underline-offset-4 hover:decoration-slate-400 transition-colors">Portfolio</a>}
                    {data.header.customLinks?.map((link, i) => (
                        <a key={i} href={link.url} className="underline decoration-slate-200 underline-offset-4 hover:decoration-slate-400 transition-colors">{link.name}</a>
                    ))}
                </div>
            </header>

            <div className="space-y-10 flex-1">
                {/* Education */}
                <section>
                    <h2 className="text-[12pt] font-bold uppercase border-b border-slate-300 mb-4 pb-1 tracking-wide">Education</h2>
                    <div className="space-y-4">
                        {data.education.map((edu, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="font-bold text-[11.5pt]">{edu.institution}</span>
                                    <span className="italic text-[10pt] font-medium text-slate-600">{edu.duration}</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="italic text-[10.5pt]">{edu.degree}</span>
                                    {edu.cgpa && <span className="text-[10pt] font-bold underline decoration-slate-100 underline-offset-2">GPA: {edu.cgpa}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-[12pt] font-bold uppercase border-b border-slate-300 mb-4 pb-1 tracking-wide">Professional Experience</h2>
                        <div className="space-y-8">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-bold text-[11.5pt]">{exp.organization}</span>
                                        <span className="italic text-[10pt] font-medium text-slate-600">{exp.duration}</span>
                                    </div>
                                    <p className="italic text-[11pt] text-slate-800 mb-3">{exp.role}</p>
                                    <ul className="list-disc list-outside ml-5 space-y-1.5 text-[10.5pt] text-slate-800">
                                        {exp.bullets.map((bullet, j) => (
                                            <li key={j} className="pl-1">{bullet}</li>
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
                        <h2 className="text-[12pt] font-bold uppercase border-b border-slate-300 mb-4 pb-1 tracking-wide">Selected Projects</h2>
                        <div className="space-y-8">
                            {data.projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-bold text-[11.5pt]">{proj.name}</span>
                                        {proj.link && <a href={proj.link} className="text-[9.5pt] font-medium italic underline decoration-slate-200 underline-offset-2 hover:decoration-slate-400 transition-colors">Visit Project →</a>}
                                    </div>
                                    <p className="italic text-[10.5pt] text-slate-600 mb-3">{proj.techStack}</p>
                                    <ul className="list-disc list-outside ml-5 space-y-1.5 text-[10.5pt] text-slate-800">
                                        {proj.bullets.map((bullet, j) => (
                                            <li key={j} className="pl-1">{bullet}</li>
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
                        <h2 className="text-[12pt] font-bold uppercase border-b border-slate-300 mb-4 pb-1 tracking-wide">Technical Skills</h2>
                        <div className="space-y-2 text-[10.5pt] text-slate-800">
                            {(data.skills.categories || []).map((cat, i) => (
                                cat.skills && (
                                    <p key={i}>
                                        <span className="font-bold">{cat.category}:</span> {cat.skills}
                                    </p>
                                )
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};
