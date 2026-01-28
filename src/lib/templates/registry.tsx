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

import { FlexibleTemplate } from "./flexible";

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
    // New templates using flexible system
    clean: (props) => <FlexibleTemplate {...props} variant={{}} />,
    corporate: (props) => <FlexibleTemplate {...props} variant={{}} />,
    functional: (props) => <FlexibleTemplate {...props} variant={{}} />,
    premium: (props) => <FlexibleTemplate {...props} variant={{}} />,
    sleek: (props) => <FlexibleTemplate {...props} variant={{}} />,
    standard: (props) => <FlexibleTemplate {...props} variant={{}} />,
    basic: (props) => <FlexibleTemplate {...props} variant={{}} />,
    elite: (props) => <FlexibleTemplate {...props} variant={{}} />,
    prime: (props) => <FlexibleTemplate {...props} variant={{}} />,
};

// Get template component by ID
export const getTemplate = (id: string): TemplateComponent => {
    return templateRegistry[id] || templateRegistry.simple;
};

// Get all template IDs
export const getTemplateIds = (): string[] => {
    return Object.keys(templateRegistry);
};
