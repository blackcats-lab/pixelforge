"use client";

import { useState } from "react";
import ImagePreview from "./ImagePreview";
import CompareSlider from "./CompareSlider";
import ImageInfo from "./ImageInfo";
import DownloadButton from "./DownloadButton";
import { Eye, SplitSquareHorizontal } from "lucide-react";

interface PreviewPanelProps {
  originalSrc: string;
  resizedSrc: string | null;
  fileName: string;
  originalWidth: number;
  originalHeight: number;
  originalFileSize: number;
  targetWidth: number | "";
  targetHeight: number | "";
  resizedFileSize: number | null;
  onDownload: () => void;
}

export default function PreviewPanel({
  originalSrc,
  resizedSrc,
  fileName,
  originalWidth,
  originalHeight,
  originalFileSize,
  targetWidth,
  targetHeight,
  resizedFileSize,
  onDownload,
}: PreviewPanelProps) {
  const [viewMode, setViewMode] = useState<"preview" | "compare">("preview");

  return (
    <div className="space-y-4 p-4 lg:p-5">
      {/* View mode toggle */}
      {resizedSrc && (
        <div className="flex gap-1.5">
          <button
            onClick={() => setViewMode("preview")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              viewMode === "preview"
                ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            プレビュー
          </button>
          <button
            onClick={() => setViewMode("compare")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              viewMode === "compare"
                ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <SplitSquareHorizontal className="w-3.5 h-3.5" />
            比較
          </button>
        </div>
      )}

      {/* Image display */}
      {viewMode === "compare" && resizedSrc ? (
        <CompareSlider originalSrc={originalSrc} resizedSrc={resizedSrc} />
      ) : (
        <ImagePreview src={resizedSrc || originalSrc} />
      )}

      {/* Image info */}
      <ImageInfo
        fileName={fileName}
        originalWidth={originalWidth}
        originalHeight={originalHeight}
        originalFileSize={originalFileSize}
        targetWidth={targetWidth}
        targetHeight={targetHeight}
        resizedFileSize={resizedFileSize}
      />

      {/* Download */}
      <DownloadButton onClick={onDownload} disabled={!resizedSrc} />
    </div>
  );
}
