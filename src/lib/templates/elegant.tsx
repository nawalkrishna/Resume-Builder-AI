import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const ElegantTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-gray-800 p-10 font-sans w-full max-w-[8.5in] mx-auto min-h-[11in]">
            {/* Header - Elegant with border accent */}
            <header className="relative mb-8 pb-6">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-purple-600"></div>
                <div className="pl-6">
                    <h1 className="text-4xl font-light text-gray-900 tracking-tight">{data.header.name}</h1>
                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <span className="text-violet-500">✉</span> {data.header.email}
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="text-violet-500">☎</span> {data.header.phone}
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="text-violet-500">◎</span> {data.header.location}
                        </span>
                    </div>
                    <div className="mt-2 flex gap-4 text-sm">
                        {data.header.linkedin && <a href={data.header.linkedin} className="text-violet-600 hover:underline">LinkedIn</a>}
                        {data.header.github && <a href={data.header.github} className="text-violet-600 hover:underline">GitHub</a>}
                        {data.header.portfolio && <a href={data.header.portfolio} className="text-violet-600 hover:underline">Portfolio</a>}
                    </div>
                </div>
            </header>

            {/* Experience */}
            {data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-4 flex items-center gap-3">
                        <span className="flex-1 h-px bg-gradient-to-r from-violet-200 to-transparent"></span>
                        Experience
                        <span className="flex-1 h-px bg-gradient-to-l from-violet-200 to-transparent"></span>
                    </h2>
                    {data.experience.map((exp, i) => (
                        <div key={i} className="mb-5 pl-4 border-l-2 border-violet-100">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                                <span className="text-sm text-gray-400">{exp.duration}</span>
                            </div>
                            <p className="text-violet-600 text-sm">{exp.organization}</p>
                            <ul className="mt-2 text-sm text-gray-600 space-y-1">
                                {exp.bullets.map((bullet, j) => (
                                    <li key={j} className="flex items-start gap-2">
                                        <span className="text-violet-400 mt-1">◆</span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            <section className="mb-6">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-4 flex items-center gap-3">
                    <span className="flex-1 h-px bg-gradient-to-r from-violet-200 to-transparent"></span>
                    Education
                    <span className="flex-1 h-px bg-gradient-to-l from-violet-200 to-transparent"></span>
                </h2>
                {data.education.map((edu, i) => (
                    <div key={i} className="mb-3 pl-4 border-l-2 border-violet-100">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                            <span className="text-sm text-gray-400">{edu.duration}</span>
                        </div>
                        <p className="text-sm text-gray-600">{edu.institution} {edu.cgpa && `• ${edu.cgpa}`}</p>
                    </div>
                ))}
            </section>

            {/* Projects */}
            {data.projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-4 flex items-center gap-3">
                        <span className="flex-1 h-px bg-gradient-to-r from-violet-200 to-transparent"></span>
                        Projects
                        <span className="flex-1 h-px bg-gradient-to-l from-violet-200 to-transparent"></span>
                    </h2>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="mb-4 pl-4 border-l-2 border-violet-100">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                                {proj.link && <a href={proj.link} className="text-xs text-violet-600 hover:underline">View →</a>}
                            </div>
                            <p className="text-xs text-gray-400 mb-1">{proj.techStack}</p>
                            <ul className="text-sm text-gray-600 space-y-0.5">
                                {proj.bullets.map((bullet, j) => (
                                    <li key={j} className="flex items-start gap-2">
                                        <span className="text-violet-400 mt-1">◆</span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                <section className="mb-6">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-4 flex items-center gap-3">
                        <span className="flex-1 h-px bg-gradient-to-r from-violet-200 to-transparent"></span>
                        Skills
                        <span className="flex-1 h-px bg-gradient-to-l from-violet-200 to-transparent"></span>
                    </h2>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        {data.skills.categories.map((cat, i) => (
                            cat.skills && (
                                <div key={i}>
                                    <span className="font-medium text-gray-900">{cat.category}:</span>{" "}
                                    <span className="text-gray-600">{cat.skills}</span>
                                </div>
                            )
                        ))}
                    </div>
                </section>
            )}

            {/* Achievements & Certifications */}
            <div className="grid grid-cols-2 gap-6">
                {data.achievements.length > 0 && (
                    <section>
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-2">Achievements</h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                            {data.achievements.map((ach, i) => (
                                <li key={i}>◆ {ach}</li>
                            ))}
                        </ul>
                    </section>
                )}
                {data.certifications.length > 0 && (
                    <section>
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-2">Certifications</h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                            {data.certifications.map((cert, i) => (
                                <li key={i}>◆ {cert}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
};
