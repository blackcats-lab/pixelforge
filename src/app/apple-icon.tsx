import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2563eb",
          borderRadius: "32px",
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            stroke="white"
            strokeWidth="28"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="120" y="140" width="152" height="152" rx="12" />
            <rect x="228" y="208" width="164" height="164" rx="12" />
            <path d="M228 296l36-48 24 30 36-42" />
            <path d="M348 208v-32a12 12 0 00-12-12h-72" />
            <path d="M312 140l36 36" />
            <path d="M348 140l-36 36" />
          </g>
        </svg>
      </div>
    ),
    { ...size },
  );
}
