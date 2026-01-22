import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const MinimalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-gray-800 p-12 font-sans leading-loose w-full max-w-[8.5in] mx-auto min-h-[11in]">
            {/* Header - Ultra minimal */}
            <header className="mb-10">
                <h1 className="text-4xl font-light text-gray-900 tracking-tight">{data.header.name}</h1>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>{data.header.email}</span>
                    <span>{data.header.phone}</span>
                    <span>{data.header.location}</span>
                </div>
                <div className="mt-2 flex gap-4 text-sm text-gray-400">
                    {data.header.linkedin && <a href={data.header.linkedin} className="hover:text-gray-600">LinkedIn</a>}
                    {data.header.github && <a href={data.header.github} className="hover:text-gray-600">GitHub</a>}
                    {data.header.portfolio && <a href={data.header.portfolio} className="hover:text-gray-600">Portfolio</a>}
                </div>
            </header>

            {/* Experience */}
            {data.experience.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">Experience</h2>
                    <div className="space-y-8">
                        {data.experience.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-medium text-gray-900">{exp.role}</h3>
                                    <span className="text-sm text-gray-400">{exp.duration}</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-3">{exp.organization}</p>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {exp.bullets.map((bullet, j) => (
                                        <li key={j}>{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            <section className="mb-10">
                <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">Education</h2>
                <div className="space-y-4">
                    {data.education.map((edu, i) => (
                        <div key={i}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                                <span className="text-sm text-gray-400">{edu.duration}</span>
                            </div>
                            <p className="text-sm text-gray-500">{edu.institution} {edu.cgpa && `— ${edu.cgpa}`}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects */}
            {data.projects.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">Projects</h2>
                    <div className="space-y-6">
                        {data.projects.map((proj, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-medium text-gray-900">{proj.name}</h3>
                                    {proj.link && <a href={proj.link} className="text-xs text-gray-400 hover:text-gray-600">↗</a>}
                                </div>
                                <p className="text-xs text-gray-400 mb-2">{proj.techStack}</p>
                                <ul className="space-y-1 text-sm text-gray-600">
                                    {proj.bullets.map((bullet, j) => (
                                        <li key={j}>{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                <section className="mb-10">
                    <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">Skills</h2>
                    <div className="text-sm text-gray-600">
                        {data.skills.categories.filter(cat => cat.skills).map((cat, i, arr) => (
                            <span key={i}>
                                {cat.skills}{i < arr.length - 1 ? " · " : ""}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Achievements & Certifications */}
            <div className="grid grid-cols-2 gap-8">
                {data.achievements.length > 0 && (
                    <section>
                        <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">Achievements</h2>
                        <ul className="text-sm text-gray-600 space-y-2">
                            {data.achievements.map((ach, i) => (
                                <li key={i}>{ach}</li>
                            ))}
                        </ul>
                    </section>
                )}
                {data.certifications.length > 0 && (
                    <section>
                        <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">Certifications</h2>
                        <ul className="text-sm text-gray-600 space-y-2">
                            {data.certifications.map((cert, i) => (
                                <li key={i}>{cert}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
};
