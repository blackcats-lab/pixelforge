"use client";
import { useState, useCallback } from "react";

export function useAspectRatio(initialWidth: number, initialHeight: number) {
  const [isLocked, setIsLocked] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(
    initialWidth / initialHeight
  );
  const [width, setWidthState] = useState<number | "">(initialWidth);
  const [height, setHeightState] = useState<number | "">(initialHeight);

  const setWidth = useCallback(
    (val: number | "") => {
      setWidthState(val);
      if (typeof val === "number" && isLocked) {
        setHeightState(Math.round(val / aspectRatio));
      }
    },
    [isLocked, aspectRatio]
  );

  const setHeight = useCallback(
    (val: number | "") => {
      setHeightState(val);
      if (typeof val === "number" && isLocked) {
        setWidthState(Math.round(val * aspectRatio));
      }
    },
    [isLocked, aspectRatio]
  );

  const toggleLock = useCallback(() => {
    setIsLocked((prev) => {
      if (!prev) {
        const w = typeof width === "number" ? width : 0;
        const h = typeof height === "number" ? height : 0;
        if (h !== 0) setAspectRatio(w / h);
      }
      return !prev;
    });
  }, [width, height]);

  const applyScale = useCallback(
    (scale: number) => {
      const newW = Math.round(initialWidth * scale);
      const newH = Math.round(initialHeight * scale);
      setWidthState(newW);
      setHeightState(newH);
      setAspectRatio(initialWidth / initialHeight);
    },
    [initialWidth, initialHeight]
  );

  const applyPreset = useCallback(
    (presetW: number, presetH: number) => {
      setWidthState(presetW);
      setHeightState(presetH);
      if (isLocked) {
        setAspectRatio(presetW / presetH);
      }
    },
    [isLocked]
  );

  const reset = useCallback((newWidth: number, newHeight: number) => {
    setWidthState(newWidth);
    setHeightState(newHeight);
    setAspectRatio(newWidth / newHeight);
    setIsLocked(true);
  }, []);

  return {
    width,
    height,
    isLocked,
    setWidth,
    setHeight,
    toggleLock,
    applyScale,
    applyPreset,
    reset,
  };
}
