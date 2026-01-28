import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

// Export as ATSTemplate for registry
export { ATSResumeTemplate as ATSTemplate };

export const ATSResumeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-black p-[20mm] font-serif leading-tight w-[210mm] mx-auto min-h-[297mm] shadow-none print:shadow-none flex flex-col gap-4 text-[10pt]">
            {/* Header */}
            <header className="text-center border-b-[1.5pt] border-black pb-2">
                <h1 className="text-2xl font-bold uppercase tracking-wide mb-1 leading-none">{data.header.name}</h1>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-0.5 text-[9.5pt] font-medium text-slate-700">
                    <span>{data.header.location}</span>
                    <span className="text-slate-300">•</span>
                    <span>{data.header.phone}</span>
                    <span className="text-slate-300">•</span>
                    <a href={`mailto:${data.header.email}`} className="underline decoration-slate-200 underline-offset-4">{data.header.email}</a>
                </div>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-0.5 mt-1.5 text-[9pt] font-bold text-slate-800 uppercase tracking-wide">
                    {data.header.linkedin && <a href={data.header.linkedin} className="underline decoration-slate-200 underline-offset-4 hover:decoration-slate-400">LinkedIn</a>}
                    {data.header.github && <a href={data.header.github} className="underline decoration-slate-200 underline-offset-4 hover:decoration-slate-400">GitHub</a>}
                    {data.header.leetcode && <a href={data.header.leetcode} className="underline decoration-slate-200 underline-offset-4 hover:decoration-slate-400">LeetCode</a>}
                    {data.header.portfolio && <a href={data.header.portfolio} className="underline decoration-slate-200 underline-offset-4 hover:decoration-slate-400">Portfolio</a>}
                    {data.header.customLinks?.map((link, i) => (
                        <a key={i} href={link.url} className="underline decoration-slate-200 underline-offset-4 hover:decoration-slate-400 font-bold">{link.name}</a>
                    ))}
                </div>
            </header>

            <div className="space-y-4 flex-1">
                {/* Education */}
                <section className="space-y-1.5">
                    <h2 className="text-[11pt] font-bold uppercase tracking-tight border-b-[1pt] border-black pb-0.5">Education</h2>
                    {data.education.map((edu, i) => (
                        <div key={i} className="flex justify-between items-start">
                            <div>
                                <div className="font-bold text-[10.5pt]">{edu.institution}</div>
                                <div className="italic text-[10pt]">{edu.degree}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-[10pt]">{edu.duration}</div>
                                {edu.cgpa && <div className="text-[9pt] font-bold">GPA: {edu.cgpa}</div>}
                            </div>
                        </div>
                    ))}
                </section>

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section className="space-y-1.5">
                        <h2 className="text-[11pt] font-bold uppercase tracking-tight border-b-[1pt] border-black pb-0.5">Experience</h2>
                        {data.experience.map((exp, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="font-bold text-[10.5pt]">{exp.organization}</span>
                                        <span className="mx-2 text-slate-300">|</span>
                                        <span className="italic text-[10pt]">{exp.role}</span>
                                    </div>
                                    <div className="font-bold text-[10pt]">{exp.duration}</div>
                                </div>
                                <ul className="list-disc list-outside ml-5 space-y-0.5 text-[10pt] text-slate-800">
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
                    <section className="space-y-1.5">
                        <h2 className="text-[11pt] font-bold uppercase tracking-tight border-b-[1pt] border-black pb-0.5">Projects</h2>
                        {data.projects.map((proj, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="font-bold text-[10.5pt]">{proj.name}</span>
                                        <span className="mx-2 text-slate-300">|</span>
                                        <span className="italic text-[10pt] font-medium text-slate-600">{proj.techStack}</span>
                                    </div>
                                    {proj.link && <a href={proj.link} className="underline text-[9.5pt] font-bold text-slate-700">Link →</a>}
                                </div>
                                <ul className="list-disc list-outside ml-5 space-y-0.5 text-[10pt] text-slate-800">
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
                    <section className="space-y-1.5">
                        <h2 className="text-[11pt] font-bold uppercase tracking-tight border-b-[1pt] border-black pb-0.5">Expertise</h2>
                        <div className="space-y-0.5">
                            {(data.skills.categories || []).map((cat, i) => (
                                cat.skills && <p key={i} className="text-[10pt]"><strong className="font-bold uppercase text-[9pt] tracking-wide mr-2">{cat.category}:</strong> {cat.skills}</p>
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements */}
                {data.achievements.length > 0 && (
                    <section className="space-y-1.5">
                        <h2 className="text-[11pt] font-bold uppercase tracking-tight border-b-[1pt] border-black pb-0.5">Achievements</h2>
                        <ul className="list-disc list-outside ml-5 space-y-0.5 text-[10pt] text-slate-800">
                            {data.achievements.map((ach, i) => (
                                <li key={i} className="pl-1">{ach}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Certifications */}
                {data.certifications.length > 0 && (
                    <section className="space-y-1.5">
                        <h2 className="text-[11pt] font-bold uppercase tracking-tight border-b-[1pt] border-black pb-0.5">Certifications</h2>
                        <ul className="list-disc list-outside ml-5 space-y-0.5 text-[10pt] text-slate-800">
                            {data.certifications.map((cert, i) => (
                                <li key={i} className="pl-1">{cert}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
};
