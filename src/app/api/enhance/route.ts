import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";
import { EnhanceRequestSchema } from "@/lib/schemas/ai";
import { isRateLimited, rateLimitResponse } from "@/lib/security/rate-limit";

// Type-safe error response helper
const errorResponse = (message: string, details?: string[], status: number = 400) => {
    return NextResponse.json({
        error: message,
        details: details || []
    }, { status });
};

export async function POST(req: NextRequest) {
    try {
        // 1. Check authentication
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return errorResponse("Unauthorized", [], 401);
        }

        // 2. Payload Validation with Zod (Do this BEFORE rate limiting)
        const jsonBody = await req.json();
        const validation = EnhanceRequestSchema.safeParse(jsonBody);

        if (!validation.success) {
            const details = validation.error.issues.map(e => e.message);
            return errorResponse("Invalid request payload", details, 400);
        }

        // 3. Rate Limiting (Check per-user limit)
        const { success: limited, retryAfter } = isRateLimited(user.id, 10, 60000); // 10 req/min
        if (limited) {
            return rateLimitResponse(retryAfter);
        }

        const { type, content, context } = validation.data;

        // Check for API key (Prefer OpenRouter, fallback to OpenAI for compatibility if needed)
        const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.error("CRITICAL: AI API key not configured (OPENROUTER_API_KEY missing)");
            return errorResponse("Service unavailable (configuration missing).", [], 500);
        }

        const openai = new OpenAI({
            apiKey: apiKey,
            baseURL: "https://openrouter.ai/api/v1",
            defaultHeaders: {
                "HTTP-Referer": "https://networkershome.com", // Required for OpenRouter
                "X-Title": "AI Resume Builder", // Optional for OpenRouter
            }
        });

        let systemPrompt = `You are an expert resume writer specializing in ATS-optimized resumes. Your task is to enhance resume bullet points to be more impactful and ATS-friendly.

Guidelines:
- Start each bullet with a strong action verb (Developed, Led, Implemented, Optimized, etc.)
- Include quantifiable metrics where possible (percentages, numbers, timeframes)
- Use industry-standard keywords that ATS systems recognize
- Focus on impact and results, not just responsibilities`;

        let userPrompt = "";

        if (type === "experience") {
            systemPrompt += `\n- Format for work experience: Action verb + Task + Result/Impact`;
            userPrompt = `Enhance these work experience bullet points${context?.role ? ` for a ${context.role} role` : ""}${context?.organization ? ` at ${context.organization}` : ""}:

${content.map((bullet, i) => `${i + 1}. ${bullet}`).join("\n")}

Return ONLY the enhanced bullet points, one per line, numbered.`;
        } else if (type === "project") {
            systemPrompt += `\n- Highlight technical implementation details and impact`;
            userPrompt = `Enhance these project bullet points${context?.projectName ? ` for project "${context.projectName}"` : ""}:

${content.map((bullet, i) => `${i + 1}. ${bullet}`).join("\n")}

Return ONLY the enhanced bullet points, one per line, numbered.`;
        } else if (type === "achievement") {
            systemPrompt += `\n- Make achievements specific and measurable`;
            userPrompt = `Enhance this achievement:

${content[0]}

Return ONLY the enhanced achievement, single line.`;
        }

        const completion = await openai.chat.completions.create({
            model: "mistralai/mistral-7b-instruct:free", // High-quality free model via OpenRouter
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        const response = completion.choices[0]?.message?.content || "";

        // Log usage (background task)
        // Fire and forget but with a catch to avoid unhandled rejection
        createClient().then(async (supabaseClient) => {
            const { error: logError } = await supabaseClient.from("ai_usage").insert({
                user_id: user.id,
                type,
                input_text: JSON.stringify(content),
                output_text: response,
                tokens_used: completion.usage?.total_tokens || 0,
                model_used: "mistralai/mistral-7b-instruct:free"
            });
            if (logError) console.error("AI usage logging failed:", logError);
        }).catch(err => console.error("Supabase client creation for logging failed:", err));

        let enhanced: string[];
        if (type === "achievement") {
            enhanced = [response.trim()];
        } else {
            enhanced = response
                .split("\n")
                .map(line => line.replace(/^\d+\.\s*/, "").trim())
                .filter(line => line.length > 0);
        }

        return NextResponse.json({ enhanced });
    } catch (error: unknown) {
        console.error("Enhance API error:", error);
        const detail = error instanceof Error ? error.message : String(error);
        return errorResponse(`Failed to process enhancement request: ${detail}`, [], 500);
    }
}
