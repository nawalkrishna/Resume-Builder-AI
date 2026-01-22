import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

// Import all template components
import { ATSTemplate } from "./ats-resume";
import { ClassicTemplate } from "./classic";
import { ModernTemplate } from "./modern";
import { ProfessionalTemplate } from "./professional";
import { MinimalTemplate } from "./minimal";
import { CreativeTemplate } from "./creative";
import { TechTemplate } from "./tech";
import { ExecutiveTemplate } from "./executive";
import { AcademicTemplate } from "./academic";
import { CompactTemplate } from "./compact";
import { ElegantTemplate } from "./elegant";
import { BoldTemplate } from "./bold";

// Template component type
export type TemplateComponent = React.FC<{ data: ResumeData }>;

// Template registry - maps template IDs to their components
const templateRegistry: Record<string, TemplateComponent> = {
    simple: ATSTemplate,
    classic: ClassicTemplate,
    modern: ModernTemplate,
    professional: ProfessionalTemplate,
    minimal: MinimalTemplate,
    creative: CreativeTemplate,
    tech: TechTemplate,
    executive: ExecutiveTemplate,
    academic: AcademicTemplate,
    compact: CompactTemplate,
    elegant: ElegantTemplate,
    bold: BoldTemplate,
};

// Get template component by ID
export const getTemplate = (id: string): TemplateComponent => {
    return templateRegistry[id] || templateRegistry.simple;
};

// Get all template IDs
export const getTemplateIds = (): string[] => {
    return Object.keys(templateRegistry);
};
