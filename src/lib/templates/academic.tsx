import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const AcademicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-gray-900 p-10 font-serif w-full max-w-[8.5in] mx-auto min-h-[11in]" style={{ fontFamily: "Georgia, serif" }}>
            {/* Header - Academic Style */}
            <header className="text-center mb-8 border-b-2 border-amber-700 pb-4">
                <h1 className="text-3xl font-bold text-amber-900">{data.header.name}</h1>
                <div className="mt-2 text-sm text-gray-600">
                    {data.header.location} | {data.header.phone} | {data.header.email}
                </div>
                <div className="mt-1 text-sm text-amber-700 space-x-4">
                    {data.header.linkedin && <a href={data.header.linkedin} className="hover:underline">LinkedIn</a>}
                    {data.header.github && <a href={data.header.github} className="hover:underline">GitHub</a>}
                    {data.header.portfolio && <a href={data.header.portfolio} className="hover:underline">Portfolio</a>}
                </div>
            </header>

            {/* Education - Prominent for academics */}
            <section className="mb-6">
                <h2 className="text-lg font-bold text-amber-900 border-b border-amber-300 pb-1 mb-3">EDUCATION</h2>
                {data.education.map((edu, i) => (
                    <div key={i} className="mb-3">
                        <div className="flex justify-between">
                            <span className="font-bold">{edu.degree}</span>
                            <span className="text-gray-600">{edu.duration}</span>
                        </div>
                        <div className="text-gray-700 italic">{edu.institution}</div>
                        {edu.cgpa && <div className="text-sm text-gray-600">GPA: {edu.cgpa}</div>}
                    </div>
                ))}
            </section>

            {/* Experience - Research/Teaching Focus */}
            {data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-amber-900 border-b border-amber-300 pb-1 mb-3">RESEARCH & PROFESSIONAL EXPERIENCE</h2>
                    {data.experience.map((exp, i) => (
                        <div key={i} className="mb-4">
                            <div className="flex justify-between">
                                <span className="font-bold">{exp.role}</span>
                                <span className="text-gray-600">{exp.duration}</span>
                            </div>
                            <div className="text-gray-700 italic">{exp.organization}</div>
                            <ul className="mt-1 text-sm text-gray-700 list-disc list-inside">
                                {exp.bullets.map((bullet, j) => (
                                    <li key={j}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Projects - Publications Style */}
            {data.projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-amber-900 border-b border-amber-300 pb-1 mb-3">PROJECTS & PUBLICATIONS</h2>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="mb-3">
                            <div className="flex justify-between">
                                <span className="font-bold">{proj.name}</span>
                                {proj.link && <a href={proj.link} className="text-sm text-amber-700 hover:underline">[Link]</a>}
                            </div>
                            <div className="text-sm text-gray-600 italic">{proj.techStack}</div>
                            <ul className="mt-1 text-sm text-gray-700 list-disc list-inside">
                                {proj.bullets.map((bullet, j) => (
                                    <li key={j}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-amber-900 border-b border-amber-300 pb-1 mb-3">TECHNICAL PROFICIENCIES</h2>
                    {data.skills.categories.map((cat, i) => (
                        cat.skills && (
                            <p key={i} className="text-sm"><span className="font-bold">{cat.category}:</span> {cat.skills}</p>
                        )
                    ))}
                </section>
            )}

            {/* Awards & Honors */}
            {data.achievements.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-amber-900 border-b border-amber-300 pb-1 mb-3">AWARDS & HONORS</h2>
                    <ul className="text-sm text-gray-700 list-disc list-inside">
                        {data.achievements.map((ach, i) => (
                            <li key={i}>{ach}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold text-amber-900 border-b border-amber-300 pb-1 mb-3">CERTIFICATIONS & TRAINING</h2>
                    <ul className="text-sm text-gray-700 list-disc list-inside">
                        {data.certifications.map((cert, i) => (
                            <li key={i}>{cert}</li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
};
