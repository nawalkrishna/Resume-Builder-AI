import { z } from "zod";

export const CustomLinkSchema = z.object({
  name: z.string().min(1, "Link name is required"),
  url: z.string().url("Invalid URL"),
});

export const HeaderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  github: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  leetcode: z.string().url("Invalid LeetCode URL").optional().or(z.literal("")),
  portfolio: z.string().url("Invalid Portfolio URL").optional().or(z.literal("")),
  customLinks: z.array(CustomLinkSchema).optional(),
});


export const EducationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  duration: z.string().min(1, "Duration is required"),
  cgpa: z.string().optional().or(z.literal("")),
});

export const ExperienceSchema = z.object({
  role: z.string().min(1, "Role is required"),
  organization: z.string().min(1, "Organization is required"),
  duration: z.string().min(1, "Duration is required"),
  bullets: z.array(z.string().min(1, "Bullet point cannot be empty")).max(4, "Max 4 bullet points per role"),
});

export const ProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  techStack: z.string().min(1, "Tech stack is required"),
  link: z.string().url("Invalid URL").optional().or(z.literal("")),
  bullets: z.array(z.string().min(1, "Bullet point cannot be empty")).max(3, "Max 3 bullet points per project"),
});

export const SkillCategorySchema = z.object({
  category: z.string().optional().or(z.literal("")),
  skills: z.string().optional().or(z.literal("")),
});

export const SkillsSchema = z.object({
  categories: z.array(SkillCategorySchema).optional(),
});



export const AchievementSchema = z.string().min(1, "Achievement cannot be empty");
export const CertificationSchema = z.string().min(1, "Certification cannot be empty");

export const ResumeSchema = z.object({
  header: HeaderSchema,
  education: z.array(EducationSchema).min(1, "At least one education entry is required"),
  experience: z.array(ExperienceSchema),
  projects: z.array(ProjectSchema),
  skills: SkillsSchema,
  achievements: z.array(AchievementSchema),
  certifications: z.array(CertificationSchema),
  template: z.string().optional().default("simple"),
});

export type ResumeData = z.infer<typeof ResumeSchema>;
