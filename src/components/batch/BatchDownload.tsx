"use client";

import { useCallback, useState } from "react";
import { Download, Loader2, Archive } from "lucide-react";
import JSZip from "jszip";
import { useBatchStore } from "@/stores/batchStore";
import { getExtensionFromFormat } from "@/lib/file-utils";

export default function BatchDownload() {
  const { items, commonFormat } = useBatchStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const doneItems = items.filter((i) => i.status === "done" && i.resizedDataUrl);

  const handleDownload = useCallback(async () => {
    if (doneItems.length === 0) return;

    setIsGenerating(true);

    try {
      const zip = new JSZip();
      const ext = getExtensionFromFormat(commonFormat);

      for (const item of doneItems) {
        if (!item.resizedDataUrl) continue;

        // Data URL → Blob
        const response = await fetch(item.resizedDataUrl);
        const blob = await response.blob();

        const baseName =
          item.file.name.substring(0, item.file.name.lastIndexOf(".")) || "image";
        const state = useBatchStore.getState();
        const targetW = state.resizeMode === "dimensions"
          ? state.commonWidth
          : Math.round(item.width * state.commonScale);
        const targetH = state.resizeMode === "dimensions"
          ? state.commonHeight
          : Math.round(item.height * state.commonScale);
        const fileName = `${baseName}_${targetW}x${targetH}.${ext}`;

        zip.file(fileName, blob);
      }

      const content = await zip.generateAsync({ type: "blob" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = `pixelforge_batch_${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("ZIP generation failed:", err);
      alert("ZIPファイルの生成に失敗しました。");
    } finally {
      setIsGenerating(false);
    }
  }, [doneItems, commonFormat]);

  if (doneItems.length === 0) return null;

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-xl font-medium transition-colors"
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          ZIP生成中...
        </>
      ) : (
        <>
          <Archive className="w-4 h-4" />
          ZIPでダウンロード ({doneItems.length}枚)
        </>
      )}
    </button>
  );
}
