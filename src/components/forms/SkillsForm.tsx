"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SkillCategorySchema } from "@/lib/schemas/resume";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useResume } from "@/lib/context/ResumeContext";

const FormSchema = z.object({
    categories: z.array(SkillCategorySchema).optional(),
});

interface SkillsFormProps {
    onNext: () => void;
    onBack: () => void;
}

// Get example placeholder based on category name
const getSkillsPlaceholder = (categoryName: string | undefined): string => {
    const name = (categoryName || "").toLowerCase();
    if (name.includes("language")) return "e.g. JavaScript, Python, C++, Java, TypeScript";
    if (name.includes("framework") || name.includes("librar")) return "e.g. React, Next.js, Node.js, Express, Django";
    if (name.includes("tool") || name.includes("platform")) return "e.g. Git, Docker, AWS, Vercel, Linux";
    if (name.includes("concept")) return "e.g. OOPS, DBMS, OS, Data Structures, Algorithms";
    if (name.includes("database")) return "e.g. PostgreSQL, MongoDB, MySQL, Redis";
    if (name.includes("cloud")) return "e.g. AWS, Azure, GCP, Kubernetes, Terraform";
    if (name.includes("design")) return "e.g. Figma, Adobe XD, Photoshop, Illustrator";
    if (name.includes("testing")) return "e.g. Jest, Cypress, Selenium, Playwright";
    return "e.g. Skill 1, Skill 2, Skill 3";
};

export const SkillsForm: React.FC<SkillsFormProps> = ({ onNext, onBack }) => {
    const { data, updateData } = useResume();
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            categories: data.skills.categories || [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "categories",
    });

    // Watch category names for dynamic placeholders
    const watchedCategories = useWatch({ control, name: "categories" });

    useEffect(() => {
        reset({
            categories: data.skills.categories || [],
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.skills]);

    const onSubmit = (formData: any) => {
        // Filter out empty categories
        const filteredCategories = formData.categories?.filter(
            (cat: any) => (cat.category?.trim() !== "" || cat.skills?.trim() !== "")
        ) || [];
        updateData({ skills: { categories: filteredCategories } });
        onNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border border-neutral-200 rounded-xl bg-neutral-50/50 space-y-3">
                        <div className="flex justify-between items-center">
                            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Skill Category #{index + 1}</h4>
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => remove(index)}
                                className="h-8 px-3"
                            >
                                Remove
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Category Name"
                                placeholder="e.g. Languages, Databases, Cloud"
                                error={errors.categories?.[index]?.category?.message as string}
                                {...register(`categories.${index}.category` as const)}
                            />
                            <Input
                                label="Skills (comma separated)"
                                placeholder={getSkillsPlaceholder(watchedCategories?.[index]?.category)}
                                error={errors.categories?.[index]?.skills?.message as string}
                                {...register(`categories.${index}.skills` as const)}
                            />
                        </div>
                    </div>
                ))}

                <Button
                    type="button"
                    variant="outline"
                    className="w-full border-dashed border-2 hover:bg-neutral-100"
                    onClick={() => append({ category: "", skills: "" })}
                >
                    + Add Skill Category
                </Button>

                {fields.length === 0 && (
                    <div className="text-center py-8 text-neutral-400 border-2 border-dashed border-neutral-200 rounded-xl">
                        No skill categories added. Click above to add your skills.
                    </div>
                )}
            </div>

            <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={onBack}>Back</Button>
                <Button type="submit">Save & Next</Button>
            </div>
        </form>
    );
};
