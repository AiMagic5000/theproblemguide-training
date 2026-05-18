import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "7-Day AI Training - The Problem Guide",
  description: "Your step-by-step system to start using AI in 7 days.",
  robots: "noindex, nofollow",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  themeColor: "#cf011d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${oswald.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
