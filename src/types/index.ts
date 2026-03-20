export type ImageFormat = "image/jpeg" | "image/png" | "image/webp";

export interface ResizeOptions {
  imageSrc: string;
  targetWidth: number;
  targetHeight: number;
  format: ImageFormat;
  quality: number; // 0.0 - 1.0
  smoothing: boolean; // false = ピクセルアートモード
}

export interface ResizeResult {
  dataUrl: string;
  width: number;
  height: number;
  blob: Blob;
  fileSize: number;
}

export interface UploadedImage {
  file: File;
  src: string; // Data URL
  width: number;
  height: number;
}

export interface ScalePreset {
  label: string;
  scale: number;
}

export interface SnsPreset {
  label: string;
  platform: string;
  width: number;
  height: number;
}
