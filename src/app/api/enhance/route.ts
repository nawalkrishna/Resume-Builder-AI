import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";

interface EnhanceRequest {
    type: "experience" | "project" | "achievement";
    content: string[];
    context?: {
        role?: string;
        organization?: string;
        projectName?: string;
        techStack?: string;
        jobDescription?: string;
    };
}

export async function POST(req: NextRequest) {
    try {
        // Check for API key
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: "OpenAI API key not configured. Please add OPENAI_API_KEY to your .env.local file." },
                { status: 500 }
            );
        }

        // Check authentication
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }


        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const body: EnhanceRequest = await req.json();
        const { type, content, context } = body;

        if (!content || content.length === 0) {
            return NextResponse.json({ error: "No content to enhance" }, { status: 400 });
        }

        let systemPrompt = `You are an expert resume writer specializing in ATS-optimized resumes. Your task is to enhance resume bullet points to be more impactful and ATS-friendly.

Guidelines:
- Start each bullet with a strong action verb (Developed, Led, Implemented, Optimized, etc.)
- Include quantifiable metrics where possible (percentages, numbers, timeframes)
- Use industry-standard keywords that ATS systems recognize
- Keep each bullet concise (1-2 lines max)
- Focus on impact and results, not just responsibilities
- Use specific technical terms relevant to the field`;

        let userPrompt = "";

        if (type === "experience") {
            systemPrompt += `\n- Format for work experience: Action verb + Task + Result/Impact`;
            userPrompt = `Enhance these work experience bullet points${context?.role ? ` for a ${context.role} role` : ""}${context?.organization ? ` at ${context.organization}` : ""}${context?.jobDescription ? `\n\nTarget job context: ${context.jobDescription}` : ""}:

${content.map((bullet, i) => `${i + 1}. ${bullet}`).join("\n")}

Return ONLY the enhanced bullet points, one per line, numbered. Keep the same number of bullets.`;
        } else if (type === "project") {
            systemPrompt += `\n- Highlight technical implementation details and impact
- Mention specific technologies and their role in the project`;
            userPrompt = `Enhance these project bullet points${context?.projectName ? ` for project "${context.projectName}"` : ""}${context?.techStack ? ` using ${context.techStack}` : ""}${context?.jobDescription ? `\n\nTarget job context: ${context.jobDescription}` : ""}:

${content.map((bullet, i) => `${i + 1}. ${bullet}`).join("\n")}

Return ONLY the enhanced bullet points, one per line, numbered. Keep the same number of bullets.`;
        } else if (type === "achievement") {
            systemPrompt += `\n- Make achievements specific, measurable, and impressive
- Include rankings, percentiles, or competitive context where relevant`;
            userPrompt = `Enhance this achievement to be more impactful and specific${context?.jobDescription ? `\n\nTarget job context: ${context.jobDescription}` : ""}:

${content[0]}

Return ONLY the enhanced achievement, single line.`;
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        const response = completion.choices[0]?.message?.content || "";
        const tokensUsed = completion.usage?.total_tokens || 0;

        // Simple cost estimation for gpt-4o-mini ($0.150 / 1M input tokens, $0.600 / 1M output tokens)
        const costUsd = (completion.usage?.prompt_tokens || 0) * 0.00000015 + (completion.usage?.completion_tokens || 0) * 0.0000006;

        // Log usage to database
        try {
            await supabase.from("ai_usage").insert({
                user_id: user.id,
                type,
                input_text: JSON.stringify(content),
                output_text: response,
                tokens_used: tokensUsed,
                cost_usd: costUsd
            });
        } catch (dbError) {
            console.error("Failed to log AI usage:", dbError);
        }

        // Parse the response based on type
        let enhanced: string[];
        if (type === "achievement") {
            enhanced = [response.trim()];
        } else {
            // Parse numbered bullets
            enhanced = response
                .split("\n")
                .map(line => line.replace(/^\d+\.\s*/, "").trim())
                .filter(line => line.length > 0);
        }

        return NextResponse.json({ enhanced });
    } catch (error: any) {
        console.error("Enhance API error:", error);

        if (error?.code === "insufficient_quota") {
            return NextResponse.json({ error: "OpenAI quota exceeded. Please check your API billing." }, { status: 402 });
        }

        return NextResponse.json({ error: "Failed to enhance content. " + (error?.message || "") }, { status: 500 });
    }
}
