import { ACCEPTED_IMAGE_TYPES } from "./constants";
import type { ImageFormat } from "@/types";

export function isValidImageType(file: File): boolean {
  return (ACCEPTED_IMAGE_TYPES as readonly string[]).includes(file.type);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getExtensionFromFormat(format: ImageFormat): string {
  switch (format) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
  }
}

export function getDefaultFormat(file: File): ImageFormat {
  switch (file.type) {
    case "image/jpeg":
      return "image/jpeg";
    case "image/webp":
      return "image/webp";
    default:
      return "image/png";
  }
}

export function generateFileName(
  originalName: string,
  width: number,
  height: number,
  format: ImageFormat
): string {
  const ext = getExtensionFromFormat(format);
  const baseName =
    originalName.substring(0, originalName.lastIndexOf(".")) || "image";
  return `${baseName}_${width}x${height}.${ext}`;
}
