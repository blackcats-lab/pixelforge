"use client";
import { useState, useRef, useCallback } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { isValidImageType } from "@/lib/file-utils";
import type { UploadedImage } from "@/types";

export function useFileUpload() {
  const [image, setImage] = useState<UploadedImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!isValidImageType(file)) {
      alert("対応していないファイル形式です。JPEG, PNG, WebP, BMP, GIF, SVG に対応しています。");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        setImage({
          file,
          src,
          width: img.width,
          height: img.height,
        });
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const reset = useCallback(() => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return {
    image,
    fileInputRef,
    handleFileChange,
    handleDrop,
    handleDragOver,
    reset,
    openFileDialog,
  };
}
