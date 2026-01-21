"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FormWrapper } from "@/components/forms/FormWrapper";
import { HeaderForm } from "@/components/forms/HeaderForm";
import { EducationForm } from "@/components/forms/EducationForm";
import { ExperienceForm } from "@/components/forms/ExperienceForm";
import { ProjectsForm } from "@/components/forms/ProjectsForm";
import { SkillsForm } from "@/components/forms/SkillsForm";
import { AchievementsForm } from "@/components/forms/AchievementsForm";
import { CertificationsForm } from "@/components/forms/CertificationsForm";
import { JSONImport } from "@/components/forms/JSONImport";
import { QuickPeek } from "@/components/ui/QuickPeek";
import { useResume } from "@/lib/context/ResumeContext";

const STEPS = ["Header", "Education", "Experience", "Projects", "Skills", "Achievements", "Certifications"];

function BuilderContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { loadEditFromStorage } = useResume();
    const [currentStep, setCurrentStep] = useState(0);
    const [isImportMode, setIsImportMode] = useState(false);

    useEffect(() => {
        if (searchParams.get("import") === "true") {
            setIsImportMode(true);
        }
        // If in edit mode, load the data from localStorage
        if (searchParams.get("edit") === "true") {
            loadEditFromStorage();
        }
    }, [searchParams, loadEditFromStorage]);


    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            router.push("/preview");
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleImportSuccess = () => {
        setIsImportMode(false);
        router.push("/preview");
    };

    const renderStep = () => {
        if (isImportMode) {
            return <JSONImport onSuccess={handleImportSuccess} onCancel={() => setIsImportMode(false)} />;
        }

        switch (currentStep) {
            case 0: return <HeaderForm onNext={handleNext} />;
            case 1: return <EducationForm onNext={handleNext} onBack={handleBack} />;
            case 2: return <ExperienceForm onNext={handleNext} onBack={handleBack} />;
            case 3: return <ProjectsForm onNext={handleNext} onBack={handleBack} />;
            case 4: return <SkillsForm onNext={handleNext} onBack={handleBack} />;
            case 5: return <AchievementsForm onNext={handleNext} onBack={handleBack} />;
            case 6: return <CertificationsForm onNext={handleNext} onBack={handleBack} />;
            default: return null;
        }
    };

    const getStepTitle = () => {
        if (isImportMode) return "Import Resume JSON";
        return STEPS[currentStep];
    };

    const getStepDescription = () => {
        if (isImportMode) return "Paste your valid resume JSON to populate all fields instantly.";

        switch (currentStep) {
            case 0: return "Start with your basic contact information and links.";
            case 1: return "Tell us about your educational background.";
            case 2: return "List your professional experience and internships.";
            case 3: return "Showcase your best projects and technical expertise.";
            case 4: return "Highlight your technical and interpersonal skills.";
            case 5: return "List your notable achievements and awards.";
            case 6: return "List your professional certifications and licenses.";
            default: return "";
        }
    };

    return (
        <>
            <FormWrapper
                currentStep={currentStep}
                totalSteps={STEPS.length}
                title={getStepTitle()}
                description={getStepDescription()}
                steps={STEPS}
            >
                {renderStep()}
            </FormWrapper>
            {!isImportMode && <QuickPeek />}
        </>
    );
}

export default function BuilderPage() {
    return (
        <main className="min-h-screen">
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                <BuilderContent />
            </Suspense>
        </main>
    );
}
