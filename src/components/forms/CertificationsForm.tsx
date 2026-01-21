"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useResume } from "@/lib/context/ResumeContext";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
    certifications: z.array(z.string().min(1, "Cannot be empty")),
});

type FormValues = z.infer<typeof FormSchema>;

interface CertificationsFormProps {
    onNext: () => void;
    onBack: () => void;
}

export const CertificationsForm: React.FC<CertificationsFormProps> = ({ onNext, onBack }) => {
    const { data, updateData } = useResume();
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            certifications: data.certifications.length > 0 ? data.certifications : [],
        },
    });


    const { fields, append, remove } = useFieldArray({
        control,
        // @ts-ignore
        name: "certifications",
    });

    useEffect(() => {
        if (data.certifications.length > 0) {
            reset({ certifications: data.certifications });
        }
    }, [data.certifications, reset]);

    const onSubmit = (formData: FormValues) => {

        updateData({
            certifications: formData.certifications.filter((c: string) => c.trim() !== "")
        });
        onNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-neutral-900 border-b pb-2">Certifications</h3>
                <div className="space-y-3">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2">
                            <Input
                                placeholder="e.g. AWS Certified Cloud Practitioner"
                                error={errors.certifications?.[index]?.message}
                                {...register(`certifications.${index}` as const)}
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
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full border-dashed"
                        onClick={() => append("")}
                    >
                        + Add Certification
                    </Button>
                </div>
            </div>

            <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={onBack}>Back</Button>
                <Button type="submit">Preview Resume</Button>
            </div>
        </form>
    );
};
