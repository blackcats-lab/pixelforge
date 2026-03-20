import { ImageResponse } from "next/og";

export const alt = "PixelForge — ブラウザ完結型 画像リサイズツール";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #3b82f6 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <div style={{ fontSize: "64px", fontWeight: 700 }}>PixelForge</div>
        </div>
        <div
          style={{
            fontSize: "28px",
            opacity: 0.9,
            maxWidth: "700px",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          ブラウザ完結型 画像リサイズツール
        </div>
        <div
          style={{
            marginTop: "32px",
            fontSize: "18px",
            opacity: 0.7,
            display: "flex",
            gap: "24px",
          }}
        >
          <span>PNG</span>
          <span>JPEG</span>
          <span>WebP</span>
          <span>アップロード不要</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
