"use client";

import { useCallback } from "react";
import Header from "@/components/layout/Header";
import BatchUploader from "@/components/batch/BatchUploader";
import BatchList from "@/components/batch/BatchList";
import BatchDownload from "@/components/batch/BatchDownload";
import { useBatchStore } from "@/stores/batchStore";
import { useBatchResize } from "@/hooks/useBatchResize";

export default function BatchTool() {
  const { items, clearAll } = useBatchStore();
  const { resizeAll } = useBatchResize();

  const handleResizeAll = useCallback(() => {
    resizeAll();
  }, [resizeAll]);

  const handleClear = useCallback(() => {
    clearAll();
  }, [clearAll]);

  return (
    <>
      <Header onClear={handleClear} showClear={items.length > 0} />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              一括リサイズ
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              複数の画像をまとめてリサイズし、ZIPでダウンロードできます
            </p>
          </div>

          <BatchUploader />

          {items.length > 0 && (
            <>
              <BatchList onResizeAll={handleResizeAll} />
              <BatchDownload />
            </>
          )}
        </div>
      </main>
    </>
  );
}
