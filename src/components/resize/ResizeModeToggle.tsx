"use client";

interface ResizeModeToggleProps {
  smoothing: boolean;
  onSmoothingChange: (smoothing: boolean) => void;
}

export default function ResizeModeToggle({
  smoothing,
  onSmoothingChange,
}: ResizeModeToggleProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider">
        リサイズモード
      </label>
      <div className="flex gap-1.5">
        <button
          onClick={() => onSmoothingChange(true)}
          className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
            smoothing
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
        >
          スムーズ
        </button>
        <button
          onClick={() => onSmoothingChange(false)}
          className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
            !smoothing
              ? "bg-purple-600 text-white border-purple-600"
              : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
        >
          ドット絵向け
        </button>
      </div>
    </div>
  );
}
