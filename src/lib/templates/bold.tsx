import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const BoldTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-gray-900 w-full max-w-[8.5in] mx-auto min-h-[11in]">
            {/* Header - Bold Red Accent */}
            <header className="bg-red-600 text-white px-8 py-6">
                <h1 className="text-4xl font-black uppercase tracking-wide">{data.header.name}</h1>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-red-100">
                    <span>{data.header.email}</span>
                    <span>|</span>
                    <span>{data.header.phone}</span>
                    <span>|</span>
                    <span>{data.header.location}</span>
                </div>
                <div className="mt-1 flex gap-4 text-sm">
                    {data.header.linkedin && <a href={data.header.linkedin} className="text-red-200 hover:text-white">LinkedIn</a>}
                    {data.header.github && <a href={data.header.github} className="text-red-200 hover:text-white">GitHub</a>}
                    {data.header.portfolio && <a href={data.header.portfolio} className="text-red-200 hover:text-white">Portfolio</a>}
                </div>
            </header>

            <div className="p-8">
                {/* Experience */}
                {data.experience.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-xl font-black uppercase text-red-600 border-b-4 border-red-600 pb-1 mb-4">
                            Experience
                        </h2>
                        {data.experience.map((exp, i) => (
                            <div key={i} className="mb-5">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-lg font-bold">{exp.role}</h3>
                                    <span className="text-sm font-bold text-red-600">{exp.duration}</span>
                                </div>
                                <p className="text-gray-600 font-semibold">{exp.organization}</p>
                                <ul className="mt-2 text-sm text-gray-700 space-y-1">
                                    {exp.bullets.map((bullet, j) => (
                                        <li key={j} className="flex items-start gap-2">
                                            <span className="text-red-600 font-bold">▸</span>
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
                    <h2 className="text-xl font-black uppercase text-red-600 border-b-4 border-red-600 pb-1 mb-4">
                        Education
                    </h2>
                    {data.education.map((edu, i) => (
                        <div key={i} className="mb-3">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold">{edu.degree}</h3>
                                <span className="text-sm font-bold text-red-600">{edu.duration}</span>
                            </div>
                            <p className="text-gray-600">{edu.institution} {edu.cgpa && `• ${edu.cgpa}`}</p>
                        </div>
                    ))}
                </section>

                {/* Projects */}
                {data.projects.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-xl font-black uppercase text-red-600 border-b-4 border-red-600 pb-1 mb-4">
                            Projects
                        </h2>
                        {data.projects.map((proj, i) => (
                            <div key={i} className="mb-4">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold">{proj.name}</h3>
                                    {proj.link && <a href={proj.link} className="text-sm text-red-600 font-bold hover:underline">VIEW →</a>}
                                </div>
                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">{proj.techStack}</p>
                                <ul className="text-sm text-gray-700 space-y-0.5">
                                    {proj.bullets.map((bullet, j) => (
                                        <li key={j} className="flex items-start gap-2">
                                            <span className="text-red-600 font-bold">▸</span>
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
                        <h2 className="text-xl font-black uppercase text-red-600 border-b-4 border-red-600 pb-1 mb-4">
                            Skills
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {data.skills.categories.map((cat, i) => (
                                cat.skills && (
                                    <div key={i}>
                                        <h3 className="font-bold text-gray-900">{cat.category}</h3>
                                        <p className="text-sm text-gray-600">{cat.skills}</p>
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
                            <h2 className="text-lg font-black uppercase text-red-600 border-b-4 border-red-600 pb-1 mb-3">
                                Achievements
                            </h2>
                            <ul className="text-sm text-gray-700 space-y-1">
                                {data.achievements.map((ach, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-red-600 font-bold">★</span>
                                        <span>{ach}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                    {data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-lg font-black uppercase text-red-600 border-b-4 border-red-600 pb-1 mb-3">
                                Certifications
                            </h2>
                            <ul className="text-sm text-gray-700 space-y-1">
                                {data.certifications.map((cert, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-red-600 font-bold">✓</span>
                                        <span>{cert}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};
