import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { ResumeData } from "@/lib/schemas/resume";
import { createClient } from "@/lib/supabase/server";
import { generateTemplateHTML } from "@/lib/templates/pdf-generator";
import fs from "fs";

// Function to find a valid browser executable on the system
function findBrowserExecutable(): string | null {
  const possiblePaths = [
    // Chrome 64-bit (most common)
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    // Chrome 32-bit (older systems)
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    // Edge (available on all modern Windows)
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    // Brave
    "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
  ];

  for (const browserPath of possiblePaths) {
    if (fs.existsSync(browserPath)) {
      return browserPath;
    }
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data: ResumeData = await req.json();

    let executablePath: string;

    // Detect if environment is production (Vercel/Serverless) or local
    const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;

    if (isServerless) {
      executablePath = await chromium.executablePath();
    } else if (process.platform === "win32") {
      const localBrowser = findBrowserExecutable();
      if (!localBrowser) {
        return NextResponse.json(
          { error: "No compatible browser found. Please install Chrome or Edge." },
          { status: 500 }
        );
      }
      executablePath = localBrowser;
    } else if (process.platform === "darwin") {
      executablePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    } else {
      executablePath = await chromium.executablePath();
    }

    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
      executablePath,
      headless: true,
    });

    const page = await browser.newPage();

    // Set viewport to Letter size at 96 DPI (8.5" x 11" = 816 x 1056 pixels)
    await page.setViewport({
      width: 816,
      height: 1056,
      deviceScaleFactor: 1,
    });

    // Generate template-aware HTML with inline styles
    const htmlContent = generateTemplateHTML(data);

    // Use setContent instead of navigation for reliable rendering
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Wait for fonts to load
    await page.evaluateHandle("document.fonts.ready");

    const pdf = await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: { top: "0in", right: "0in", bottom: "0in", left: "0in" },
      preferCSSPageSize: true,
    });

    await browser.close();

    // Log download history
    try {
      await supabase.from("download_history").insert({
        user_id: user.id,
        format: "pdf"
      });
    } catch (dbError) {
      console.error("Failed to log download history:", dbError);
    }

    return new NextResponse(pdf as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=Resume_${data.header.name.replace(/\s+/g, "_")}.pdf`,
      },
    });
  } catch (error: any) {
    console.error("PDF Generation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

