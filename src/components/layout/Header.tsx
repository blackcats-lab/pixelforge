"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, ImageDown, Layers, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeaderProps {
  onClear?: () => void;
  showClear?: boolean;
}

export default function Header({ onClear, showClear }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <ImageDown className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            PixelForge
          </span>
          <span className="text-xs font-normal text-gray-400 dark:text-gray-500 hidden sm:inline">
            画像リサイズ
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/batch"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">一括処理</span>
          </Link>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="テーマを切り替える"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          )}

          {showClear && (
            <button
              onClick={onClear}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-red-600 dark:text-red-400"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">クリア</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
