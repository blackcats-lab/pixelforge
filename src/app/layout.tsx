import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PixelForge — Browser-based Image Resizer",
  description:
    "Resize images directly in your browser. No uploads, no servers — your images stay private. Supports PNG, JPEG, WebP with quality control.",
  openGraph: {
    title: "PixelForge — Browser-based Image Resizer",
    description:
      "Resize images directly in your browser. No uploads, no servers — your images stay private.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
