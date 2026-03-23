"use client";

import { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/layout/Header";
import DropZone from "@/components/upload/DropZone";
import SettingsPanel from "@/components/resize/SettingsPanel";
import PreviewPanel from "@/components/preview/PreviewPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useAspectRatio } from "@/hooks/useAspectRatio";
import { useCanvasResize } from "@/hooks/useCanvasResize";
import { useDownload } from "@/hooks/useDownload";
import { useResizeStore } from "@/stores/resizeStore";
import { getDefaultFormat } from "@/lib/file-utils";

interface HomeClientProps {
  landingContent: React.ReactNode;
}

export default function HomeClient({ landingContent }: HomeClientProps) {
  const {
    image,
    fileInputRef,
    handleFileChange,
    handleDrop,
    handleDragOver,
    reset: resetUpload,
    openFileDialog,
  } = useFileUpload();

  const {
    width,
    height,
    isLocked,
    setWidth,
    setHeight,
    toggleLock,
    applyScale,
    applyPreset,
    reset: resetAspect,
  } = useAspectRatio(image?.width ?? 1, image?.height ?? 1);

  const { resize } = useCanvasResize();
  const { download } = useDownload();
  const {
    format,
    resizedDataUrl,
    resizedFileSize,
    isProcessing,
    setFormat,
    resetAll: resetStore,
  } = useResizeStore();

  // Reset aspect ratio when image changes
  useEffect(() => {
    if (image) {
      resetAspect(image.width, image.height);
      setFormat(getDefaultFormat(image.file));
    }
  }, [image, resetAspect, setFormat]);

  const handleClear = useCallback(() => {
    resetUpload();
    resetStore();
  }, [resetUpload, resetStore]);

  const handleResize = useCallback(async () => {
    if (!image || typeof width !== "number" || typeof height !== "number") return;
    try {
      await resize(image, width, height);
    } catch {
      alert("リサイズ処理に失敗しました。");
    }
  }, [image, width, height, resize]);

  const handleDownload = useCallback(() => {
    if (!image || !resizedDataUrl || typeof width !== "number" || typeof height !== "number")
      return;
    download({
      dataUrl: resizedDataUrl,
      originalFileName: image.file.name,
      width,
      height,
      format,
    });
  }, [image, resizedDataUrl, width, height, format, download]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.ctrlKey && !e.metaKey && image && !isProcessing) {
        if ((e.target as HTMLElement)?.tagName === "INPUT") return;
        handleResize();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "s" && resizedDataUrl) {
        e.preventDefault();
        handleDownload();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [image, isProcessing, resizedDataUrl, handleResize, handleDownload]);

  return (
    <>
      <Header onClear={handleClear} showClear={!!image} />

      <main className="flex-1">
        <h1 className="sr-only">PixelForge — ブラウザ完結型 画像リサイズツール</h1>
        <AnimatePresence mode="wait">
          {!image ? (
            <div key="dropzone">
              <DropZone
                fileInputRef={fileInputRef}
                onFileChange={handleFileChange}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onOpenFileDialog={openFileDialog}
              />

              {landingContent}
            </div>
          ) : (
            <motion.div
              key="editor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto w-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-8rem)]">
                {/* Settings Panel */}
                <aside className="lg:col-span-4 xl:col-span-3 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800">
                  <SettingsPanel
                    width={width}
                    height={height}
                    isLocked={isLocked}
                    originalWidth={image.width}
                    originalHeight={image.height}
                    onWidthChange={setWidth}
                    onHeightChange={setHeight}
                    onToggleLock={toggleLock}
                    onApplyScale={applyScale}
                    onApplyPreset={applyPreset}
                    onResize={handleResize}
                  />
                </aside>

                {/* Preview Panel */}
                <section className="lg:col-span-8 xl:col-span-9">
                  <PreviewPanel
                    originalSrc={image.src}
                    resizedSrc={resizedDataUrl}
                    fileName={image.file.name}
                    originalWidth={image.width}
                    originalHeight={image.height}
                    originalFileSize={image.file.size}
                    targetWidth={width}
                    targetHeight={height}
                    resizedFileSize={resizedFileSize}
                    onDownload={handleDownload}
                  />
                </section>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
