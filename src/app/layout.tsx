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
  metadataBase: new URL("https://pixelforge.me"),
  title: {
    default: "PixelForge — ブラウザ完結型 画像リサイズツール",
    template: "%s | PixelForge",
  },
  description:
    "ブラウザ上で画像をリサイズ。サーバーへのアップロード不要で、プライバシーを守ります。PNG, JPEG, WebP対応、品質調整も可能。",
  keywords: [
    "画像リサイズ",
    "画像変換",
    "画像圧縮",
    "ブラウザ",
    "オンライン",
    "PNG",
    "JPEG",
    "WebP",
    "無料",
    "プライバシー",
    "PixelForge",
  ],
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PixelForge — ブラウザ完結型 画像リサイズツール",
    description:
      "ブラウザ上で画像をリサイズ。サーバーへのアップロード不要で、プライバシーを守ります。",
    type: "website",
    url: "/",
    siteName: "PixelForge",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelForge — ブラウザ完結型 画像リサイズツール",
    description:
      "ブラウザ上で画像をリサイズ。サーバーへのアップロード不要で、プライバシーを守ります。PNG, JPEG, WebP対応。",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "PixelForge",
              url: "https://pixelforge.me",
              description:
                "ブラウザ上で画像をリサイズ。サーバーへのアップロード不要で、プライバシーを守ります。PNG, JPEG, WebP対応、品質調整も可能。",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "All",
              browserRequirements: "Requires a modern web browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "JPY",
              },
              inLanguage: "ja",
            }),
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
