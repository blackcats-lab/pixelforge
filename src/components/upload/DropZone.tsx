"use client";

import { Upload, ImagePlus } from "lucide-react";
import { useState, type DragEvent, type ChangeEvent, type RefObject } from "react";
import { ACCEPTED_EXTENSIONS } from "@/lib/constants";
import { motion } from "framer-motion";

interface DropZoneProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onOpenFileDialog: () => void;
}

export default function DropZone({
  fileInputRef,
  onFileChange,
  onDrop,
  onDragOver,
  onOpenFileDialog,
}: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
    onDrop(e);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center justify-center min-h-[60vh]"
    >
      <div
        onDrop={handleDrop}
        onDragOver={onDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onClick={onOpenFileDialog}
        className={`
          w-full max-w-xl mx-auto border-2 border-dashed rounded-2xl p-12
          flex flex-col items-center justify-center gap-4 cursor-pointer
          transition-all duration-200
          ${
            isDragging
              ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 scale-[1.02]"
              : "border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-900"
          }
        `}
      >
        <div
          className={`p-4 rounded-full transition-colors ${
            isDragging
              ? "bg-blue-100 dark:bg-blue-900"
              : "bg-gray-100 dark:bg-gray-800"
          }`}
        >
          {isDragging ? (
            <ImagePlus className="w-10 h-10 text-blue-500" />
          ) : (
            <Upload className="w-10 h-10 text-gray-400 dark:text-gray-500" />
          )}
        </div>

        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            {isDragging ? "Drop your image here" : "Upload an image"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Drag & drop or click to select
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            JPEG, PNG, WebP, BMP, GIF, SVG
          </p>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenFileDialog();
          }}
          className="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Select File
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          onChange={onFileChange}
          className="hidden"
        />
      </div>
    </motion.div>
  );
}
