"use client";

import { Lock, Unlock } from "lucide-react";

interface DimensionInputProps {
  width: number | "";
  height: number | "";
  isLocked: boolean;
  onWidthChange: (val: number | "") => void;
  onHeightChange: (val: number | "") => void;
  onToggleLock: () => void;
  originalWidth: number;
  originalHeight: number;
}

export default function DimensionInput({
  width,
  height,
  isLocked,
  onWidthChange,
  onHeightChange,
  onToggleLock,
  originalWidth,
  originalHeight,
}: DimensionInputProps) {
  const handleChange = (
    value: string,
    setter: (val: number | "") => void
  ) => {
    if (value === "") {
      setter("");
      return;
    }
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      setter(num);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Size
      </label>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
            W
          </label>
          <input
            type="number"
            value={width}
            onChange={(e) => handleChange(e.target.value, onWidthChange)}
            min={1}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        <button
          onClick={onToggleLock}
          className="mt-5 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={isLocked ? "Unlock aspect ratio" : "Lock aspect ratio"}
        >
          {isLocked ? (
            <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          ) : (
            <Unlock className="w-4 h-4 text-gray-400" />
          )}
        </button>

        <div className="flex-1">
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
            H
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => handleChange(e.target.value, onHeightChange)}
            min={1}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500">
        Original: {originalWidth} × {originalHeight}
      </p>
    </div>
  );
}
