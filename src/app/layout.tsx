import type { Metadata, Viewport } from "next";
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
  title: "PixelForge — ブラウザ完結型 画像リサイズツール",
  description:
    "ブラウザ上で画像をリサイズ。サーバーへのアップロード不要で、プライバシーを守ります。PNG, JPEG, WebP対応、品質調整も可能。",
  manifest: "/manifest.json",
  openGraph: {
    title: "PixelForge — ブラウザ完結型 画像リサイズツール",
    description:
      "ブラウザ上で画像をリサイズ。サーバーへのアップロード不要で、プライバシーを守ります。",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
