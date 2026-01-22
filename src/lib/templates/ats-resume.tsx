import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const ATSResumeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-black p-[0.75in] font-serif leading-tight w-full max-w-[8.5in] mx-auto min-h-[11in] shadow-sm flex flex-col gap-4 text-[11pt]">
            {/* Header */}
            <header className="text-center border-b-[1.5pt] border-black pb-2">
                <h1 className="text-2xl font-bold uppercase tracking-wide mb-1">{data.header.name}</h1>
                <div className="flex flex-wrap justify-center gap-2 text-[10pt]">
                    <span>{data.header.location}</span>
                    <span>•</span>
                    <span>{data.header.phone}</span>
                    <span>•</span>
                    <a href={`mailto:${data.header.email}`} className="underline">{data.header.email}</a>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-1 text-[9pt]">
                    {data.header.linkedin && <a href={data.header.linkedin} className="underline">LinkedIn</a>}
                    {data.header.github && <a href={data.header.github} className="underline">GitHub</a>}
                    {data.header.leetcode && <a href={data.header.leetcode} className="underline">LeetCode</a>}
                    {data.header.portfolio && <a href={data.header.portfolio} className="underline">Portfolio</a>}
                    {data.header.customLinks?.map((link, i) => (
                        <a key={i} href={link.url} className="underline">{link.name}</a>
                    ))}
                </div>

            </header>


            {/* Education */}
            <section className="space-y-1">
                <h2 className="text-[12pt] font-bold uppercase tracking-tight border-b-[1pt] border-black">Education</h2>
                {data.education.map((edu, i) => (
                    <div key={i} className="flex justify-between items-start">
                        <div>
                            <div className="font-bold">{edu.institution}</div>
                            <div className="italic">{edu.degree}</div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold">{edu.duration}</div>
                            {edu.cgpa && <div>CGPA: {edu.cgpa}</div>}
                        </div>

                    </div>
                ))}
            </section>

            {/* Experience */}
            {data.experience.length > 0 && (
                <section className="space-y-1">
                    <h2 className="text-[12pt] font-bold uppercase tracking-tight border-b-[1pt] border-black">Experience</h2>
                    {data.experience.map((exp, i) => (
                        <div key={i} className="space-y-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="font-bold">{exp.organization}</span>
                                    <span className="mx-2">|</span>
                                    <span className="italic">{exp.role}</span>
                                </div>
                                <div className="font-bold">{exp.duration}</div>
                            </div>
                            <ul className="list-disc list-outside ml-5 space-y-0.5">
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
                <section className="space-y-1">
                    <h2 className="text-[12pt] font-bold uppercase tracking-tight border-b-[1pt] border-black">Projects</h2>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="space-y-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="font-bold">{proj.name}</span>
                                    <span className="mx-2">|</span>
                                    <span className="italic text-[10pt]">{proj.techStack}</span>
                                </div>
                                {proj.link && <a href={proj.link} className="underline text-[10pt]">Link</a>}
                            </div>
                            <ul className="list-disc list-outside ml-5 space-y-0.5">
                                {proj.bullets.map((bullet, j) => (
                                    <li key={j}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {data.skills.categories && data.skills.categories.some(cat => cat.skills && cat.category) && (
                <section className="space-y-1">
                    <h2 className="text-[12pt] font-bold uppercase tracking-tight border-b-[1pt] border-black">Technical Skills</h2>
                    <div className="space-y-0.5">
                        {data.skills.categories.map((cat, i) => (
                            cat.skills && <p key={i}><strong>{cat.category}:</strong> {cat.skills}</p>
                        ))}
                    </div>
                </section>
            )}


            {/* Achievements */}
            {data.achievements.length > 0 && (
                <section className="space-y-1">
                    <h2 className="text-[12pt] font-bold uppercase tracking-tight border-b-[1pt] border-black">Achievements</h2>
                    <ul className="list-disc list-outside ml-5 space-y-0.5">
                        {data.achievements.map((ach, i) => (
                            <li key={i}>{ach}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
                <section className="space-y-1">
                    <h2 className="text-[12pt] font-bold uppercase tracking-tight border-b-[1pt] border-black">Certifications</h2>
                    <ul className="list-disc list-outside ml-5 space-y-0.5">
                        {data.certifications.map((cert, i) => (
                            <li key={i}>{cert}</li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
};
