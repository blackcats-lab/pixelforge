"use client";

import { SNS_PRESETS } from "@/lib/presets";

interface SnsPresetsProps {
  onApply: (width: number, height: number) => void;
}

export default function SnsPresets({ onApply }: SnsPresetsProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider">
        SNS プリセット
      </label>
      <div className="space-y-1">
        {SNS_PRESETS.map((preset) => (
          <button
            key={`${preset.platform}-${preset.label}`}
            onClick={() => onApply(preset.width, preset.height)}
            className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
          >
            <span className="font-medium">
              {preset.platform} {preset.label}
            </span>
            <span className="text-gray-400 dark:text-gray-500">
              {preset.width}×{preset.height}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
