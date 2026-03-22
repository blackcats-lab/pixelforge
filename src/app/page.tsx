"use client";

import { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageIcon, Shield, Zap, Layers } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DropZone from "@/components/upload/DropZone";
import SettingsPanel from "@/components/resize/SettingsPanel";
import PreviewPanel from "@/components/preview/PreviewPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useAspectRatio } from "@/hooks/useAspectRatio";
import { useCanvasResize } from "@/hooks/useCanvasResize";
import { useDownload } from "@/hooks/useDownload";
import { useResizeStore } from "@/stores/resizeStore";
import { getDefaultFormat } from "@/lib/file-utils";

export default function HomePage() {
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
    <div className="flex flex-col min-h-screen">
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

              {/* Landing content section for SEO & AdSense compliance */}
              <section className="max-w-4xl mx-auto px-4 py-12 space-y-10">
                <div className="text-center space-y-3">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    PixelForge とは
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    PixelForge は、ブラウザだけで画像リサイズが完結する無料ツールです。
                    画像をサーバーにアップロードする必要がないため、プライバシーを守りながら
                    PNG・JPEG・WebP 形式の画像を自由にリサイズできます。
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center text-center gap-2 p-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">プライバシー保護</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      画像はブラウザ内で処理され、外部サーバーに送信されません
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center gap-2 p-4">
                    <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950 flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">複数フォーマット対応</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG、JPEG、WebP に対応。品質調整も自由自在
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center gap-2 p-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">一括リサイズ</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      複数画像をまとめてリサイズし、ZIPでダウンロード
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center gap-2 p-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">SNSプリセット</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      X(Twitter)、Instagram など主要SNS向けサイズをワンクリックで
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 space-y-4">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 text-center">
                    使い方（3ステップ）
                  </h3>
                  <ol className="space-y-3 max-w-md mx-auto">
                    <li className="flex gap-3 items-start">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">上のエリアに画像をドラッグ＆ドロップ、またはクリックして選択</p>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">サイズやフォーマットを設定して「リサイズ実行」をクリック</p>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">3</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">プレビューを確認し、ダウンロードボタンで保存</p>
                    </li>
                  </ol>
                </div>
              </section>
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

      <Footer />
    </div>
  );
}
