"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeaderSchema } from "@/lib/schemas/resume";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useResume } from "@/lib/context/ResumeContext";

interface HeaderFormProps {
    onNext: () => void;
}

export const HeaderForm: React.FC<HeaderFormProps> = ({ onNext }) => {
    const { data, updateData } = useResume();
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(HeaderSchema),
        defaultValues: {
            ...data.header,
            customLinks: data.header.customLinks || [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "customLinks",
    });

    // Reset form when context data changes (e.g., when editing a saved resume)
    useEffect(() => {
        reset({
            ...data.header,
            customLinks: data.header.customLinks || [],
        });
    }, [data.header, reset]);

    const onSubmit = (formData: any) => {
        updateData({ header: formData });
        onNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Full Name"
                    placeholder="e.g. John Doe"
                    error={errors.name?.message as string}
                    {...register("name")}
                />
                <Input
                    label="Location"
                    placeholder="e.g. New York, NY"
                    error={errors.location?.message as string}
                    {...register("location")}
                />
                <Input
                    label="Phone Number"
                    placeholder="e.g. +1 234 567 890"
                    error={errors.phone?.message as string}
                    {...register("phone")}
                />
                <Input
                    label="Email Address"
                    placeholder="e.g. john@example.com"
                    error={errors.email?.message as string}
                    {...register("email")}
                />
                <Input
                    label="LinkedIn URL (Optional)"
                    placeholder="https://linkedin.com/in/username"
                    error={errors.linkedin?.message as string}
                    {...register("linkedin")}
                />
                <Input
                    label="GitHub URL (Optional)"
                    placeholder="https://github.com/username"
                    error={errors.github?.message as string}
                    {...register("github")}
                />
                <Input
                    label="LeetCode URL (Optional)"
                    placeholder="https://leetcode.com/username"
                    error={errors.leetcode?.message as string}
                    {...register("leetcode")}
                />
                <Input
                    label="Portfolio URL (Optional)"
                    placeholder="https://yourportfolio.com"
                    error={errors.portfolio?.message as string}
                    {...register("portfolio")}
                />
            </div>


            {/* Custom Links Section */}
            <div className="space-y-4 pt-4 border-t border-neutral-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Custom Links</h3>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => append({ name: "", url: "" })}
                    >
                        + Add Link
                    </Button>
                </div>

                {fields.length > 0 && (
                    <div className="space-y-3">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 items-start">
                                <Input
                                    label={index === 0 ? "Link Name" : undefined}
                                    placeholder="e.g. Portfolio"
                                    error={errors.customLinks?.[index]?.name?.message as string}
                                    {...register(`customLinks.${index}.name` as const)}
                                />
                                <Input
                                    label={index === 0 ? "URL" : undefined}
                                    placeholder="https://example.com"
                                    error={errors.customLinks?.[index]?.url?.message as string}
                                    {...register(`customLinks.${index}.url` as const)}
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className={`shrink-0 h-11 w-11 p-0 ${index === 0 ? "mt-7" : ""}`}
                                    onClick={() => remove(index)}
                                >
                                    ×
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                {fields.length === 0 && (
                    <p className="text-sm text-neutral-400">No custom links added. Click "Add Link" to add portfolio, blog, or other URLs.</p>
                )}
            </div>

            <div className="flex justify-end pt-4">
                <Button type="submit">Save & Next</Button>
            </div>
        </form>
    );
};
