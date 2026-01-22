import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const ClassicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-black p-10 font-serif leading-relaxed w-full max-w-[8.5in] mx-auto min-h-[11in]" style={{ fontFamily: "Times New Roman, serif" }}>
            {/* Header - Centered Classic Style */}
            <header className="text-center mb-6 border-b-2 border-gray-800 pb-4">
                <h1 className="text-3xl font-bold tracking-wide uppercase">{data.header.name}</h1>
                <div className="mt-2 text-sm space-x-3">
                    <span>{data.header.location}</span>
                    <span>•</span>
                    <span>{data.header.phone}</span>
                    <span>•</span>
                    <span>{data.header.email}</span>
                </div>
                <div className="mt-1 text-sm space-x-3">
                    {data.header.linkedin && <a href={data.header.linkedin} className="underline">LinkedIn</a>}
                    {data.header.github && <a href={data.header.github} className="underline">GitHub</a>}
                    {data.header.portfolio && <a href={data.header.portfolio} className="underline">Portfolio</a>}
                </div>
            </header>

            {/* Education */}
            <section className="mb-5">
                <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2">Education</h2>
                {data.education.map((edu, i) => (
                    <div key={i} className="mb-2">
                        <div className="flex justify-between">
                            <span className="font-bold">{edu.institution}</span>
                            <span className="italic">{edu.duration}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="italic">{edu.degree}</span>
                            {edu.cgpa && <span>GPA: {edu.cgpa}</span>}
                        </div>
                    </div>
                ))}
            </section>

            {/* Experience */}
            {data.experience.length > 0 && (
                <section className="mb-5">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2">Professional Experience</h2>
                    {data.experience.map((exp, i) => (
                        <div key={i} className="mb-3">
                            <div className="flex justify-between">
                                <span className="font-bold">{exp.organization}</span>
                                <span className="italic">{exp.duration}</span>
                            </div>
                            <p className="italic">{exp.role}</p>
                            <ul className="list-disc list-inside mt-1 text-sm">
                                {exp.bullets.map((bullet, j) => (
                                    <li key={j}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
                <section className="mb-5">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2">Projects</h2>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="mb-3">
                            <div className="flex justify-between">
                                <span className="font-bold">{proj.name}</span>
                                {proj.link && <a href={proj.link} className="text-sm underline">[Link]</a>}
                            </div>
                            <p className="italic text-sm">{proj.techStack}</p>
                            <ul className="list-disc list-inside mt-1 text-sm">
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
                <section className="mb-5">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2">Technical Skills</h2>
                    {data.skills.categories.map((cat, i) => (
                        cat.skills && (
                            <p key={i} className="text-sm">
                                <span className="font-bold">{cat.category}:</span> {cat.skills}
                            </p>
                        )
                    ))}
                </section>
            )}

            {/* Achievements */}
            {data.achievements.length > 0 && (
                <section className="mb-5">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2">Achievements</h2>
                    <ul className="list-disc list-inside text-sm">
                        {data.achievements.map((ach, i) => (
                            <li key={i}>{ach}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
                <section className="mb-5">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2">Certifications</h2>
                    <ul className="list-disc list-inside text-sm">
                        {data.certifications.map((cert, i) => (
                            <li key={i}>{cert}</li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
};
