import { ResumeData } from "../schemas/resume";

// Sample data for template previews
export const sampleResumeData: ResumeData = {
    header: {
        name: "Alex Johnson",
        location: "San Francisco, CA",
        phone: "(555) 123-4567",
        email: "alex.johnson@email.com",
        linkedin: "https://linkedin.com/in/alexjohnson",
        github: "https://github.com/alexjohnson",
        portfolio: "https://alexjohnson.dev",
    },
    education: [
        {
            degree: "Bachelor of Science in Computer Science",
            institution: "Stanford University",
            duration: "2018 - 2022",
            cgpa: "3.8/4.0",
        },
    ],
    experience: [
        {
            role: "Senior Software Engineer",
            organization: "Tech Corp Inc.",
            duration: "2022 - Present",
            bullets: [
                "Led development of microservices architecture serving 10M+ users daily",
                "Reduced API latency by 40% through optimization and caching strategies",
                "Mentored team of 5 junior developers, improving code quality by 30%",
            ],
        },
        {
            role: "Software Engineering Intern",
            organization: "StartupXYZ",
            duration: "Summer 2021",
            bullets: [
                "Built real-time notification system using WebSockets and Redis",
                "Developed automated testing pipeline reducing deployment time by 50%",
            ],
        },
    ],
    projects: [
        {
            name: "AI Resume Builder",
            techStack: "Next.js, TypeScript, OpenAI, Supabase",
            link: "https://github.com/alexjohnson/resume-builder",
            bullets: [
                "Full-stack application with AI-powered content enhancement",
                "Implemented 12+ professional resume templates",
            ],
        },
        {
            name: "E-Commerce Platform",
            techStack: "React, Node.js, PostgreSQL, Stripe",
            link: "",
            bullets: [
                "Built scalable e-commerce solution with payment integration",
                "Achieved 99.9% uptime with automated CI/CD pipeline",
            ],
        },
    ],
    skills: {
        categories: [
            { category: "Languages", skills: "JavaScript, TypeScript, Python, Java, SQL" },
            { category: "Frameworks", skills: "React, Next.js, Node.js, Express, FastAPI" },
            { category: "Tools", skills: "Git, Docker, AWS, PostgreSQL, Redis, MongoDB" },
        ],
    },
    achievements: [
        "Winner, Google Code Jam 2021 - Regional Round",
        "Published research paper on distributed systems at IEEE Conference",
    ],
    certifications: [
        "AWS Certified Solutions Architect",
        "Google Cloud Professional Developer",
    ],
    template: "simple",
};

// Template metadata type
export interface TemplateInfo {
    id: string;
    name: string;
    description: string;
    category: "professional" | "creative" | "minimal" | "academic";
    color: string;
}

// All available templates
export const templateList: TemplateInfo[] = [
    {
        id: "simple",
        name: "Simple",
        description: "Clean ATS-optimized layout, perfect for all industries",
        category: "professional",
        color: "#4F46E5",
    },
    {
        id: "classic",
        name: "Classic",
        description: "Traditional design with serif fonts and formal styling",
        category: "professional",
        color: "#1E40AF",
    },
    {
        id: "modern",
        name: "Modern",
        description: "Contemporary look with clean sans-serif typography",
        category: "professional",
        color: "#059669",
    },
    {
        id: "professional",
        name: "Professional",
        description: "Executive two-column layout for senior positions",
        category: "professional",
        color: "#7C3AED",
    },
    {
        id: "minimal",
        name: "Minimal",
        description: "Ultra-clean with generous whitespace",
        category: "minimal",
        color: "#6B7280",
    },
    {
        id: "creative",
        name: "Creative",
        description: "Bold colors and unique layout for creative roles",
        category: "creative",
        color: "#EC4899",
    },
    {
        id: "tech",
        name: "Tech",
        description: "Developer-focused with code-style accents",
        category: "professional",
        color: "#10B981",
    },
    {
        id: "executive",
        name: "Executive",
        description: "Premium look for C-level and senior management",
        category: "professional",
        color: "#0F172A",
    },
    {
        id: "academic",
        name: "Academic",
        description: "Ideal for researchers, professors, and scholars",
        category: "academic",
        color: "#7C2D12",
    },
    {
        id: "compact",
        name: "Compact",
        description: "Dense layout that fits more content",
        category: "minimal",
        color: "#374151",
    },
    {
        id: "elegant",
        name: "Elegant",
        description: "Sophisticated design with subtle borders",
        category: "creative",
        color: "#9333EA",
    },
    {
        id: "bold",
        name: "Bold",
        description: "Strong typography with high contrast",
        category: "creative",
        color: "#DC2626",
    },
];

// Get template by ID
export const getTemplateInfo = (id: string): TemplateInfo | undefined => {
    return templateList.find(t => t.id === id);
};
