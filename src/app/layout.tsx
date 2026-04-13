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
