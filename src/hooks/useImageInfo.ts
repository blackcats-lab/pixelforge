"use client";
import { useMemo } from "react";
import { formatFileSize } from "@/lib/file-utils";
import type { UploadedImage } from "@/types";

export function useImageInfo(
  image: UploadedImage | null,
  targetWidth: number | "",
  targetHeight: number | ""
) {
  return useMemo(() => {
    if (!image) return null;

    const origW = image.width;
    const origH = image.height;
    const tW = typeof targetWidth === "number" ? targetWidth : origW;
    const tH = typeof targetHeight === "number" ? targetHeight : origH;

    const scalePercent = Math.round(
      (Math.max(tW / origW, tH / origH)) * 100
    );

    return {
      fileName: image.file.name,
      originalSize: `${origW} × ${origH}`,
      targetSize: `${tW} × ${tH}`,
      fileSize: formatFileSize(image.file.size),
      scalePercent: `${scalePercent}%`,
    };
  }, [image, targetWidth, targetHeight]);
}
