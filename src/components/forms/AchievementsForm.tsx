"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { EnhanceButton } from "@/components/ui/EnhanceButton";
import { useResume } from "@/lib/context/ResumeContext";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
    achievements: z.array(z.string()),
});

type FormValues = z.infer<typeof FormSchema>;

interface AchievementsFormProps {
    onNext: () => void;
    onBack: () => void;
}

export const AchievementsForm: React.FC<AchievementsFormProps> = ({ onNext, onBack }) => {
    const { data, updateData } = useResume();
    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            achievements: data.achievements.length > 0 ? data.achievements : [],
        },
    });


    const { fields, append, remove } = useFieldArray({
        control,
        // @ts-ignore
        name: "achievements",
    });

    // Watch achievements for enhance button
    const watchedAchievements = useWatch({ control, name: "achievements" });

    useEffect(() => {
        if (data.achievements.length > 0) {
            reset({ achievements: data.achievements });
        }
    }, [data.achievements, reset]);

    const onSubmit = (formData: FormValues) => {

        updateData({
            achievements: formData.achievements.filter((a: string) => a.trim() !== ""),
        });
        onNext();
    };

    const handleEnhanceAchievement = (index: number, enhanced: string[]) => {
        if (enhanced.length > 0) {
            setValue(`achievements.${index}`, enhanced[0]);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-neutral-900 border-b pb-2">Achievements</h3>
                <div className="space-y-3">
                    {fields.map((field, index) => (
                        <div key={field.id} className="space-y-2">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="e.g. Secured Global Rank 250 in CodeChef Starters"
                                    error={errors.achievements?.[index]?.message}
                                    {...register(`achievements.${index}` as const)}
                                />
                                <EnhanceButton
                                    type="achievement"
                                    content={[watchedAchievements?.[index] || ""]}
                                    onEnhanced={(enhanced) => handleEnhanceAchievement(index, enhanced)}
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => remove(index)}
                                    className="shrink-0 h-11 w-11 p-0"
                                >
                                    ×
                                </Button>
                            </div>
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full border-dashed"
                        onClick={() => append("")}
                    >
                        + Add Achievement
                    </Button>
                </div>
            </div>

            <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={onBack}>Back</Button>
                <Button type="submit">Save & Next</Button>
            </div>
        </form>
    );
};
