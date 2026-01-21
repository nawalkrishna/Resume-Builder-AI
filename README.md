# ATS-Friendly Resume Builder (Student Focused)

A production-grade web application for college students to create ATS-optimized resumes. Built with Next.js, Puppeteer, and Zod.

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher

### 2. Installation
Clone the repository (or extract the files) and run:
```bash
npm install
```

### 3. Run Development Server
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 🛠️ How to Use

1. **Build Your Resume**: Click on "Build My Resume" and fill in the multi-step form.
2. **Dynamic Sections**: You can add entries for Education, Experience, and Projects. Separation of bullet points is handled via new lines.
3. **Preview**: Once finished, you'll be redirected to the preview page to verify your details.
4. **Download PDF**: Click the "Download PDF" button. The server will generate a high-quality, ATS-compliant PDF for you.

---

## 🏗️ Production Build

To create an optimized production build:
```bash
npm run build
npm run start
```

---

## 📝 Important Notes for PDF Generation

### Local Development vs Production
This project uses `@sparticuz/chromium` and `puppeteer-core` for PDF generation, which is optimized for **Vercel Serverless Functions**.

- **In Production (Vercel)**: PDF generation will work automatically.
- **In Local Development (Windows/Mac)**: You may need to have Google Chrome or Microsoft Edge installed. The `api/export` route is configured for serverless environments. If you encounter issues generating PDFs locally, ensures that the executable path in `src/app/api/export/route.ts` points to your local Chrome installation.

---

## 📂 Project Structure

- `src/app`: Next.js App Router pages and API routes.
- `src/components`: UI components and form logic.
- `src/lib`: Zod schemas, state management, and resume templates.
- `src/lib/schemas/resume.ts`: The "Source of Truth" JSON schema.
- `src/lib/templates/ats-resume.tsx`: The ATS-optimized HTML layout.
