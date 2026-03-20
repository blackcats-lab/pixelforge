"use client";

import BatchItem from "./BatchItem";
import FormatSelect from "@/components/resize/FormatSelect";
import QualitySlider from "@/components/resize/QualitySlider";
import ResizeModeToggle from "@/components/resize/ResizeModeToggle";
import SnsPresets from "@/components/resize/SnsPresets";
import { useBatchStore } from "@/stores/batchStore";
import { SCALE_PRESETS } from "@/lib/presets";
import { Loader2, Scaling, Percent, Ruler } from "lucide-react";
import type { ImageFormat } from "@/types";

interface BatchListProps {
  onResizeAll: () => void;
}

export default function BatchList({ onResizeAll }: BatchListProps) {
  const {
    items,
    resizeMode,
    commonFormat,
    commonQuality,
    commonSmoothing,
    commonScale,
    commonWidth,
    commonHeight,
    isProcessing,
    removeItem,
    setResizeMode,
    setCommonFormat,
    setCommonQuality,
    setCommonSmoothing,
    setCommonScale,
    setCommonWidth,
    setCommonHeight,
  } = useBatchStore();

  const doneCount = items.filter((i) => i.status === "done").length;

  const handleWidthChange = (value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) setCommonWidth(num);
  };

  const handleHeightChange = (value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) setCommonHeight(num);
  };

  return (
    <div className="space-y-6">
      {/* Common settings */}
      <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 space-y-4">
        {/* Resize mode tabs */}
        <div className="flex gap-1.5">
          <button
            onClick={() => setResizeMode("scale")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
              resizeMode === "scale"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Percent className="w-3.5 h-3.5" />
            倍率で指定
          </button>
          <button
            onClick={() => setResizeMode("dimensions")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
              resizeMode === "dimensions"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            解像度で指定
          </button>
        </div>

        {/* Mode-specific settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {resizeMode === "scale" ? (
            /* Scale presets */
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider">
                倍率
              </label>
              <div className="flex flex-wrap gap-1.5">
                {SCALE_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setCommonScale(preset.scale)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors ${
                      commonScale === preset.scale
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Dimension inputs */
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider">
                解像度 (px)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={commonWidth}
                  onChange={(e) => handleWidthChange(e.target.value)}
                  min={1}
                  placeholder="幅"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-400 text-sm">×</span>
                <input
                  type="number"
                  value={commonHeight}
                  onChange={(e) => handleHeightChange(e.target.value)}
                  min={1}
                  placeholder="高さ"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Format */}
          <FormatSelect
            format={commonFormat}
            onFormatChange={(f: ImageFormat) => setCommonFormat(f)}
          />

          {/* Quality */}
          <QualitySlider
            quality={commonQuality}
            onQualityChange={setCommonQuality}
            disabled={commonFormat === "image/png"}
          />

          {/* Mode */}
          <ResizeModeToggle
            smoothing={commonSmoothing}
            onSmoothingChange={setCommonSmoothing}
          />
        </div>

        {/* SNS Presets for dimensions mode */}
        {resizeMode === "dimensions" && (
          <SnsPresets
            onApply={(w, h) => {
              setCommonWidth(w);
              setCommonHeight(h);
            }}
          />
        )}
      </div>

      {/* Item list */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {items.length}枚の画像 {doneCount > 0 && `(${doneCount}枚完了)`}
          </p>
        </div>

        <div className="space-y-2 max-h-[40vh] overflow-y-auto">
          {items.map((item) => (
            <BatchItem
              key={item.id}
              item={item}
              resizeMode={resizeMode}
              scale={commonScale}
              targetWidth={commonWidth}
              targetHeight={commonHeight}
              onRemove={removeItem}
            />
          ))}
        </div>
      </div>

      {/* Resize button */}
      <button
        onClick={onResizeAll}
        disabled={isProcessing || items.length === 0}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-800 text-white rounded-xl font-medium transition-colors"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            処理中... ({doneCount}/{items.length})
          </>
        ) : (
          <>
            <Scaling className="w-4 h-4" />
            すべてリサイズ ({items.length}枚)
          </>
        )}
      </button>
    </div>
  );
}
