import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { ResumeData } from "@/lib/schemas/resume";
import { createClient } from "@/lib/supabase/server";
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

import { generateHighFidelityHTML } from "@/lib/pdf/high-fidelity-generator";

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
      try {
        chromium.setGraphicsMode = false;
        chromium.setHeadless = true;

        // Attempt local resolution
        executablePath = await chromium.executablePath();

        // Fallback: If for some reason the above returns a path that doesn't exist 
        // (though chromium lib usually handles this)
        if (!fs.existsSync(executablePath)) {
          console.warn("Chromium local path missing. Using remote fallback.");
          executablePath = await chromium.executablePath(
            `https://github.com/sparticuz/chromium/releases/download/v132.0.0/chromium-v132.0.0-pack.tar`
          );
        }

        console.log("Vercel/Serverless path resolved:", executablePath);
      } catch (cerr) {
        console.error("Local Chromium resolution failed:", cerr);
        // Direct remote fallback
        executablePath = await chromium.executablePath(
          `https://github.com/sparticuz/chromium/releases/download/v132.0.0/chromium-v132.0.0-pack.tar`
        );
      }
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
      console.log("Other platform detected. ExecutablePath:", executablePath);
    }

    console.log("Final ExecutablePath selected:", executablePath);

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
    page.setDefaultTimeout(30000);

    // Set viewport to A4 dimensions (at 96 DPI)
    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 2,
    });

    // 1. Generate high-fidelity HTML directly
    const htmlContent = generateHighFidelityHTML(data);

    // 2. Project HTML directly into Puppeteer
    // This avoids the concurrency deadlock of visiting a live route on the same server
    await page.setContent(htmlContent, { waitUntil: "load" });

    // 3. Specifically wait for fonts to ensure clarity
    await page.evaluate(async () => {
      await document.fonts.ready;
      // Brief pause for CSS rendering
      await new Promise(r => setTimeout(r, 500));
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
      preferCSSPageSize: true,
      displayHeaderFooter: false,
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
        "Content-Disposition": `attachment; filename=Resume_${(data.header?.name || "Untitled").replace(/\s+/g, "_")}.pdf`,
      },
    });
  } catch (error: any) {
    console.error("PDF Generation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

