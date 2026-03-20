"use client";

import DimensionInput from "./DimensionInput";
import ScalePresets from "./ScalePresets";
import SnsPresets from "./SnsPresets";
import FormatSelect from "./FormatSelect";
import QualitySlider from "./QualitySlider";
import ResizeModeToggle from "./ResizeModeToggle";
import ResizeButton from "./ResizeButton";
import { useResizeStore } from "@/stores/resizeStore";
import type { ImageFormat } from "@/types";

interface SettingsPanelProps {
  width: number | "";
  height: number | "";
  isLocked: boolean;
  originalWidth: number;
  originalHeight: number;
  onWidthChange: (val: number | "") => void;
  onHeightChange: (val: number | "") => void;
  onToggleLock: () => void;
  onApplyScale: (scale: number) => void;
  onApplyPreset: (w: number, h: number) => void;
  onResize: () => void;
}

export default function SettingsPanel({
  width,
  height,
  isLocked,
  originalWidth,
  originalHeight,
  onWidthChange,
  onHeightChange,
  onToggleLock,
  onApplyScale,
  onApplyPreset,
  onResize,
}: SettingsPanelProps) {
  const { format, quality, smoothing, isProcessing, setFormat, setQuality, setSmoothing } =
    useResizeStore();

  return (
    <div className="space-y-5 p-4 lg:p-5 overflow-y-auto max-h-[calc(100vh-8rem)]">
      <DimensionInput
        width={width}
        height={height}
        isLocked={isLocked}
        onWidthChange={onWidthChange}
        onHeightChange={onHeightChange}
        onToggleLock={onToggleLock}
        originalWidth={originalWidth}
        originalHeight={originalHeight}
      />

      <ScalePresets onApply={onApplyScale} />

      <SnsPresets onApply={onApplyPreset} />

      <FormatSelect
        format={format}
        onFormatChange={(f: ImageFormat) => setFormat(f)}
      />

      <QualitySlider
        quality={quality}
        onQualityChange={setQuality}
        disabled={format === "image/png"}
      />

      <ResizeModeToggle
        smoothing={smoothing}
        onSmoothingChange={setSmoothing}
      />

      <ResizeButton
        onClick={onResize}
        isProcessing={isProcessing}
        disabled={typeof width !== "number" || typeof height !== "number"}
      />
    </div>
  );
}
