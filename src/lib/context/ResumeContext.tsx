"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ResumeData, ResumeSchema } from "@/lib/schemas/resume";
import { createClient } from "@/lib/supabase/client";

interface ResumeContextType {
    data: ResumeData;
    resumeId: string | null;
    resumeName: string;
    loading: boolean;
    updateData: (newData: Partial<ResumeData>) => void;
    resetData: () => void;
    saveResume: (customName?: string) => Promise<void>;
    loadResume: (id: string) => Promise<void>;
    setResumeName: (name: string) => void;
    loadEditFromStorage: () => void;
}

const initialData: ResumeData = {
    header: {
        name: "",
        location: "",
        phone: "",
        email: "",
        linkedin: "",
        github: "",
        leetcode: "",
        portfolio: "",
        customLinks: [],
    },


    education: [],
    experience: [],
    projects: [],
    skills: {
        categories: [
            { category: "Languages", skills: "" },
            { category: "Frameworks / Libraries", skills: "" },
            { category: "Tools / Platforms", skills: "" },
            { category: "Relevant Concepts", skills: "" },
        ],
    },

    achievements: [],
    certifications: [],
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<ResumeData>(initialData);
    const [resumeId, setResumeId] = useState<string | null>(null);
    const [resumeName, setResumeName] = useState<string>("My Resume");
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    // Function to load edit data from localStorage
    const loadEditFromStorage = useCallback(() => {
        const editId = localStorage.getItem("editResumeId");
        const savedData = localStorage.getItem("resumeData");
        const savedName = localStorage.getItem("editResumeName");

        if (editId && savedData) {
            try {
                const parsed = JSON.parse(savedData);
                const result = ResumeSchema.safeParse(parsed);
                if (result.success) {
                    setData(result.data);
                    setResumeId(editId);
                    if (savedName) {
                        setResumeName(savedName);
                    }
                }
                // Clear edit mode
                localStorage.removeItem("editResumeId");
                localStorage.removeItem("resumeData");
                localStorage.removeItem("editResumeName");
            } catch (e) {
                console.error("Failed to parse edit resume data", e);
            }
        }
        setLoading(false);
    }, []);

    // Check for edit mode on mount
    useEffect(() => {
        loadEditFromStorage();
    }, [loadEditFromStorage]);

    const updateData = (newData: Partial<ResumeData>) => {
        setData((prev) => ({ ...prev, ...newData }));
    };

    const resetData = () => {
        setData(initialData);
        setResumeId(null);
        setResumeName("My Resume");
    };

    const saveResume = useCallback(async (customName?: string) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const nameToSave = customName || resumeName;

        if (resumeId) {
            // Update existing resume
            await supabase
                .from("resumes")
                .update({ name: nameToSave, data })
                .eq("id", resumeId)
                .eq("user_id", user.id);
        } else {
            // Create new resume
            const { data: newResume } = await supabase
                .from("resumes")
                .insert({
                    user_id: user.id,
                    name: nameToSave,
                    data,
                })
                .select()
                .single();

            if (newResume) {
                setResumeId(newResume.id);
            }
        }
    }, [supabase, resumeId, resumeName, data]);

    const loadResume = useCallback(async (id: string) => {
        setLoading(true);
        const { data: resume } = await supabase
            .from("resumes")
            .select("*")
            .eq("id", id)
            .single();

        if (resume) {
            const result = ResumeSchema.safeParse(resume.data);
            if (result.success) {
                setData(result.data);
                setResumeId(resume.id);
                setResumeName(resume.name);
            }
        }
        setLoading(false);
    }, [supabase]);

    return (
        <ResumeContext.Provider value={{
            data,
            resumeId,
            resumeName,
            loading,
            updateData,
            resetData,
            saveResume,
            loadResume,
            setResumeName,
            loadEditFromStorage,
        }}>
            {children}
        </ResumeContext.Provider>
    );
};


export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error("useResume must be used within a ResumeProvider");
    }
    return context;
};
