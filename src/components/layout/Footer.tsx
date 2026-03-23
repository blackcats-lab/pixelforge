"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex items-center gap-1.5 justify-center text-xs text-gray-500 dark:text-gray-400">
          <Shield className="w-3.5 h-3.5" />
          <span>すべての処理はブラウザ内で完結します。画像がサーバーにアップロードされることはありません。</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
          <Link href="/about" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            PixelForge について
          </Link>
          <Link href="/faq" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            よくある質問
          </Link>
          <Link href="/guides/sns-image-sizes" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            SNS画像サイズ
          </Link>
          <Link href="/guides/image-formats" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            フォーマット比較
          </Link>
          <Link href="/guides/batch-resize" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            一括リサイズ活用術
          </Link>
          <Link href="/privacy" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            プライバシーポリシー
          </Link>
          <Link href="/terms" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            利用規約
          </Link>
        </div>
        <p className="text-center text-xs text-gray-400 dark:text-gray-500">
          PixelForge
        </p>
      </div>
    </footer>
  );
}
