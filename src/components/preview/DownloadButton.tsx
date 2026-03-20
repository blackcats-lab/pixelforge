"use client";

import { Download } from "lucide-react";

interface DownloadButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function DownloadButton({
  onClick,
  disabled,
}: DownloadButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
    >
      <Download className="w-4 h-4" />
      Download
    </button>
  );
}
