"use client";

import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  ImageDown,
  Layers,
  RotateCcw,
  HelpCircle,
  X,
  Upload,
  Scaling,
  Download,
  Lock,
  Keyboard,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";

interface HeaderProps {
  onClear?: () => void;
  showClear?: boolean;
}

export default function Header({ onClear, showClear }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);
  const isBatchPage = pathname === "/batch";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!showHelp) return;
    const handleClick = (e: MouseEvent) => {
      if (helpRef.current && !helpRef.current.contains(e.target as Node)) {
        setShowHelp(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showHelp]);

  // Close on Escape
  useEffect(() => {
    if (!showHelp) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowHelp(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showHelp]);

  const toggleHelp = useCallback(() => setShowHelp((prev) => !prev), []);

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
            href={isBatchPage ? "/" : "/batch"}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isBatchPage ? (
              <>
                <ImageDown className="w-4 h-4" />
                <span className="hidden sm:inline">単一処理</span>
              </>
            ) : (
              <>
                <Layers className="w-4 h-4" />
                <span className="hidden sm:inline">一括処理</span>
              </>
            )}
          </Link>

          <Link
            href="/guides/sns-image-sizes"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span>ガイド</span>
          </Link>

          {/* Help button */}
          <div className="relative" ref={helpRef}>
            <button
              onClick={toggleHelp}
              className={`p-2 rounded-lg transition-colors ${
                showHelp
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              aria-label="使い方を表示"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Help panel */}
            {showHelp && (
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-semibold text-sm">使い方</h3>
                  <button
                    onClick={() => setShowHelp(false)}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto text-sm">
                  {/* Steps */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      基本的な流れ
                    </h4>
                    <Step
                      icon={<Upload className="w-4 h-4" />}
                      title="1. 画像をアップロード"
                      desc="ドラッグ＆ドロップ、またはクリックしてファイルを選択します。JPEG, PNG, WebP, BMP, GIF, SVG に対応。"
                    />
                    <Step
                      icon={<Scaling className="w-4 h-4" />}
                      title="2. サイズを設定"
                      desc="幅×高さを直接入力、倍率プリセット、またはSNSプリセットから選択できます。"
                    />
                    <Step
                      icon={<Lock className="w-4 h-4" />}
                      title="3. リサイズを実行"
                      desc="「リサイズ実行」ボタンを押すと、ブラウザ内で画像が処理されます。"
                    />
                    <Step
                      icon={<Download className="w-4 h-4" />}
                      title="4. ダウンロード"
                      desc="PNG / JPEG / WebP の出力形式と品質を選んでダウンロードできます。"
                    />
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      便利な機能
                    </h4>
                    <ul className="space-y-1.5 text-gray-600 dark:text-gray-400 text-xs">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span><b>アスペクト比ロック</b> — 鍵アイコンで縦横比を固定/解除</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span><b>ドット絵モード</b> — ピクセルアートの拡大に最適</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span><b>ビフォー/アフター比較</b> — リサイズ後にスライダーで比較</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span><b>一括処理</b> — 複数画像をまとめてリサイズ、ZIPでダウンロード</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span><b>カスタムプリセット</b> — よく使うサイズを保存可能</span>
                      </li>
                    </ul>
                  </div>

                  {/* Shortcuts */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Keyboard className="w-3.5 h-3.5" />
                      ショートカットキー
                    </h4>
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      <Shortcut keys="Enter" label="リサイズ実行" />
                      <Shortcut keys="Ctrl + S" label="ダウンロード" />
                    </div>
                  </div>

                  {/* Privacy */}
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-xs text-green-800 dark:text-green-300">
                    <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      すべての画像処理はブラウザ内で完結します。画像データがサーバーに送信されることは一切ありません。
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

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

function Step({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="font-medium text-gray-800 dark:text-gray-200 text-xs">
          {title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {desc}
        </p>
      </div>
    </div>
  );
}

function Shortcut({ keys, label }: { keys: string; label: string }) {
  return (
    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-mono text-[10px]">
        {keys}
      </kbd>
    </div>
  );
}
