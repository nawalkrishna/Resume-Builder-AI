import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const TechTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-slate-900 text-slate-200 p-8 font-mono w-full max-w-[8.5in] mx-auto min-h-[11in]">
            {/* Header - Terminal Style */}
            <header className="mb-6 border border-slate-700 rounded-lg p-4 bg-slate-800">
                <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-slate-500 text-xs ml-2">~/resume/{data.header.name.toLowerCase().replace(" ", "-")}</span>
                </div>
                <h1 className="text-3xl font-bold text-green-400">$ {data.header.name}</h1>
                <div className="mt-2 text-sm text-slate-400">
                    <p><span className="text-cyan-400">location:</span> {data.header.location}</p>
                    <p><span className="text-cyan-400">email:</span> {data.header.email}</p>
                    <p><span className="text-cyan-400">phone:</span> {data.header.phone}</p>
                    <div className="flex gap-4 mt-1">
                        {data.header.github && <a href={data.header.github} className="text-green-400 hover:underline">github</a>}
                        {data.header.linkedin && <a href={data.header.linkedin} className="text-blue-400 hover:underline">linkedin</a>}
                        {data.header.portfolio && <a href={data.header.portfolio} className="text-purple-400 hover:underline">portfolio</a>}
                    </div>
                </div>
            </header>

            {/* Skills - Code block style */}
            {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                <section className="mb-5">
                    <h2 className="text-green-400 mb-2">{"// skills"}</h2>
                    <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                        <pre className="text-xs">
                            {`const skills = {\n`}
                            {data.skills.categories.map((cat, i) => (
                                cat.skills && `  ${cat.category?.toLowerCase().replace(/\s+/g, "_")}: ["${cat.skills?.split(",").map(s => s.trim()).join('", "')}"],\n`
                            ))}
                            {`};`}
                        </pre>
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
                <section className="mb-5">
                    <h2 className="text-green-400 mb-2">{"// experience"}</h2>
                    {data.experience.map((exp, i) => (
                        <div key={i} className="mb-3 pl-4 border-l-2 border-green-500">
                            <div className="flex justify-between">
                                <span className="text-cyan-400 font-bold">{exp.role}</span>
                                <span className="text-slate-500 text-xs">{exp.duration}</span>
                            </div>
                            <p className="text-yellow-400 text-sm">@ {exp.organization}</p>
                            <ul className="mt-1 text-sm text-slate-300">
                                {exp.bullets.map((bullet, j) => (
                                    <li key={j} className="flex items-start gap-2">
                                        <span className="text-green-400">→</span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
                <section className="mb-5">
                    <h2 className="text-green-400 mb-2">{"// projects"}</h2>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="mb-3 bg-slate-800 rounded-lg p-3 border border-slate-700">
                            <div className="flex justify-between items-center">
                                <span className="text-purple-400 font-bold">{proj.name}</span>
                                {proj.link && <a href={proj.link} className="text-xs text-blue-400 hover:underline">[repo]</a>}
                            </div>
                            <p className="text-xs text-slate-500 mt-1"># {proj.techStack}</p>
                            <ul className="mt-2 text-sm text-slate-300">
                                {proj.bullets.map((bullet, j) => (
                                    <li key={j}>• {bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            <section className="mb-5">
                <h2 className="text-green-400 mb-2">{"// education"}</h2>
                {data.education.map((edu, i) => (
                    <div key={i} className="flex justify-between text-sm">
                        <div>
                            <span className="text-cyan-400">{edu.degree}</span>
                            <span className="text-slate-500"> @ </span>
                            <span className="text-yellow-400">{edu.institution}</span>
                        </div>
                        <span className="text-slate-500">{edu.duration}</span>
                    </div>
                ))}
            </section>

            {/* Certifications */}
            {data.certifications.length > 0 && (
                <section>
                    <h2 className="text-green-400 mb-2">{"// certifications"}</h2>
                    <ul className="text-sm">
                        {data.certifications.map((cert, i) => (
                            <li key={i} className="text-slate-300">✓ {cert}</li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
};
