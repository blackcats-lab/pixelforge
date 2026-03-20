import { create } from "zustand";
import type { ImageFormat } from "@/types";

interface ResizeState {
  format: ImageFormat;
  quality: number;
  smoothing: boolean;
  isProcessing: boolean;
  resizedDataUrl: string | null;
  resizedFileSize: number | null;

  setFormat: (format: ImageFormat) => void;
  setQuality: (quality: number) => void;
  setSmoothing: (smoothing: boolean) => void;
  setProcessing: (isProcessing: boolean) => void;
  setResult: (dataUrl: string, fileSize: number) => void;
  clearResult: () => void;
  resetAll: () => void;
}

export const useResizeStore = create<ResizeState>((set) => ({
  format: "image/png",
  quality: 0.9,
  smoothing: true,
  isProcessing: false,
  resizedDataUrl: null,
  resizedFileSize: null,

  setFormat: (format) => {
    const quality = format === "image/png" ? 1 : 0.9;
    set({ format, quality, resizedDataUrl: null, resizedFileSize: null });
  },
  setQuality: (quality) => set({ quality }),
  setSmoothing: (smoothing) => set({ smoothing }),
  setProcessing: (isProcessing) => set({ isProcessing }),
  setResult: (dataUrl, fileSize) =>
    set({
      resizedDataUrl: dataUrl,
      resizedFileSize: fileSize,
      isProcessing: false,
    }),
  clearResult: () => set({ resizedDataUrl: null, resizedFileSize: null }),
  resetAll: () =>
    set({
      format: "image/png",
      quality: 0.9,
      smoothing: true,
      isProcessing: false,
      resizedDataUrl: null,
      resizedFileSize: null,
    }),
}));
