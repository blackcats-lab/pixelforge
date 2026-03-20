"use client";

import { Loader2, Scaling } from "lucide-react";

interface ResizeButtonProps {
  onClick: () => void;
  isProcessing: boolean;
  disabled?: boolean;
}

export default function ResizeButton({
  onClick,
  isProcessing,
  disabled,
}: ResizeButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isProcessing || disabled}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-800 text-white rounded-xl font-medium transition-colors"
    >
      {isProcessing ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Scaling className="w-4 h-4" />
          Resize
        </>
      )}
    </button>
  );
}
