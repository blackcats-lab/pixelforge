"use client";
import { useCallback } from "react";
import { generateFileName } from "@/lib/file-utils";
import type { ImageFormat } from "@/types";

export function useDownload() {
  const download = useCallback(
    (params: {
      dataUrl: string;
      originalFileName: string;
      width: number;
      height: number;
      format: ImageFormat;
    }) => {
      const { dataUrl, originalFileName, width, height, format } = params;

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = generateFileName(originalFileName, width, height, format);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    []
  );

  return { download };
}
