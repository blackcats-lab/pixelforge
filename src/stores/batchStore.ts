import { create } from "zustand";
import type { BatchItem, ImageFormat } from "@/types";

export type BatchResizeMode = "scale" | "dimensions";

interface BatchState {
  items: BatchItem[];
  resizeMode: BatchResizeMode;
  commonFormat: ImageFormat;
  commonQuality: number;
  commonSmoothing: boolean;
  commonScale: number;
  commonWidth: number;
  commonHeight: number;
  isProcessing: boolean;

  addItems: (items: Omit<BatchItem, "status" | "resizedDataUrl" | "resizedFileSize" | "error">[]) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
  updateItemStatus: (id: string, status: BatchItem["status"], error?: string) => void;
  setItemResult: (id: string, dataUrl: string, fileSize: number) => void;
  setResizeMode: (mode: BatchResizeMode) => void;
  setCommonFormat: (format: ImageFormat) => void;
  setCommonQuality: (quality: number) => void;
  setCommonSmoothing: (smoothing: boolean) => void;
  setCommonScale: (scale: number) => void;
  setCommonWidth: (width: number) => void;
  setCommonHeight: (height: number) => void;
  setProcessing: (isProcessing: boolean) => void;
}

export const useBatchStore = create<BatchState>((set) => ({
  items: [],
  resizeMode: "scale",
  commonFormat: "image/png",
  commonQuality: 0.9,
  commonSmoothing: true,
  commonScale: 1,
  commonWidth: 1080,
  commonHeight: 1080,
  isProcessing: false,

  addItems: (newItems) =>
    set((state) => ({
      items: [
        ...state.items,
        ...newItems.map((item) => ({
          ...item,
          status: "pending" as const,
          resizedDataUrl: null,
          resizedFileSize: null,
          error: null,
        })),
      ],
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  clearAll: () =>
    set({ items: [], isProcessing: false }),

  updateItemStatus: (id, status, error) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, status, error: error ?? null } : item
      ),
    })),

  setItemResult: (id, dataUrl, fileSize) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, status: "done" as const, resizedDataUrl: dataUrl, resizedFileSize: fileSize }
          : item
      ),
    })),

  setCommonFormat: (commonFormat) => {
    const commonQuality = commonFormat === "image/png" ? 1 : 0.9;
    set({ commonFormat, commonQuality });
  },
  setCommonQuality: (commonQuality) => set({ commonQuality }),
  setCommonSmoothing: (commonSmoothing) => set({ commonSmoothing }),
  setCommonScale: (commonScale) => set({ commonScale }),
  setResizeMode: (resizeMode) => set({ resizeMode }),
  setCommonWidth: (commonWidth) => set({ commonWidth }),
  setCommonHeight: (commonHeight) => set({ commonHeight }),
  setProcessing: (isProcessing) => set({ isProcessing }),
}));
