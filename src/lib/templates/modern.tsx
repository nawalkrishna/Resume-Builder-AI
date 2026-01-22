import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-gray-800 p-8 font-sans leading-relaxed w-full max-w-[8.5in] mx-auto min-h-[11in]">
            {/* Header - Modern gradient accent */}
            <header className="mb-6">
                <div className="flex items-end justify-between border-b-4 border-emerald-500 pb-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{data.header.name}</h1>
                        <p className="text-emerald-600 font-medium mt-1">{data.header.location}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600 space-y-0.5">
                        <p>{data.header.phone}</p>
                        <p>{data.header.email}</p>
                        <div className="flex gap-3 justify-end mt-1">
                            {data.header.linkedin && <a href={data.header.linkedin} className="text-emerald-600 hover:underline">LinkedIn</a>}
                            {data.header.github && <a href={data.header.github} className="text-emerald-600 hover:underline">GitHub</a>}
                            {data.header.portfolio && <a href={data.header.portfolio} className="text-emerald-600 hover:underline">Portfolio</a>}
                        </div>
                    </div>
                </div>
            </header>

            {/* Experience */}
            {data.experience.length > 0 && (
                <section className="mb-5">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">Experience</h2>
                    {data.experience.map((exp, i) => (
                        <div key={i} className="mb-4">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-gray-900">{exp.role}</h3>
                                <span className="text-sm text-gray-500">{exp.duration}</span>
                            </div>
                            <p className="text-emerald-600 text-sm font-medium">{exp.organization}</p>
                            <ul className="mt-2 space-y-1 text-sm text-gray-700">
                                {exp.bullets.map((bullet, j) => (
                                    <li key={j} className="flex items-start gap-2">
                                        <span className="text-emerald-500 mt-1.5">•</span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            <section className="mb-5">
                <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">Education</h2>
                {data.education.map((edu, i) => (
                    <div key={i} className="flex justify-between items-baseline mb-2">
                        <div>
                            <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                            <p className="text-sm text-gray-600">{edu.institution} {edu.cgpa && `• ${edu.cgpa}`}</p>
                        </div>
                        <span className="text-sm text-gray-500">{edu.duration}</span>
                    </div>
                ))}
            </section>

            {/* Projects */}
            {data.projects.length > 0 && (
                <section className="mb-5">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">Projects</h2>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="mb-3">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-gray-900">{proj.name}</h3>
                                {proj.link && <a href={proj.link} className="text-xs text-emerald-600 hover:underline">View →</a>}
                            </div>
                            <p className="text-xs text-gray-500 mb-1">{proj.techStack}</p>
                            <ul className="space-y-0.5 text-sm text-gray-700">
                                {proj.bullets.map((bullet, j) => (
                                    <li key={j} className="flex items-start gap-2">
                                        <span className="text-emerald-500 mt-1.5">•</span>
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
                <section className="mb-5">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.categories.map((cat, i) => (
                            cat.skills && (
                                <div key={i} className="text-sm">
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
                        <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">Achievements</h2>
                        <ul className="text-sm text-gray-700 space-y-1">
                            {data.achievements.map((ach, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-emerald-500">•</span>
                                    <span>{ach}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
                {data.certifications.length > 0 && (
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">Certifications</h2>
                        <ul className="text-sm text-gray-700 space-y-1">
                            {data.certifications.map((cert, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-emerald-500">•</span>
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
