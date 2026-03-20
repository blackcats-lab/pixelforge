"use client";

import { X, Loader2, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { formatFileSize } from "@/lib/file-utils";
import type { BatchItem as BatchItemType } from "@/types";
import type { BatchResizeMode } from "@/stores/batchStore";

interface BatchItemProps {
  item: BatchItemType;
  resizeMode: BatchResizeMode;
  scale: number;
  targetWidth: number;
  targetHeight: number;
  onRemove: (id: string) => void;
}

const STATUS_CONFIG = {
  pending: { icon: Clock, label: "待機中", color: "text-gray-400" },
  processing: { icon: Loader2, label: "処理中", color: "text-blue-500" },
  done: { icon: CheckCircle2, label: "完了", color: "text-green-500" },
  error: { icon: AlertCircle, label: "エラー", color: "text-red-500" },
} as const;

export default function BatchItem({
  item,
  resizeMode,
  scale,
  targetWidth,
  targetHeight,
  onRemove,
}: BatchItemProps) {
  const config = STATUS_CONFIG[item.status];
  const StatusIcon = config.icon;

  const tW = resizeMode === "dimensions" ? targetWidth : Math.round(item.width * scale);
  const tH = resizeMode === "dimensions" ? targetHeight : Math.round(item.height * scale);

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      {/* Thumbnail */}
      <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
        <img
          src={item.src}
          alt={item.file.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate text-gray-700 dark:text-gray-300">
          {item.file.name}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {item.width}×{item.height} → {tW}×{tH}
          {item.resizedFileSize !== null && (
            <span className="ml-2">({formatFileSize(item.resizedFileSize)})</span>
          )}
        </p>
        {item.error && (
          <p className="text-xs text-red-500 mt-0.5">{item.error}</p>
        )}
      </div>

      {/* Status */}
      <div className={`flex items-center gap-1.5 text-xs ${config.color}`}>
        <StatusIcon
          className={`w-4 h-4 ${item.status === "processing" ? "animate-spin" : ""}`}
        />
        <span className="hidden sm:inline">{config.label}</span>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(item.id)}
        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        aria-label="削除"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
