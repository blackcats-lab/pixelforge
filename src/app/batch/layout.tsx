import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "一括画像リサイズ",
  description:
    "複数の画像をまとめてリサイズし、ZIPでダウンロード。ブラウザ内で完結するため、サーバーへのアップロードは不要です。",
  openGraph: {
    title: "一括画像リサイズ | PixelForge",
    description:
      "複数の画像をまとめてリサイズし、ZIPでダウンロード。ブラウザ内で完結。",
    url: "/batch",
  },
  alternates: {
    canonical: "/batch",
  },
};

export default function BatchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
