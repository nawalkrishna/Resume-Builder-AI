"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EducationSchema } from "@/lib/schemas/resume";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useResume } from "@/lib/context/ResumeContext";

const FormSchema = z.object({
    education: z.array(EducationSchema),
});

interface EducationFormProps {
    onNext: () => void;
    onBack: () => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ onNext, onBack }) => {
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
            education: data.education.length > 0 ? data.education : [{ degree: "", institution: "", duration: "", cgpa: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "education",
    });

    useEffect(() => {
        if (data.education.length > 0) {
            reset({ education: data.education });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.education]);

    const onSubmit = (formData: any) => {

        updateData({ education: formData.education });
        onNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="relative p-6 border border-neutral-200 rounded-xl bg-neutral-50/50 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Education Entry #{index + 1}</h3>
                            {fields.length > 1 && (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => remove(index)}
                                    className="h-8 px-3"
                                >
                                    Remove
                                </Button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Degree / Course"
                                placeholder="e.g. B.Tech in Computer Science"
                                error={errors.education?.[index]?.degree?.message}
                                {...register(`education.${index}.degree` as const)}
                            />
                            <Input
                                label="Institution"
                                placeholder="e.g. Stanford University"
                                error={errors.education?.[index]?.institution?.message}
                                {...register(`education.${index}.institution` as const)}
                            />
                            <Input
                                label="Duration"
                                placeholder="e.g. 2020 - 2024"
                                error={errors.education?.[index]?.duration?.message}
                                {...register(`education.${index}.duration` as const)}
                            />
                            <Input
                                label="CGPA / Percentage (Optional)"
                                placeholder="e.g. 9.2/10 or 85%"
                                error={errors.education?.[index]?.cgpa?.message}
                                {...register(`education.${index}.cgpa` as const)}
                            />

                        </div>
                    </div>
                ))}
            </div>

            <Button
                type="button"
                variant="outline"
                className="w-full border-dashed border-2 hover:bg-neutral-100"
                onClick={() => append({ degree: "", institution: "", duration: "", cgpa: "" })}
            >
                + Add Another Education
            </Button>

            <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={onBack}>Back</Button>
                <Button type="submit">Save & Next</Button>
            </div>
        </form>
    );
};
