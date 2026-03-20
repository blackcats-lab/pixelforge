"use client";
import { useCallback } from "react";
import { resizeImage } from "@/lib/canvas/resize";
import { multiStepResize } from "@/lib/canvas/multi-step";
import { useResizeStore } from "@/stores/resizeStore";
import type { UploadedImage } from "@/types";

export function useCanvasResize() {
  const { format, quality, smoothing, setProcessing, setResult } =
    useResizeStore();

  const resize = useCallback(
    async (image: UploadedImage, targetWidth: number, targetHeight: number) => {
      setProcessing(true);

      try {
        const scale = Math.max(
          targetWidth / image.width,
          targetHeight / image.height
        );

        if (scale > 4) {
          const dataUrl = await multiStepResize({
            imageSrc: image.src,
            originalWidth: image.width,
            originalHeight: image.height,
            targetWidth,
            targetHeight,
            format,
            quality,
            smoothing,
          });

          // Get file size from data URL
          const response = await fetch(dataUrl);
          const blob = await response.blob();
          setResult(dataUrl, blob.size);
        } else {
          const result = await resizeImage({
            imageSrc: image.src,
            targetWidth,
            targetHeight,
            format,
            quality,
            smoothing,
          });
          setResult(result.dataUrl, result.fileSize);
        }
      } catch (error) {
        console.error("Resize failed:", error);
        setProcessing(false);
        throw error;
      }
    },
    [format, quality, smoothing, setProcessing, setResult]
  );

  return { resize };
}
