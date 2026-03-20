"use client";

import { useState, useRef, useCallback } from "react";
import type { DragEvent, ChangeEvent } from "react";
import { Upload, ImagePlus } from "lucide-react";
import { ACCEPTED_EXTENSIONS, MAX_BATCH_FILES } from "@/lib/constants";
import { isValidImageType } from "@/lib/file-utils";
import { useBatchStore } from "@/stores/batchStore";

export default function BatchUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { items, addItems } = useBatchStore();

  const processFiles = useCallback(
    (files: FileList) => {
      const remaining = MAX_BATCH_FILES - items.length;
      if (remaining <= 0) {
        alert(`最大${MAX_BATCH_FILES}枚までアップロードできます。`);
        return;
      }

      const validFiles = Array.from(files)
        .filter(isValidImageType)
        .slice(0, remaining);

      if (validFiles.length === 0) {
        alert("対応していないファイル形式です。");
        return;
      }

      const promises = validFiles.map(
        (file) =>
          new Promise<{
            id: string;
            file: File;
            src: string;
            width: number;
            height: number;
          }>((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const src = event.target?.result as string;
              const img = new Image();
              img.onload = () => {
                resolve({
                  id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
                  file,
                  src,
                  width: img.width,
                  height: img.height,
                });
              };
              img.src = src;
            };
            reader.readAsDataURL(file);
          })
      );

      Promise.all(promises).then((newItems) => {
        addItems(newItems);
      });
    },
    [items.length, addItems]
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
        e.target.value = "";
      }
    },
    [processFiles]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onClick={() => fileInputRef.current?.click()}
      className={`
        border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
        ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 scale-[1.01]"
            : "border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-900"
        }
      `}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className={`p-3 rounded-full ${
            isDragging
              ? "bg-blue-100 dark:bg-blue-900"
              : "bg-gray-100 dark:bg-gray-800"
          }`}
        >
          {isDragging ? (
            <ImagePlus className="w-8 h-8 text-blue-500" />
          ) : (
            <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          )}
        </div>
        <div>
          <p className="font-medium text-gray-700 dark:text-gray-300">
            {isDragging ? "ここにドロップ" : "画像をアップロード"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ドラッグ＆ドロップ または クリックして選択（最大{MAX_BATCH_FILES}枚）
          </p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS}
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
