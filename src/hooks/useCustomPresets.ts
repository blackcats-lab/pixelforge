"use client";
import { useState, useCallback, useEffect } from "react";
import type { CustomPreset } from "@/types";

const STORAGE_KEY = "pixelforge-custom-presets";

function loadPresets(): CustomPreset[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function savePresets(presets: CustomPreset[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
}

export function useCustomPresets() {
  const [presets, setPresets] = useState<CustomPreset[]>([]);

  useEffect(() => {
    setPresets(loadPresets());
  }, []);

  const addPreset = useCallback((name: string, width: number, height: number) => {
    const newPreset: CustomPreset = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      name,
      width,
      height,
    };
    setPresets((prev) => {
      const updated = [...prev, newPreset];
      savePresets(updated);
      return updated;
    });
  }, []);

  const removePreset = useCallback((id: string) => {
    setPresets((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      savePresets(updated);
      return updated;
    });
  }, []);

  return { presets, addPreset, removePreset };
}
