import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JudgeLib | Code Execution Engine by Lightningsagar",
  description:
    "JudgeLib (lib-judge) — a powerful Node.js-based code execution engine by Lightningsagar (Sagar Seth). Supports Docker, Redis, KEDA, and microservice scaling for safe, efficient, multi-language code evaluation.",
  authors: [{ name: "Lightning Sagar (Sagar Seth)", url: "https://github.com/lightning-sagar" }],
  keywords: [
    "JudgeLib",
    "lib-judge",
    "Lightningsagar",
    "Sagar Seth",
    "Judge",
    "code execution engine",
    "code runner",
    "online judge",
    "Node.js",
    "TypeScript",
    "microservice",
    "Docker",
    "Kubernetes",
    "KEDA",
    "HPA",
    "Redis",
    "child_process",
    "spawn",
    "secure code execution",
    "serverless workers",
    "Render microservice",
    "self-host deployment",
    "NPM package",
    "distributed computing",
    "testcase manager",
    "code sandbox",
    "isolated environment",
    "open source",
    "GitHub",
    "developer tools",
    "CI/CD integration",
  ],
  openGraph: {
    title: "JudgeLib | The Open Source Code Execution Engine",
    description:
      "JudgeLib (lib-judge) by Lightningsagar — a secure and scalable Node.js library for executing code across multiple environments using Redis, Docker, and Kubernetes.",
    url: "https://github.com/lightning-sagar/Judge",
    siteName: "JudgeLib",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JudgeLib | Code Execution Engine by Lightningsagar",
    description:
      "JudgeLib (lib-judge) is a scalable Node.js-based code execution engine using Redis, Docker, and KEDA. Built by Lightningsagar (Sagar Seth).",
    creator: "@LightningSagar1",
    images: ["https://raw.githubusercontent.com/lightning-sagar/Judge/main/banner.png"],
  },
  alternates: {
    canonical: "https://github.com/lightning-sagar/Judge",
  },
  metadataBase: new URL("https://github.com/lightning-sagar/Judge"),
  category: "software",
  creator: "Lightningsagar (Sagar Seth)",
  publisher: "JudgeLib Team",
  robots: "index, follow",
  themeColor: "#f97316",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
