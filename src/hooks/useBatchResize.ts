"use client";
import { useCallback } from "react";
import { resizeImage } from "@/lib/canvas/resize";
import { useBatchStore } from "@/stores/batchStore";

export function useBatchResize() {
  const {
    items,
    resizeMode,
    commonFormat,
    commonQuality,
    commonSmoothing,
    commonScale,
    commonWidth,
    commonHeight,
    updateItemStatus,
    setItemResult,
    setProcessing,
  } = useBatchStore();

  const resizeAll = useCallback(async () => {
    const pending = items.filter((item) => item.status === "pending" || item.status === "error");
    if (pending.length === 0) return;

    setProcessing(true);

    for (const item of pending) {
      updateItemStatus(item.id, "processing");

      try {
        const targetWidth = resizeMode === "dimensions"
          ? commonWidth
          : Math.round(item.width * commonScale);
        const targetHeight = resizeMode === "dimensions"
          ? commonHeight
          : Math.round(item.height * commonScale);

        const result = await resizeImage({
          imageSrc: item.src,
          targetWidth,
          targetHeight,
          format: commonFormat,
          quality: commonQuality,
          smoothing: commonSmoothing,
        });

        setItemResult(item.id, result.dataUrl, result.fileSize);
      } catch (err) {
        const message = err instanceof Error ? err.message : "リサイズに失敗しました";
        updateItemStatus(item.id, "error", message);
      }
    }

    setProcessing(false);
  }, [items, resizeMode, commonFormat, commonQuality, commonSmoothing, commonScale, commonWidth, commonHeight, updateItemStatus, setItemResult, setProcessing]);

  return { resizeAll };
}
