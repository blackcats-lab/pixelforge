"use client";

import { useState } from "react";
import { Plus, X, Bookmark } from "lucide-react";
import type { CustomPreset } from "@/types";

interface CustomPresetsProps {
  presets: CustomPreset[];
  onApply: (width: number, height: number) => void;
  onAdd: (name: string, width: number, height: number) => void;
  onRemove: (id: string) => void;
  currentWidth: number | "";
  currentHeight: number | "";
}

export default function CustomPresets({
  presets,
  onApply,
  onAdd,
  onRemove,
  currentWidth,
  currentHeight,
}: CustomPresetsProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim() || typeof currentWidth !== "number" || typeof currentHeight !== "number")
      return;
    onAdd(name.trim(), currentWidth, currentHeight);
    setName("");
    setIsAdding(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider">
          カスタムプリセット
        </label>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-blue-500 transition-colors"
          aria-label="プリセットを追加"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Add form */}
      {isAdding && (
        <div className="flex gap-1.5">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="プリセット名"
            className="flex-1 px-2 py-1.5 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button
            onClick={handleAdd}
            disabled={!name.trim() || typeof currentWidth !== "number" || typeof currentHeight !== "number"}
            className="px-2.5 py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg transition-colors"
          >
            保存
          </button>
        </div>
      )}

      {/* Preset list */}
      {presets.length > 0 ? (
        <div className="space-y-1">
          {presets.map((preset) => (
            <div
              key={preset.id}
              className="flex items-center gap-1.5 group"
            >
              <button
                onClick={() => onApply(preset.width, preset.height)}
                className="flex-1 flex items-center justify-between px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
              >
                <span className="flex items-center gap-1.5 font-medium">
                  <Bookmark className="w-3 h-3 text-blue-500" />
                  {preset.name}
                </span>
                <span className="text-gray-400 dark:text-gray-500">
                  {preset.width}×{preset.height}
                </span>
              </button>
              <button
                onClick={() => onRemove(preset.id)}
                className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-red-500 transition-all"
                aria-label="削除"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        !isAdding && (
          <p className="text-xs text-gray-400 dark:text-gray-500">
            現在のサイズを保存して、すぐに呼び出せます
          </p>
        )
      )}
    </div>
  );
}
