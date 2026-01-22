import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const ExecutiveTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-gray-900 w-full max-w-[8.5in] mx-auto min-h-[11in]">
            {/* Header - Executive Banner */}
            <header className="bg-slate-900 text-white px-10 py-8">
                <h1 className="text-4xl font-light tracking-wide">{data.header.name}</h1>
                <div className="mt-3 flex flex-wrap gap-6 text-sm text-slate-300">
                    <span>{data.header.email}</span>
                    <span>{data.header.phone}</span>
                    <span>{data.header.location}</span>
                </div>
                <div className="mt-2 flex gap-4 text-sm">
                    {data.header.linkedin && <a href={data.header.linkedin} className="text-slate-400 hover:text-white">LinkedIn</a>}
                    {data.header.github && <a href={data.header.github} className="text-slate-400 hover:text-white">GitHub</a>}
                    {data.header.portfolio && <a href={data.header.portfolio} className="text-slate-400 hover:text-white">Portfolio</a>}
                </div>
            </header>

            <div className="px-10 py-8">
                {/* Experience */}
                {data.experience.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500 border-b border-slate-200 pb-2 mb-4">
                            Professional Experience
                        </h2>
                        {data.experience.map((exp, i) => (
                            <div key={i} className="mb-5">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-lg font-semibold text-slate-900">{exp.role}</h3>
                                    <span className="text-sm text-slate-500">{exp.duration}</span>
                                </div>
                                <p className="text-slate-600 font-medium">{exp.organization}</p>
                                <ul className="mt-2 text-sm text-slate-700 space-y-1">
                                    {exp.bullets.map((bullet, j) => (
                                        <li key={j} className="flex items-start gap-2">
                                            <span className="text-slate-400">—</span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {/* Two Column Layout */}
                <div className="grid grid-cols-2 gap-8">
                    {/* Left */}
                    <div>
                        {/* Education */}
                        <section className="mb-6">
                            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500 border-b border-slate-200 pb-2 mb-4">
                                Education
                            </h2>
                            {data.education.map((edu, i) => (
                                <div key={i} className="mb-3">
                                    <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                                    <p className="text-sm text-slate-600">{edu.institution}</p>
                                    <p className="text-xs text-slate-500">{edu.duration} {edu.cgpa && `| ${edu.cgpa}`}</p>
                                </div>
                            ))}
                        </section>

                        {/* Certifications */}
                        {data.certifications.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500 border-b border-slate-200 pb-2 mb-4">
                                    Certifications
                                </h2>
                                <ul className="text-sm text-slate-700 space-y-1">
                                    {data.certifications.map((cert, i) => (
                                        <li key={i}>• {cert}</li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>

                    {/* Right */}
                    <div>
                        {/* Skills */}
                        {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                            <section className="mb-6">
                                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500 border-b border-slate-200 pb-2 mb-4">
                                    Core Competencies
                                </h2>
                                {data.skills.categories.map((cat, i) => (
                                    cat.skills && (
                                        <div key={i} className="mb-2">
                                            <p className="font-semibold text-slate-900 text-sm">{cat.category}</p>
                                            <p className="text-sm text-slate-600">{cat.skills}</p>
                                        </div>
                                    )
                                ))}
                            </section>
                        )}

                        {/* Achievements */}
                        {data.achievements.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500 border-b border-slate-200 pb-2 mb-4">
                                    Key Achievements
                                </h2>
                                <ul className="text-sm text-slate-700 space-y-1">
                                    {data.achievements.map((ach, i) => (
                                        <li key={i}>• {ach}</li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
