"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { checkCanvasLimits } from "@/lib/canvas-limits";

interface CanvasWarningProps {
  targetWidth: number | "";
  targetHeight: number | "";
}

export default function CanvasWarning({ targetWidth, targetHeight }: CanvasWarningProps) {
  const [warning, setWarning] = useState<string | null>(null);

  useEffect(() => {
    if (typeof targetWidth !== "number" || typeof targetHeight !== "number") {
      setWarning(null);
      return;
    }
    const result = checkCanvasLimits(targetWidth, targetHeight);
    setWarning(result.valid ? null : result.message ?? null);
  }, [targetWidth, targetHeight]);

  if (!warning) return null;

  return (
    <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs">
      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <span>{warning}</span>
    </div>
  );
}
