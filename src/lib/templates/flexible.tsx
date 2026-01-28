import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export interface FlexibleTemplateProps {
    data: ResumeData;
    variant: {
        fontFamily?: "serif" | "sans" | "mono";
        color?: "slate" | "blue" | "emerald" | "purple" | "rose" | "amber";
        layout?: "classic" | "left-sidebar" | "right-sidebar";
        headerStyle?: "simple" | "banner" | "modern" | "centered";
        sectionStyle?: "underline" | "side-border" | "block" | "minimal";
        skillStyle?: "list" | "bubbles" | "pills" | "tags";
        compact?: boolean;
    };
}

export const FlexibleTemplate: React.FC<FlexibleTemplateProps> = ({ data, variant }) => {
    const {
        fontFamily = "sans",
        color = "slate",
        layout = "classic",
        headerStyle = "simple",
        sectionStyle = "underline",
        skillStyle = "list",
        compact = false
    } = variant;

    // Color definitions
    const colors = {
        slate: { primary: "text-slate-900", accent: "text-slate-500", border: "border-slate-200", bg: "bg-slate-50", banner: "bg-slate-900" },
        blue: { primary: "text-blue-900", accent: "text-blue-600", border: "border-blue-100", bg: "bg-blue-50/50", banner: "bg-blue-900" },
        emerald: { primary: "text-emerald-900", accent: "text-emerald-600", border: "border-emerald-100", bg: "bg-emerald-50/50", banner: "bg-emerald-900" },
        purple: { primary: "text-purple-900", accent: "text-purple-600", border: "border-purple-100", bg: "bg-purple-50/50", banner: "bg-purple-900" },
        rose: { primary: "text-rose-900", accent: "text-rose-600", border: "border-rose-100", bg: "bg-rose-50/50", banner: "bg-rose-900" },
        amber: { primary: "text-amber-900", accent: "text-amber-600", border: "border-amber-100", bg: "bg-amber-50/50", banner: "bg-amber-900" },
    };
    const c = colors[color];

    // Helper: Header Rendering
    const Header = () => {
        if (headerStyle === "banner") {
            return (
                <header className={`${c.banner} text-white px-10 py-6 shadow-sm`}>
                    <h1 className="text-3xl font-black uppercase tracking-tight mb-2">{data.header.name}</h1>
                    <div className="flex flex-wrap gap-4 text-white/80 text-xs font-medium">
                        <span>{data.header.location}</span>
                        <span>{data.header.phone}</span>
                        <span>{data.header.email}</span>
                    </div>
                </header>
            );
        }
        if (headerStyle === "modern") {
            return (
                <header className={`px-10 pt-6 pb-4 flex justify-between items-end border-b-2 ${color === 'slate' ? 'border-slate-900' : c.border.replace('border-', 'border-')}`}>
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter leading-none">{data.header.name.split(' ')[0]}</h1>
                        <h1 className={`text-3xl font-light uppercase tracking-tighter leading-none ${c.accent}`}>{data.header.name.split(' ').slice(1).join(' ')}</h1>
                    </div>
                    <div className="text-right text-[10px] font-bold uppercase tracking-widest text-slate-400 space-y-0.5">
                        <div>{data.header.location}</div>
                        <div>{data.header.email}</div>
                        <div>{data.header.phone}</div>
                    </div>
                </header>
            );
        }
        if (headerStyle === "centered") {
            return (
                <header className="px-10 py-6 text-center space-y-2">
                    <h1 className={`text-2xl font-serif font-bold ${c.primary}`}>{data.header.name}</h1>
                    <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-[10px] uppercase tracking-widest text-slate-500">
                        <span>{data.header.location}</span>
                        <span>&bull;</span>
                        <span>{data.header.email}</span>
                        <span>&bull;</span>
                        <span>{data.header.phone}</span>
                    </div>
                </header>
            );
        }
        // Simple
        return (
            <header className="px-10 pt-6 pb-4 border-b border-slate-100">
                <h1 className={`text-3xl font-bold tracking-tight ${c.primary}`}>{data.header.name}</h1>
                <div className={`mt-1.5 flex flex-wrap gap-4 text-xs ${c.accent}`}>
                    <span>{data.header.location}</span>
                    <span>{data.header.email}</span>
                    <span>{data.header.phone}</span>
                </div>
            </header>
        );
    };

    // Helper: Section Title
    const SectionTitle = ({ children }: { children: React.ReactNode }) => {
        const base = "uppercase tracking-widest mb-3 font-black";
        if (sectionStyle === "underline") return <h2 className={`text-[10px] ${base} ${c.primary} border-b ${c.border} pb-1.5`}>{children}</h2>;
        if (sectionStyle === "side-border") return <h2 className={`text-[10px] ${base} ${c.primary} border-l-4 ${c.border.replace('border-', 'border-l-')} pl-3`}>{children}</h2>;
        if (sectionStyle === "block") return <h2 className={`text-[10px] ${base} text-white ${c.banner} p-1.5 pl-3 rounded-sm`}>{children}</h2>;
        return <h2 className={`text-xs ${base} ${c.primary}`}>{children}</h2>;
    };

    // Helper: Skills
    const SkillsContent = () => (
        <div className="space-y-4">
            {(data.skills.categories || []).map((cat, i) => (
                <div key={i}>
                    <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${c.accent}`}>{cat.category}</div>
                    {skillStyle === "list" && <div className="text-xs text-slate-600 font-medium leading-relaxed">{cat.skills}</div>}
                    {skillStyle === "bubbles" && (
                        <div className="flex flex-wrap gap-2">
                            {(cat.skills || "").split(',').filter(s => s.trim()).map((s, j) => (
                                <span key={j} className={`text-[9px] font-bold uppercase px-2 py-1 rounded-full border ${c.border} bg-white text-slate-600`}>{s.trim()}</span>
                            ))}
                        </div>
                    )}
                    {skillStyle === "pills" && (
                        <div className="flex flex-wrap gap-2">
                            {(cat.skills || "").split(',').filter(s => s.trim()).map((s, j) => (
                                <span key={j} className={`text-[9px] font-bold uppercase px-3 py-1 rounded-sm ${c.bg} ${c.primary}`}>{s.trim()}</span>
                            ))}
                        </div>
                    )}
                    {skillStyle === "tags" && (
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-slate-600">
                            {(cat.skills || "").split(',').filter(s => s.trim()).map((s, j) => (
                                <span key={j} className="border-b border-slate-100 pb-0.5">#{s.trim()}</span>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    // Layout Logic
    const MainContent = () => (
        <div className="space-y-6">
            {data.experience.length > 0 && (
                <section>
                    <SectionTitle>Experience</SectionTitle>
                    <div className="space-y-4">
                        {data.experience.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="font-bold text-slate-900 text-[13px]">{exp.role}</h3>
                                    <span className={`text-[9px] font-bold uppercase ${c.accent}`}>{exp.duration}</span>
                                </div>
                                <div className={`text-[11px] font-bold uppercase tracking-wide mb-1.5 ${c.primary}`}>{exp.organization}</div>
                                <ul className={`list-disc list-outside ml-3 space-y-0.5 text-slate-600 text-[11px] leading-relaxed marker:${c.accent.replace('text-', 'text-')}`}>
                                    {exp.bullets.map((bullet, j) => <li key={j}>{bullet}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.projects.length > 0 && (
                <section>
                    <SectionTitle>Projects</SectionTitle>
                    <div className="space-y-4">
                        {data.projects.map((proj, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="font-bold text-slate-900 text-[13px]">{proj.name}</h3>
                                    <span className={`text-[9px] font-bold uppercase ${c.accent}`}>{proj.techStack}</span>
                                </div>
                                <ul className={`list-disc list-outside ml-3 space-y-0.5 text-slate-600 text-[11px] leading-relaxed marker:${c.accent.replace('text-', 'text-')}`}>
                                    {proj.bullets.map((bullet, j) => <li key={j}>{bullet}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section>
                <SectionTitle>Education</SectionTitle>
                <div className="space-y-4">
                    {data.education.map((edu, i) => (
                        <div key={i} className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-slate-900 text-sm">{edu.institution}</h3>
                                <div className="text-slate-500 text-xs">{edu.degree}</div>
                            </div>
                            <span className={`text-[10px] font-bold uppercase ${c.accent}`}>{edu.duration}</span>
                        </div>
                    ))}
                </div>
            </section>

            {data.achievements.length > 0 && (
                <section>
                    <SectionTitle>Achievements</SectionTitle>
                    <ul className={`list-disc list-outside ml-3 space-y-0.5 text-slate-600 text-[11px] leading-relaxed marker:${c.accent.replace('text-', 'text-')}`}>
                        {data.achievements.map((ach, i) => (
                            <li key={i}>{ach}</li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );

    const SidebarContent = () => (
        <div className={`space-y-6 ${layout === "left-sidebar" ? "pr-4" : "pl-4"}`}>
            <section>
                <SectionTitle>Skills</SectionTitle>
                <SkillsContent />
            </section>
            {data.certifications.length > 0 && (
                <section>
                    <SectionTitle>Certifications</SectionTitle>
                    <ul className="space-y-2">
                        {data.certifications.map((cert, i) => (
                            <li key={i} className="text-xs font-medium text-slate-600 border-l-2 border-slate-100 pl-2">{cert}</li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );

    return (
        <div className={`bg-white text-slate-800 w-[210mm] min-h-[297mm] mx-auto shadow-none print:shadow-none overflow-hidden flex flex-col ${fontFamily === "serif" ? "font-serif" : fontFamily === "mono" ? "font-mono" : "font-sans"}`}>
            <Header />
            <div className={`flex flex-1 ${compact ? "p-[15mm] gap-10" : "p-[25mm] gap-12"}`}>
                {layout === "left-sidebar" && (
                    <aside className="w-[30%] border-r border-slate-100 pr-10">
                        <SidebarContent />
                    </aside>
                )}

                <main className={layout === "classic" ? "w-full" : "w-[65%]"}>
                    <MainContent />
                    {layout === "classic" && (
                        <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-8">
                            <SidebarContent />
                            {/* Extra content for classic layout if needed */}
                        </div>
                    )}
                </main>

                {layout === "right-sidebar" && (
                    <aside className="w-[30%] border-l border-slate-100 pl-10">
                        <SidebarContent />
                    </aside>
                )}
            </div>
        </div>
    );
};
