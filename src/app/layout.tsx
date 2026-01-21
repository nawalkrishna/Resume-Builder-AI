import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ResumeProvider } from "@/lib/context/ResumeContext";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ATS Resume Builder | Professional Student Resumes",
  description: "Create premium, ATS-friendly resumes with modern UI/UX and professional templates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ResumeProvider>
          {children}
        </ResumeProvider>
      </body>
    </html>
  );
}
