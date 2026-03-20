import type { ResizeOptions, ResizeResult } from "@/types";

/**
 * Canvas API による画像リサイズ
 */
export function resizeImage(options: ResizeOptions): Promise<ResizeResult> {
  const { imageSrc, targetWidth, targetHeight, format, quality, smoothing } =
    options;

  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas 2D context"));
        return;
      }

      ctx.imageSmoothingEnabled = smoothing;
      if (smoothing) {
        ctx.imageSmoothingQuality = "high";
      }

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const dataUrl = canvas.toDataURL(format, quality);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to create blob"));
            return;
          }
          resolve({
            dataUrl,
            width: targetWidth,
            height: targetHeight,
            blob,
            fileSize: blob.size,
          });
        },
        format,
        quality
      );
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageSrc;
  });
}
