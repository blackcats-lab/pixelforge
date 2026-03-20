"use client";

import type { ImageFormat } from "@/types";

interface FormatSelectProps {
  format: ImageFormat;
  onFormatChange: (format: ImageFormat) => void;
}

const FORMATS: { value: ImageFormat; label: string }[] = [
  { value: "image/png", label: "PNG" },
  { value: "image/jpeg", label: "JPEG" },
  { value: "image/webp", label: "WebP" },
];

export default function FormatSelect({
  format,
  onFormatChange,
}: FormatSelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Format
      </label>
      <div className="flex gap-1.5">
        {FORMATS.map((f) => (
          <button
            key={f.value}
            onClick={() => onFormatChange(f.value)}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
              format === f.value
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
