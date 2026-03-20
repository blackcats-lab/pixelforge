"use client";

interface QualitySliderProps {
  quality: number;
  onQualityChange: (quality: number) => void;
  disabled?: boolean;
}

export default function QualitySlider({
  quality,
  onQualityChange,
  disabled,
}: QualitySliderProps) {
  return (
    <div className={`space-y-2 ${disabled ? "opacity-50" : ""}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider">
          品質
        </label>
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
          {Math.round(quality * 100)}%
        </span>
      </div>
      <input
        type="range"
        min={10}
        max={100}
        value={Math.round(quality * 100)}
        onChange={(e) => onQualityChange(parseInt(e.target.value, 10) / 100)}
        disabled={disabled}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  );
}
