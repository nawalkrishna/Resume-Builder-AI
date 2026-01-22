import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const CompactTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-gray-900 p-6 font-sans text-[10pt] leading-snug w-full max-w-[8.5in] mx-auto min-h-[11in]">
            {/* Header - Compact */}
            <header className="border-b border-gray-300 pb-2 mb-3">
                <div className="flex justify-between items-start">
                    <h1 className="text-xl font-bold">{data.header.name}</h1>
                    <div className="text-right text-xs text-gray-600">
                        <p>{data.header.email} | {data.header.phone}</p>
                        <p>{data.header.location}</p>
                    </div>
                </div>
                <div className="flex gap-3 text-xs text-blue-600 mt-1">
                    {data.header.linkedin && <a href={data.header.linkedin}>LinkedIn</a>}
                    {data.header.github && <a href={data.header.github}>GitHub</a>}
                    {data.header.portfolio && <a href={data.header.portfolio}>Portfolio</a>}
                </div>
            </header>

            {/* Skills - Top for quick scanning */}
            {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                <section className="mb-2">
                    <h2 className="text-xs font-bold uppercase text-gray-500 mb-1">Skills</h2>
                    <div className="text-xs">
                        {data.skills.categories.map((cat, i) => (
                            cat.skills && (
                                <span key={i}>
                                    <strong>{cat.category}:</strong> {cat.skills}
                                    {i < data.skills.categories!.length - 1 ? " | " : ""}
                                </span>
                            )
                        ))}
                    </div>
                </section>
            )}

            {/* Experience - Condensed */}
            {data.experience.length > 0 && (
                <section className="mb-2">
                    <h2 className="text-xs font-bold uppercase text-gray-500 mb-1">Experience</h2>
                    {data.experience.map((exp, i) => (
                        <div key={i} className="mb-2">
                            <div className="flex justify-between">
                                <span><strong>{exp.role}</strong> @ {exp.organization}</span>
                                <span className="text-gray-500 text-xs">{exp.duration}</span>
                            </div>
                            <ul className="ml-3 text-xs">
                                {exp.bullets.map((bullet, j) => (
                                    <li key={j}>• {bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            <section className="mb-2">
                <h2 className="text-xs font-bold uppercase text-gray-500 mb-1">Education</h2>
                {data.education.map((edu, i) => (
                    <div key={i} className="flex justify-between text-xs">
                        <span><strong>{edu.degree}</strong>, {edu.institution} {edu.cgpa && `(${edu.cgpa})`}</span>
                        <span className="text-gray-500">{edu.duration}</span>
                    </div>
                ))}
            </section>

            {/* Projects */}
            {data.projects.length > 0 && (
                <section className="mb-2">
                    <h2 className="text-xs font-bold uppercase text-gray-500 mb-1">Projects</h2>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="mb-1">
                            <div className="flex justify-between text-xs">
                                <span><strong>{proj.name}</strong> | {proj.techStack}</span>
                                {proj.link && <a href={proj.link} className="text-blue-600">Link</a>}
                            </div>
                            <ul className="ml-3 text-xs">
                                {proj.bullets.map((bullet, j) => (
                                    <li key={j}>• {bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Two columns for achievements and certs */}
            <div className="grid grid-cols-2 gap-4">
                {data.achievements.length > 0 && (
                    <section>
                        <h2 className="text-xs font-bold uppercase text-gray-500 mb-1">Achievements</h2>
                        <ul className="text-xs">
                            {data.achievements.map((ach, i) => (
                                <li key={i}>• {ach}</li>
                            ))}
                        </ul>
                    </section>
                )}
                {data.certifications.length > 0 && (
                    <section>
                        <h2 className="text-xs font-bold uppercase text-gray-500 mb-1">Certifications</h2>
                        <ul className="text-xs">
                            {data.certifications.map((cert, i) => (
                                <li key={i}>• {cert}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
};
