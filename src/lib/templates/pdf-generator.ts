import { ResumeData } from "@/lib/schemas/resume";

// Template style configurations
interface TemplateStyle {
    fontFamily: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    headerStyle: "centered" | "left" | "banner" | "sidebar";
    sectionStyle: "underline" | "border" | "minimal" | "bold";
    backgroundColor?: string;
}

const templateStyles: Record<string, TemplateStyle> = {
    simple: {
        fontFamily: "'Crimson Pro', serif",
        primaryColor: "#000000",
        secondaryColor: "#374151",
        accentColor: "#000000",
        headerStyle: "centered",
        sectionStyle: "underline",
    },
    classic: {
        fontFamily: "'Times New Roman', serif",
        primaryColor: "#000000",
        secondaryColor: "#4B5563",
        accentColor: "#1F2937",
        headerStyle: "centered",
        sectionStyle: "border",
    },
    modern: {
        fontFamily: "'Inter', sans-serif",
        primaryColor: "#111827",
        secondaryColor: "#6B7280",
        accentColor: "#059669",
        headerStyle: "left",
        sectionStyle: "minimal",
    },
    professional: {
        fontFamily: "'Inter', sans-serif",
        primaryColor: "#0F172A",
        secondaryColor: "#64748B",
        accentColor: "#1E40AF",
        headerStyle: "left",
        sectionStyle: "bold",
    },
    minimal: {
        fontFamily: "'Inter', sans-serif",
        primaryColor: "#1F2937",
        secondaryColor: "#9CA3AF",
        accentColor: "#6B7280",
        headerStyle: "left",
        sectionStyle: "minimal",
    },
    creative: {
        fontFamily: "'Inter', sans-serif",
        primaryColor: "#1F2937",
        secondaryColor: "#6B7280",
        accentColor: "#DB2777",
        headerStyle: "left",
        sectionStyle: "minimal",
    },
    tech: {
        fontFamily: "'JetBrains Mono', monospace",
        primaryColor: "#10B981",
        secondaryColor: "#94A3B8",
        accentColor: "#22D3EE",
        headerStyle: "left",
        sectionStyle: "minimal",
        backgroundColor: "#0F172A",
    },
    executive: {
        fontFamily: "'Inter', sans-serif",
        primaryColor: "#0F172A",
        secondaryColor: "#64748B",
        accentColor: "#0F172A",
        headerStyle: "banner",
        sectionStyle: "bold",
    },
    academic: {
        fontFamily: "'Georgia', serif",
        primaryColor: "#78350F",
        secondaryColor: "#57534E",
        accentColor: "#B45309",
        headerStyle: "centered",
        sectionStyle: "border",
    },
    compact: {
        fontFamily: "'Inter', sans-serif",
        primaryColor: "#111827",
        secondaryColor: "#6B7280",
        accentColor: "#2563EB",
        headerStyle: "left",
        sectionStyle: "minimal",
    },
    elegant: {
        fontFamily: "'Inter', sans-serif",
        primaryColor: "#1F2937",
        secondaryColor: "#9CA3AF",
        accentColor: "#7C3AED",
        headerStyle: "left",
        sectionStyle: "minimal",
    },
    bold: {
        fontFamily: "'Inter', sans-serif",
        primaryColor: "#111827",
        secondaryColor: "#6B7280",
        accentColor: "#DC2626",
        headerStyle: "banner",
        sectionStyle: "bold",
    },
};

