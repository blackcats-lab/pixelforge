import type { ScalePreset, SnsPreset } from "@/types";

export const SCALE_PRESETS: ScalePreset[] = [
  { label: "0.25x", scale: 0.25 },
  { label: "0.5x", scale: 0.5 },
  { label: "0.75x", scale: 0.75 },
  { label: "1.5x", scale: 1.5 },
  { label: "2x", scale: 2 },
  { label: "3x", scale: 3 },
  { label: "4x", scale: 4 },
];

export const SNS_PRESETS: SnsPreset[] = [
  { label: "投稿", platform: "Instagram", width: 1080, height: 1080 },
  { label: "ストーリー", platform: "Instagram", width: 1080, height: 1920 },
  { label: "投稿", platform: "X/Twitter", width: 1200, height: 675 },
  { label: "ヘッダー", platform: "X/Twitter", width: 1500, height: 500 },
  { label: "カバー", platform: "Facebook", width: 820, height: 312 },
  { label: "サムネイル", platform: "YouTube", width: 1280, height: 720 },
  { label: "OGP", platform: "Web", width: 1200, height: 630 },
];
