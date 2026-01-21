import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { ResumeData } from "@/lib/schemas/resume";
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
    const htmlContent = generateHTML(data);

    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0in", right: "0in", bottom: "0in", left: "0in" },
      preferCSSPageSize: true,
    });

    await browser.close();

    return new NextResponse(pdf as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume.pdf`,
      },
    });
  } catch (error: any) {
    console.error("PDF Generation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function generateHTML(data: ResumeData) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&display=swap');
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Crimson Pro', serif;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          @page {
            size: Letter;
            margin: 0;
          }
          html, body {
            margin: 0;
            padding: 0;
            width: 8.5in;
            height: 11in;
          }
          .page-wrapper {
            width: 8.5in;
            height: 11in;
            overflow: hidden;
            position: relative;
          }
          .resume-container {
            width: 8.5in;
            padding: 0.4in 0.5in;
            background: white;
            color: black;
            display: flex;
            flex-direction: column;
            gap: 6px;
            font-size: 10pt;
            line-height: 1.2;
            transform-origin: top left;
          }
          ul { list-style-type: disc; padding-left: 1rem; margin: 0; }
          li { margin-bottom: 0px; }
          .underline { text-decoration: underline; }
          section { display: flex; flex-direction: column; gap: 1px; }
          .section-title { 
            font-size: 10.5pt; 
            font-weight: bold; 
            text-transform: uppercase; 
            letter-spacing: 0.01em; 
            border-bottom: 1pt solid black; 
            padding-bottom: 0px; 
            margin-bottom: 1px;
          }
        </style>
        <script>
          // Auto-scale content to fit page
          window.onload = function() {
            const wrapper = document.querySelector('.page-wrapper');
            const content = document.querySelector('.resume-container');
            if (content && wrapper) {
              const contentHeight = content.scrollHeight;
              const pageHeight = 11 * 96 - (0.4 * 2 * 96); // 11in minus padding, at 96dpi
              if (contentHeight > pageHeight) {
                const scale = pageHeight / contentHeight;
                content.style.transform = 'scale(' + Math.min(scale, 1) + ')';
              }
            }
          };
        </script>
      </head>
      <body>
        <div class="page-wrapper">
          <div class="resume-container">
            <!-- Header -->
            <header class="text-center border-b border-black pb-1">
              <h1 class="text-xl font-bold uppercase tracking-wide">${data.header.name}</h1>
              <div class="flex flex-wrap justify-center gap-1 text-[9pt]">
                <span>${data.header.location}</span>
                <span>•</span>
                <span>${data.header.phone}</span>
                <span>•</span>
                <span class="underline">${data.header.email}</span>
              </div>
              <div class="flex flex-wrap justify-center gap-2 text-[8pt]">
                ${data.header.linkedin ? `<a href="${data.header.linkedin}" class="underline">LinkedIn</a>` : ""}
                ${data.header.github ? `<a href="${data.header.github}" class="underline">GitHub</a>` : ""}
                ${data.header.leetcode ? `<a href="${data.header.leetcode}" class="underline">LeetCode</a>` : ""}
              </div>
            </header>

          <!-- Education -->
          <section>
            <h2 class="section-title">Education</h2>
            ${data.education.map(edu => `
              <div class="flex justify-between items-start">
                <div>
                  <div class="font-bold">${edu.institution}</div>
                  <div class="italic">${edu.degree}</div>
                </div>
                <div class="text-right">
                  <div class="font-bold">${edu.duration}</div>
                  <div>CGPA: ${edu.cgpa}</div>
                </div>
              </div>
            `).join("")}
          </section>

          <!-- Experience -->
          ${data.experience.length > 0 ? `
            <section class="space-y-1">
              <h2 class="section-title">Experience</h2>
              ${data.experience.map(exp => `
                <div class="space-y-1">
                  <div class="flex justify-between items-start">
                    <div>
                      <span class="font-bold">${exp.organization}</span>
                      <span class="mx-2">|</span>
                      <span class="italic">${exp.role}</span>
                    </div>
                    <div class="font-bold">${exp.duration}</div>
                  </div>
                  <ul class="list-disc list-outside ml-5 space-y-0.5">
                    ${exp.bullets.map(bullet => `<li>${bullet}</li>`).join("")}
                  </ul>
                </div>
              `).join("")}
            </section>
          ` : ""}

          <!-- Projects -->
          ${data.projects.length > 0 ? `
            <section class="space-y-1">
              <h2 class="section-title">Projects</h2>
              ${data.projects.map(proj => `
                <div class="space-y-1">
                  <div class="flex justify-between items-start">
                    <div>
                      <span class="font-bold">${proj.name}</span>
                      <span class="mx-2">|</span>
                      <span class="italic text-[10pt]">${proj.techStack}</span>
                    </div>
                    ${proj.link ? `<a href="${proj.link}" class="underline text-[10pt]">Link</a>` : ""}
                  </div>
                  <ul class="list-disc list-outside ml-5 space-y-0.5">
                    ${proj.bullets.map(bullet => `<li>${bullet}</li>`).join("")}
                  </ul>
                </div>
              `).join("")}
            </section>
          ` : ""}

          <!-- Skills -->
          ${data.skills.categories && data.skills.categories.length > 0 ? `
            <section class="space-y-1">
              <h2 class="section-title">Technical Skills</h2>
              <div class="space-y-0.5">
                ${data.skills.categories.filter(cat => cat.skills).map(cat => `<p><strong>${cat.category}:</strong> ${cat.skills}</p>`).join("")}
              </div>
            </section>
          ` : ""}


          <!-- Achievements -->
          ${data.achievements.length > 0 ? `
            <section class="space-y-1">
              <h2 class="section-title">Achievements</h2>
              <ul class="list-disc list-outside ml-5 space-y-0.5">
                ${data.achievements.map(ach => `<li>${ach}</li>`).join("")}
              </ul>
            </section>
          ` : ""}

          <!-- Certifications -->
          ${data.certifications.length > 0 ? `
            <section class="space-y-1">
              <h2 class="section-title">Certifications</h2>
              <ul class="list-disc list-outside ml-5 space-y-0.5">
                ${data.certifications.map(cert => `<li>${cert}</li>`).join("")}
              </ul>
            </section>
          ` : ""}
        </div>
        </div>
      </body>
    </html>
  `;
}