export function generateTemplateHTML(data: ResumeData): string {
    const templateId = data.template || "simple";
    const style = templateStyles[templateId] || templateStyles.simple;

    const isDark = templateId === "tech";
    const textColor = isDark ? "#E2E8F0" : style.primaryColor;
    const bgColor = style.backgroundColor || "#FFFFFF";

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: ${style.fontFamily};
            background: ${bgColor};
            color: ${textColor};
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          @page { size: Letter; margin: 0; }
          html, body { width: 8.5in; height: 11in; }
          .page-wrapper { width: 8.5in; min-height: 11in; overflow: hidden; }
          .resume-container {
            width: 8.5in;
            padding: ${templateId === "compact" ? "0.35in 0.45in" : "0.5in 0.6in"};
            display: flex;
            flex-direction: column;
            gap: ${templateId === "compact" ? "4px" : "8px"};
            font-size: ${templateId === "compact" ? "9pt" : "10pt"};
            line-height: 1.3;
          }
          .section-title {
            font-size: ${templateId === "compact" ? "9pt" : "10.5pt"};
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: ${style.accentColor};
            ${style.sectionStyle === "underline" ? `border-bottom: 1pt solid ${style.primaryColor};` : ""}
            ${style.sectionStyle === "border" ? `border-bottom: 1pt solid ${style.secondaryColor};` : ""}
            ${style.sectionStyle === "bold" ? `border-bottom: 2pt solid ${style.accentColor};` : ""}
            padding-bottom: 2px;
            margin-bottom: 4px;
          }
          .header-banner {
            background: ${style.accentColor};
            color: white;
            padding: 20px 30px;
            margin: -0.5in -0.6in 15px -0.6in;
            width: calc(100% + 1.2in);
          }
          a { color: ${style.accentColor}; text-decoration: underline; }
          ul { list-style-type: disc; padding-left: 1rem; margin: 0; }
          li { margin-bottom: 1px; }
        </style>
      </head>
      <body>
        <div class="page-wrapper">
          <div class="resume-container">
            ${generateHeader(data, style, templateId)}
            ${generateEducation(data, style)}
            ${generateExperience(data, style)}
            ${generateProjects(data, style)}
            ${generateSkills(data, style)}
            ${generateAchievements(data, style)}
            ${generateCertifications(data, style)}
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateHeader(data: ResumeData, style: TemplateStyle, templateId: string): string {
    const links = [
        data.header.linkedin ? `<a href="${data.header.linkedin}">LinkedIn</a>` : "",
        data.header.github ? `<a href="${data.header.github}">GitHub</a>` : "",
        data.header.portfolio ? `<a href="${data.header.portfolio}">Portfolio</a>` : "",
    ].filter(Boolean).join(" • ");

    if (style.headerStyle === "banner") {
        return `
            <header class="header-banner">
                <h1 style="font-size: 24pt; font-weight: bold;">${data.header.name}</h1>
                <div style="margin-top: 8px; font-size: 9pt; opacity: 0.9;">
                    ${data.header.email} • ${data.header.phone} • ${data.header.location}
                </div>
                ${links ? `<div style="margin-top: 4px; font-size: 9pt;">${links}</div>` : ""}
            </header>
        `;
    }

    if (style.headerStyle === "left") {
        return `
            <header style="border-bottom: 2px solid ${style.accentColor}; padding-bottom: 8px; margin-bottom: 8px;">
                <h1 style="font-size: 22pt; font-weight: bold; color: ${style.primaryColor};">${data.header.name}</h1>
                <div style="margin-top: 4px; font-size: 9pt; color: ${style.secondaryColor};">
                    ${data.header.email} • ${data.header.phone} • ${data.header.location}
                </div>
                ${links ? `<div style="margin-top: 2px; font-size: 9pt;">${links}</div>` : ""}
            </header>
        `;
    }

    // Centered (default)
    return `
        <header style="text-align: center; border-bottom: 1px solid ${style.primaryColor}; padding-bottom: 8px;">
            <h1 style="font-size: 20pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">${data.header.name}</h1>
            <div style="margin-top: 4px; font-size: 9pt;">
                ${data.header.location} • ${data.header.phone} • ${data.header.email}
            </div>
            ${links ? `<div style="margin-top: 2px; font-size: 8pt;">${links}</div>` : ""}
        </header>
    `;
}

function generateEducation(data: ResumeData, style: TemplateStyle): string {
    return `
        <section>
            <h2 class="section-title">Education</h2>
            ${data.education.map(edu => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <div>
                        <div style="font-weight: bold;">${edu.institution}</div>
                        <div style="font-style: italic;">${edu.degree}</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-weight: bold;">${edu.duration}</div>
                        ${edu.cgpa ? `<div>CGPA: ${edu.cgpa}</div>` : ""}
                    </div>
                </div>
            `).join("")}
        </section>
    `;
}

function generateExperience(data: ResumeData, style: TemplateStyle): string {
    if (data.experience.length === 0) return "";
    return `
        <section>
            <h2 class="section-title">Experience</h2>
            ${data.experience.map(exp => `
                <div style="margin-bottom: 6px;">
                    <div style="display: flex; justify-content: space-between;">
                        <div>
                            <span style="font-weight: bold;">${exp.organization}</span>
                            <span style="margin: 0 4px;">|</span>
                            <span style="font-style: italic;">${exp.role}</span>
                        </div>
                        <div style="font-weight: bold;">${exp.duration}</div>
                    </div>
                    <ul style="margin-top: 2px;">
                        ${exp.bullets.map(b => `<li>${b}</li>`).join("")}
                    </ul>
                </div>
            `).join("")}
        </section>
    `;
}

function generateProjects(data: ResumeData, style: TemplateStyle): string {
    if (data.projects.length === 0) return "";
    return `
        <section>
            <h2 class="section-title">Projects</h2>
            ${data.projects.map(proj => `
                <div style="margin-bottom: 6px;">
                    <div style="display: flex; justify-content: space-between;">
                        <div>
                            <span style="font-weight: bold;">${proj.name}</span>
                            <span style="margin: 0 4px;">|</span>
                            <span style="font-style: italic; font-size: 9pt;">${proj.techStack}</span>
                        </div>
                        ${proj.link ? `<a href="${proj.link}" style="font-size: 9pt;">Link</a>` : ""}
                    </div>
                    <ul style="margin-top: 2px;">
                        ${proj.bullets.map(b => `<li>${b}</li>`).join("")}
                    </ul>
                </div>
            `).join("")}
        </section>
    `;
}

function generateSkills(data: ResumeData, style: TemplateStyle): string {
    if (!data.skills.categories || data.skills.categories.every(c => !c.skills)) return "";
    return `
        <section>
            <h2 class="section-title">Technical Skills</h2>
            <div>
                ${data.skills.categories.filter(c => c.skills).map(cat =>
        `<p><strong>${cat.category}:</strong> ${cat.skills}</p>`
    ).join("")}
            </div>
        </section>
    `;
}

function generateAchievements(data: ResumeData, style: TemplateStyle): string {
    if (data.achievements.length === 0) return "";
    return `
        <section>
            <h2 class="section-title">Achievements</h2>
            <ul>${data.achievements.map(a => `<li>${a}</li>`).join("")}</ul>
        </section>
    `;
}

function generateCertifications(data: ResumeData, style: TemplateStyle): string {
    if (data.certifications.length === 0) return "";
    return `
        <section>
            <h2 class="section-title">Certifications</h2>
            <ul>${data.certifications.map(c => `<li>${c}</li>`).join("")}</ul>
        </section>
    `;
}
