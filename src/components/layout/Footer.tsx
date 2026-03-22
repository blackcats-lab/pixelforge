"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          <span>すべての処理はブラウザ内で完結します。画像がサーバーにアップロードされることはありません。</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            プライバシーポリシー
          </Link>
          <Link href="/terms" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            利用規約
          </Link>
          <span>PixelForge</span>
        </div>
      </div>
    </footer>
  );
}
