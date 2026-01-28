import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

// Export as ATSTemplate for registry
export { ATSResumeTemplate as ATSTemplate };

export const ATSResumeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-black p-[25mm] font-serif leading-tight w-[210mm] mx-auto min-h-[297mm] shadow-none print:shadow-none flex flex-col gap-6 text-[10.5pt]">
            {/* Header */}
            <header className="text-center border-b-[1.5pt] border-black pb-4">
                <h1 className="text-3xl font-bold uppercase tracking-wide mb-2 leading-none">{data.header.name}</h1>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10.5pt] font-medium text-slate-700">
                    <span>{data.header.location}</span>
                    <span className="text-slate-300">•</span>
                    <span>{data.header.phone}</span>
                    <span className="text-slate-300">•</span>
                    <a href={`mailto:${data.header.email}`} className="underline decoration-slate-200 underline-offset-4">{data.header.email}</a>
                </div>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 mt-3 text-[10pt] font-bold text-slate-800 uppercase tracking-wide">
                    {data.header.linkedin && <a href={data.header.linkedin} className="underline decoration-slate-200 underline-offset-4 hover:decoration-slate-400">LinkedIn</a>}
                    {data.header.github && <a href={data.header.github} className="underline decoration-slate-200 underline-offset-4 hover:decoration-slate-400">GitHub</a>}
                    {data.header.leetcode && <a href={data.header.leetcode} className="underline decoration-slate-200 underline-offset-4 hover:decoration-slate-400">LeetCode</a>}
                    {data.header.portfolio && <a href={data.header.portfolio} className="underline decoration-slate-200 underline-offset-4 hover:decoration-slate-400">Portfolio</a>}
                    {data.header.customLinks?.map((link, i) => (
                        <a key={i} href={link.url} className="underline decoration-slate-200 underline-offset-4 hover:decoration-slate-400 font-bold">{link.name}</a>
                    ))}
                </div>
            </header>

            <div className="space-y-8 flex-1">
                {/* Education */}
                <section className="space-y-2">
                    <h2 className="text-[12pt] font-bold uppercase tracking-tight border-b-[1pt] border-black pb-0.5">Education</h2>
                    {data.education.map((edu, i) => (
                        <div key={i} className="flex justify-between items-start">
                            <div>
                                <div className="font-bold text-[11pt]">{edu.institution}</div>
                                <div className="italic text-[10.5pt]">{edu.degree}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-[10.5pt]">{edu.duration}</div>
                                {edu.cgpa && <div className="text-[10pt] font-bold">GPA: {edu.cgpa}</div>}
                            </div>
                        </div>
                    ))}
                </section>

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section className="space-y-3">
                        <h2 className="text-[12pt] font-bold uppercase tracking-tight border-b-[1pt] border-black pb-0.5">Professional Experience</h2>
                        {data.experience.map((exp, i) => (
                            <div key={i} className="space-y-1.5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="font-bold text-[11pt]">{exp.organization}</span>
                                        <span className="mx-3 text-slate-300">|</span>
                                        <span className="italic text-[10.5pt]">{exp.role}</span>
                                    </div>
                                    <div className="font-bold text-[10.5pt]">{exp.duration}</div>
                                </div>
                                <ul className="list-disc list-outside ml-6 space-y-1 text-[10.5pt] text-slate-800">
                                    {exp.bullets.map((bullet, j) => (
                                        <li key={j} className="pl-1">{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {/* Projects */}
                {data.projects.length > 0 && (
                    <section className="space-y-3">
                        <h2 className="text-[12pt] font-bold uppercase tracking-tight border-b-[1pt] border-black pb-0.5">Key Projects</h2>
                        {data.projects.map((proj, i) => (
                            <div key={i} className="space-y-1.5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="font-bold text-[11pt]">{proj.name}</span>
                                        <span className="mx-3 text-slate-300">|</span>
                                        <span className="italic text-[10.5pt] font-medium text-slate-600">{proj.techStack}</span>
                                    </div>
                                    {proj.link && <a href={proj.link} className="underline text-[10pt] font-bold text-slate-700">Project Link →</a>}
                                </div>
                                <ul className="list-disc list-outside ml-6 space-y-1 text-[10.5pt] text-slate-800">
                                    {proj.bullets.map((bullet, j) => (
                                        <li key={j} className="pl-1">{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {/* Skills */}
                {data.skills.categories && data.skills.categories.some(cat => cat.skills && cat.category) && (
                    <section className="space-y-2">
                        <h2 className="text-[12pt] font-bold uppercase tracking-tight border-b-[1pt] border-black pb-0.5">Technical Expertise</h2>
                        <div className="space-y-1">
                            {(data.skills.categories || []).map((cat, i) => (
                                cat.skills && <p key={i} className="text-[10.5pt]"><strong className="font-bold uppercase text-[9.5pt] tracking-wide mr-3">{cat.category}:</strong> {cat.skills}</p>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};
