import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const ProfessionalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-gray-900 w-full max-w-[8.5in] mx-auto min-h-[11in] flex">
            {/* Left Sidebar */}
            <aside className="w-1/3 bg-slate-800 text-white p-6">
                {/* Photo placeholder */}
                <div className="w-24 h-24 bg-slate-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
                    {data.header.name.split(" ").map(n => n[0]).join("")}
                </div>

                {/* Contact */}
                <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Contact</h3>
                    <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                            <span className="text-slate-400">📍</span> {data.header.location}
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="text-slate-400">📞</span> {data.header.phone}
                        </p>
                        <p className="flex items-center gap-2 break-all">
                            <span className="text-slate-400">✉️</span> {data.header.email}
                        </p>
                        {data.header.linkedin && (
                            <p className="flex items-center gap-2">
                                <span className="text-slate-400">🔗</span> LinkedIn
                            </p>
                        )}
                        {data.header.github && (
                            <p className="flex items-center gap-2">
                                <span className="text-slate-400">💻</span> GitHub
                            </p>
                        )}
                    </div>
                </div>

                {/* Skills */}
                {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                    <div className="mb-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Skills</h3>
                        <div className="space-y-3">
                            {data.skills.categories.map((cat, i) => (
                                cat.skills && (
                                    <div key={i}>
                                        <p className="font-semibold text-sm mb-1">{cat.category}</p>
                                        <p className="text-xs text-slate-300">{cat.skills}</p>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                )}

                {/* Certifications */}
                {data.certifications.length > 0 && (
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Certifications</h3>
                        <ul className="text-sm space-y-1">
                            {data.certifications.map((cert, i) => (
                                <li key={i} className="text-slate-200">• {cert}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {/* Header */}
                <header className="mb-6 border-b-2 border-slate-800 pb-4">
                    <h1 className="text-3xl font-bold text-slate-800">{data.header.name}</h1>
                    <p className="text-lg text-slate-600">Professional Resume</p>
                </header>

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-slate-800"></span>
                            Experience
                        </h2>
                        {data.experience.map((exp, i) => (
                            <div key={i} className="mb-4">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-slate-800">{exp.role}</h3>
                                    <span className="text-sm text-slate-500">{exp.duration}</span>
                                </div>
                                <p className="text-sm text-slate-600 font-medium">{exp.organization}</p>
                                <ul className="mt-2 text-sm text-slate-700 space-y-1">
                                    {exp.bullets.map((bullet, j) => (
                                        <li key={j}>• {bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {/* Education */}
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                        <span className="w-8 h-0.5 bg-slate-800"></span>
                        Education
                    </h2>
                    {data.education.map((edu, i) => (
                        <div key={i} className="mb-2">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-slate-800">{edu.degree}</h3>
                                <span className="text-sm text-slate-500">{edu.duration}</span>
                            </div>
                            <p className="text-sm text-slate-600">{edu.institution} {edu.cgpa && `• ${edu.cgpa}`}</p>
                        </div>
                    ))}
                </section>

                {/* Projects */}
                {data.projects.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-slate-800"></span>
                            Projects
                        </h2>
                        {data.projects.map((proj, i) => (
                            <div key={i} className="mb-3">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-slate-800">{proj.name}</h3>
                                    {proj.link && <a href={proj.link} className="text-xs text-blue-600">View</a>}
                                </div>
                                <p className="text-xs text-slate-500 mb-1">{proj.techStack}</p>
                                <ul className="text-sm text-slate-700 space-y-0.5">
                                    {proj.bullets.map((bullet, j) => (
                                        <li key={j}>• {bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {/* Achievements */}
                {data.achievements.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-slate-800"></span>
                            Achievements
                        </h2>
                        <ul className="text-sm text-slate-700 space-y-1">
                            {data.achievements.map((ach, i) => (
                                <li key={i}>• {ach}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </main>
        </div>
    );
};
