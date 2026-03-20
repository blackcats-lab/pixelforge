"use client";

import { SCALE_PRESETS } from "@/lib/presets";

interface ScalePresetsProps {
  onApply: (scale: number) => void;
}

export default function ScalePresets({ onApply }: ScalePresetsProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Scale
      </label>
      <div className="grid grid-cols-4 gap-1.5">
        {SCALE_PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => onApply(preset.scale)}
            className="px-2 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
