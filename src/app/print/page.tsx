"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ResumeData } from "@/lib/schemas/resume";
import { getTemplate } from "@/lib/templates/registry";

function PrintContent() {
    const searchParams = useSearchParams();
    const [data, setData] = useState<ResumeData | null>(null);

    useEffect(() => {
        // Get resume data from URL params (base64 encoded)
        const encodedData = searchParams.get("data");
        if (encodedData) {
            try {
                const decoded = JSON.parse(atob(decodeURIComponent(encodedData)));
                setData(decoded);
            } catch (e) {
                console.error("Failed to decode resume data:", e);
            }
        }
    }, [searchParams]);

    if (!data) {
        return (
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                background: "white"
            }}>
                <p>Loading resume...</p>
            </div>
        );
    }

    const TemplateComponent = getTemplate(data.template || "simple");

    return (
        <div style={{
            width: "8.5in",
            minHeight: "11in",
            margin: "0 auto",
            background: "white"
        }}>
            <TemplateComponent data={data} />
        </div>
    );
}

export default function PrintPage() {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=816" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
                    rel="stylesheet"
                />
                <style dangerouslySetInnerHTML={{
                    __html: `
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    
                    @page {
                        size: 8.5in 11in;
                        margin: 0;
                    }
                    
                    html {
                        width: 8.5in;
                        background: white;
                    }
                    
                    body {
                        width: 8.5in;
                        min-height: 11in;
                        margin: 0;
                        padding: 0;
                        background: white;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                `}} />
            </head>
            <body>
                <Suspense fallback={
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh"
                    }}>
                        <p>Loading...</p>
                    </div>
                }>
                    <PrintContent />
                </Suspense>
            </body>
        </html>
    );
}
