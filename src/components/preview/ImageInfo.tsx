"use client";

import { formatFileSize } from "@/lib/file-utils";

interface ImageInfoProps {
  fileName: string;
  originalWidth: number;
  originalHeight: number;
  originalFileSize: number;
  targetWidth: number | "";
  targetHeight: number | "";
  resizedFileSize: number | null;
}

export default function ImageInfo({
  fileName,
  originalWidth,
  originalHeight,
  originalFileSize,
  targetWidth,
  targetHeight,
  resizedFileSize,
}: ImageInfoProps) {
  const tW = typeof targetWidth === "number" ? targetWidth : originalWidth;
  const tH = typeof targetHeight === "number" ? targetHeight : originalHeight;
  const scalePercent = Math.round(
    Math.max(tW / originalWidth, tH / originalHeight) * 100
  );

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-2 text-sm">
      <p className="font-medium text-gray-700 dark:text-gray-300 truncate">
        {fileName}
      </p>
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
        <div>
          <span className="block text-gray-400 dark:text-gray-500">Original</span>
          <span>
            {originalWidth} × {originalHeight} ({formatFileSize(originalFileSize)})
          </span>
        </div>
        <div>
          <span className="block text-gray-400 dark:text-gray-500">Target</span>
          <span>
            {tW} × {tH}
            {resizedFileSize !== null && ` (${formatFileSize(resizedFileSize)})`}
          </span>
        </div>
        <div>
          <span className="block text-gray-400 dark:text-gray-500">Scale</span>
          <span>{scalePercent}%</span>
        </div>
      </div>
    </div>
  );
}
