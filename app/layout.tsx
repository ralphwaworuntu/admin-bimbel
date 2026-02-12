import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandPalette } from "@/components/command-palette";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InstantEngine | Premium WaaS Builder for Modern Brands",
  description: "Launch high-performance, beautiful websites in minutes with our AI-powered template engine. Optimized for speed, aesthetics, and conversion.",
  keywords: ["WaaS", "Website Builder", "AI Website", "Modern Design", "InstantEngine", "Template Engine"],
  authors: [{ name: "InstantEngine Team" }],
  openGraph: {
    title: "InstantEngine | Premium WaaS Builder",
    description: "The ultimate platform for launching modern brands.",
    url: "https://instantengine.ai",
    siteName: "InstantEngine",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary-brand/30 selection:text-primary-brand`}
      >
        <ThemeProvider>
          <CommandPalette />
          <div className="page-transition-wrapper min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
