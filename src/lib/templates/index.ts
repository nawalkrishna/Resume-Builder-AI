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
        leetcode: "https://leetcode.com/alexj",
        customLinks: [{ name: "Twitter", url: "https://twitter.com/alexj" }]
    },
    education: [
        {
            degree: "Master of Science in Artificial Intelligence",
            institution: "Stanford University",
            duration: "2022 - 2024",
            cgpa: "4.0/4.0",
        },
        {
            degree: "Bachelor of Science in Computer Science",
            institution: "UC Berkeley",
            duration: "2018 - 2022",
            cgpa: "3.9/4.0",
        },
    ],
    experience: [
        {
            role: "Senior Software Engineer",
            organization: "Tech Corp Inc.",
            duration: "2024 - Present",
            bullets: [
                "Architected distributed microservices handling 50k+ requests per second with 99.99% uptime",
                "Reduced infrastructure costs by 45% through aggressive containerization and resource tagging",
                "Established engineering-wide best practices for TypeScript and automated integration testing",
                "Mentored 10+ junior developers through structured pair programming and code review cycles",
            ],
        },
        {
            role: "Software Engineer II",
            organization: "InnovateSoft",
            duration: "2022 - 2024",
            bullets: [
                "Full-stack development of enterprise-grade SaaS products using React and Golang",
                "Optimized database performance by 60% using advanced indexing and query restructuring",
                "Implemented secure authentication flows using OAuth2 and multi-factor verification",
            ],
        },
    ],
    projects: [
        {
            name: "AI-Powered Portfolio",
            techStack: "Next.js, Tailwind, OpenAI",
            link: "https://github.com/alexj/portfolio",
            bullets: [
                "Developed a dynamic portfolio that generates personalized case studies using LLMs",
                "Integrated real-time analytics and SEO optimization features for perfect lighthouse scores",
            ],
        },
        {
            name: "Cloud Resource Manager",
            techStack: "Go, AWS SDK, Terraform",
            link: "https://github.com/alexj/cloud-mgr",
            bullets: [
                "Automated the decommissioning of idle resources, saving $5k/month for research teams",
                "Built a CLI tool for rapid infrastructure prototyping across multiple cloud regions",
            ],
        },
    ],
    skills: {
        categories: [
            { category: "Languages", skills: "TypeScript, Python, Go, Rust, SQL, Bash" },
            { category: "Frameworks", skills: "React, Next.js, FastAPI, Node.js, Tailwind" },
            { category: "Infrastructure", skills: "AWS (S3, EC2, Lambda), Docker, Kubernetes, CI/CD" },
            { category: "Soft Skills", skills: "Team Leadership, Agile, Strategic Planning" }
        ],
    },
    achievements: [
        "First Place - Global AI Innovation Hackathon 2023",
        "Open Source Contributor of the Year - Local Tech Community",
        "Recipient of Engineering Excellence Award at Stanford University",
    ],
    certifications: [
        "AWS Solutions Architect Professional",
        "Google Cloud Architect Professional",
        "Microsoft Certified: Azure Developer Associate",
    ],
    template: "modern",
};

// Template metadata type
export interface TemplateInfo {
    id: string;
    name: string;
    description: string;
    category: "Professional" | "Modern" | "ATS";
}

// All available templates
export const templateList: TemplateInfo[] = [
    {
        id: "modern",
        name: "Modern Minimal",
        description: "Clean typography with subtle dividers for a contemporary look.",
        category: "Modern",
    },
    {
        id: "executive",
        name: "Management",
        description: "Authoritative design for leadership and management roles.",
        category: "Professional",
    },
    {
        id: "simple",
        name: "Standard ATS",
        description: "Classic black and white layout with perfect parsing compatibility.",
        category: "ATS",
    },
    {
        id: "creative",
        name: "Creative Designer",
        description: "Modern, visually striking layout for creative professionals.",
        category: "Modern",
    },
    {
        id: "corporate",
        name: "Corporate Standard",
        description: "Professional banner header with classic serif font for banking and law.",
        category: "Professional",
    },
    {
        id: "sleek",
        name: "Sleek Modern",
        description: "Contemporary left-sidebar design with emerald accents and modern headers.",
        category: "Modern",
    },
    {
        id: "classic",
        name: "Traditional",
        description: "Elegant serif fonts and a formal structure for established careers.",
        category: "Professional",
    },
    {
        id: "tech",
        name: "Developer Pro",
        description: "Technical layout optimized for software engineers and architects.",
        category: "Modern",
    },
    {
        id: "functional",
        name: "Competency Focus",
        description: "Left-sidebar layout highlighting skills and competencies first.",
        category: "Modern",
    },
    {
        id: "professional",
        name: "Executive",
        description: "Rich two-column layout designed for senior-level professionals.",
        category: "Professional",
    },
    {
        id: "clean",
        name: "Clean Slate",
        description: "Minimalist layout with clear sans-serif typography and tag-style skills.",
        category: "Modern",
    },
    {
        id: "premium",
        name: "Premium Elite",
        description: "Elegant right-sidebar layout with serif typography for top-tier roles.",
        category: "Professional",
    },
    {
        id: "compact",
        name: "High-Density",
        description: "Fits maximum information while maintaining high readability.",
        category: "ATS",
    },
    {
        id: "bold",
        name: "Strong Content",
        description: "Higher contrast typography to make your experience pop.",
        category: "Modern",
    },
    {
        id: "elegant",
        name: "Sleek Professional",
        description: "Sophisticated balance of style and professionalism.",
        category: "Professional",
    },
    {
        id: "prime",
        name: "Modern Prime",
        description: "Vibrant left-sidebar design with amber accents for creative industries.",
        category: "Modern",
    },
    {
        id: "academic",
        name: "Scholar",
        description: "Specifically structured for researchers and academic resumes.",
        category: "Professional",
    },
    {
        id: "minimal",
        name: "Minimalist",
        description: "Ultra-lean design focusing purely on content and white space.",
        category: "Modern",
    },
    {
        id: "elite",
        name: "Elite Executive",
        description: "Commanding right-sidebar layout with rose accents and banner header.",
        category: "Professional",
    },
    {
        id: "basic",
        name: "Essential",
        description: "Back to basics with highly effective professional styling.",
        category: "ATS",
    },
];

// Get template by ID
export const getTemplateInfo = (id: string): TemplateInfo | undefined => {
    return templateList.find(t => t.id === id);
};
