import { ResumeData } from "@/lib/schemas/resume";

export function generateLaTeX(data: ResumeData): string {
    const sanitize = (str: string) => str.replace(/([&%$#_{}~^\\])/g, "\\$1");

    return `\\documentclass[a4paper,10pt]{article}
\\usepackage[left=0.75in,top=0.6in,right=0.75in,bottom=0.6in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\usepackage[T1]{fontenc}
\\usepackage{charter}

\\hypersetup{
    colorlinks=true,
    linkcolor=blue,
    filecolor=magenta,      
    urlcolor=blue,
}

\\titleformat{\\section}{\\large\\bfseries\\uppercase}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{10pt}{5pt}

\\begin{document}

\\begin{center}
    {\\Huge \\textbf{${sanitize(data.header.name)}}} \\\\ \\vspace{2pt}
    ${sanitize(data.header.location)} $|$ ${sanitize(data.header.phone)} $|$ \\href{mailto:${data.header.email}}{${sanitize(data.header.email)}} \\\\
    ${data.header.linkedin ? `\\href{${data.header.linkedin}}{LinkedIn}` : ""} ${data.header.github ? `$|$ \\href{${data.header.github}}{GitHub}` : ""} ${data.header.leetcode ? `$|$ \\href{${data.header.leetcode}}{LeetCode}` : ""}
\\end{center}

\\section{Education}
${data.education.map(edu => `
\\textbf{${sanitize(edu.institution)}} \\hfill \\textbf{${sanitize(edu.duration)}} \\\\
\\textit{${sanitize(edu.degree)}}${edu.cgpa ? ` \\hfill CGPA: ${sanitize(edu.cgpa)}` : ""}
`).join("\n")}

${data.experience.length > 0 ? `
\\section{Experience}
${data.experience.map(exp => `
\\textbf{${sanitize(exp.organization)}} \\hfill \\textbf{${sanitize(exp.duration)}} \\\\
\\textit{${sanitize(exp.role)}}
\\begin{itemize}[noitemsep,topsep=0pt,leftmargin=1.5em]
    ${exp.bullets.map(bullet => `\\item ${sanitize(bullet)}`).join("\n    ")}
\\end{itemize}
`).join("\n")}
` : ""}

${data.projects.length > 0 ? `
\\section{Projects}
${data.projects.map(proj => `
\\textbf{${sanitize(proj.name)}} $|$ \\textit{${sanitize(proj.techStack)}}${proj.link ? ` $|$ \\href{${proj.link}}{Link}` : ""} \\\\
\\begin{itemize}[noitemsep,topsep=0pt,leftmargin=1.5em]
    ${proj.bullets.map(bullet => `\\item ${sanitize(bullet)}`).join("\n    ")}
\\end{itemize}
`).join("\n")}
` : ""}

${data.skills.categories && data.skills.categories.length > 0 ? `
\\section{Technical Skills}
\\begin{itemize}[noitemsep,topsep=0pt,leftmargin=1.5em]
    ${data.skills.categories.filter(cat => cat.skills && cat.category).map(cat => `\\item \\textbf{${sanitize(cat.category || "")}:} ${sanitize(cat.skills || "")}`).join("\n    ")}
\\end{itemize}
` : ""}

${data.achievements.length > 0 ? `
\\section{Achievements}
\\begin{itemize}[noitemsep,topsep=0pt,leftmargin=1.5em]
    ${data.achievements.map(ach => `\\item ${sanitize(ach)}`).join("\n    ")}
\\end{itemize}
` : ""}

${data.certifications.length > 0 ? `
\\section{Certifications}
\\begin{itemize}[noitemsep,topsep=0pt,leftmargin=1.5em]
    ${data.certifications.map(cert => `\\item ${sanitize(cert)}`).join("\n    ")}
\\end{itemize}
` : ""}

\\end{document}
`;
}
