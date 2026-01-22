import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const CreativeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-gradient-to-br from-fuchsia-50 to-purple-50 text-gray-800 w-full max-w-[8.5in] mx-auto min-h-[11in] p-8">
            {/* Header - Bold Creative Style */}
            <header className="relative mb-8">
                <div className="absolute -left-4 -top-4 w-32 h-32 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full opacity-20"></div>
                <div className="relative">
                    <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-purple-600">
                        {data.header.name}
                    </h1>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm">
                        <span className="px-3 py-1 bg-white rounded-full shadow-sm">{data.header.email}</span>
                        <span className="px-3 py-1 bg-white rounded-full shadow-sm">{data.header.phone}</span>
                        <span className="px-3 py-1 bg-white rounded-full shadow-sm">{data.header.location}</span>
                    </div>
                    <div className="mt-2 flex gap-3 text-sm">
                        {data.header.linkedin && <a href={data.header.linkedin} className="text-fuchsia-600 hover:underline">LinkedIn</a>}
                        {data.header.github && <a href={data.header.github} className="text-fuchsia-600 hover:underline">GitHub</a>}
                        {data.header.portfolio && <a href={data.header.portfolio} className="text-fuchsia-600 hover:underline">Portfolio</a>}
                    </div>
                </div>
            </header>

            {/* Skills - Featured prominently */}
            {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                <section className="mb-6 bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex flex-wrap gap-2">
                        {data.skills.categories.map((cat, i) => (
                            cat.skills && cat.skills.split(",").map((skill, j) => (
                                <span key={`${i}-${j}`} className="px-3 py-1 bg-gradient-to-r from-fuchsia-100 to-purple-100 text-purple-700 rounded-full text-xs font-medium">
                                    {skill.trim()}
                                </span>
                            ))
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-fuchsia-600 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-fuchsia-500 rounded-full"></span>
                        Experience
                    </h2>
                    <div className="space-y-4">
                        {data.experience.map((exp, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{exp.role}</h3>
                                        <p className="text-sm text-fuchsia-600">{exp.organization}</p>
                                    </div>
                                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">{exp.duration}</span>
                                </div>
                                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                                    {exp.bullets.map((bullet, j) => (
                                        <li key={j}>→ {bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education & Projects side by side */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <section>
                    <h2 className="text-lg font-bold text-fuchsia-600 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-fuchsia-500 rounded-full"></span>
                        Education
                    </h2>
                    {data.education.map((edu, i) => (
                        <div key={i} className="bg-white rounded-xl p-3 shadow-sm mb-2">
                            <h3 className="font-bold text-sm text-gray-900">{edu.degree}</h3>
                            <p className="text-xs text-gray-500">{edu.institution}</p>
                            <p className="text-xs text-fuchsia-600">{edu.duration}</p>
                        </div>
                    ))}
                </section>

                {data.projects.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold text-fuchsia-600 mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-fuchsia-500 rounded-full"></span>
                            Projects
                        </h2>
                        {data.projects.slice(0, 2).map((proj, i) => (
                            <div key={i} className="bg-white rounded-xl p-3 shadow-sm mb-2">
                                <h3 className="font-bold text-sm text-gray-900">{proj.name}</h3>
                                <p className="text-xs text-gray-500">{proj.techStack}</p>
                            </div>
                        ))}
                    </section>
                )}
            </div>

            {/* Achievements */}
            {data.achievements.length > 0 && (
                <section className="bg-white rounded-2xl p-4 shadow-sm">
                    <h2 className="text-lg font-bold text-fuchsia-600 mb-2">🏆 Achievements</h2>
                    <ul className="text-sm text-gray-600 space-y-1">
                        {data.achievements.map((ach, i) => (
                            <li key={i}>✨ {ach}</li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
};
