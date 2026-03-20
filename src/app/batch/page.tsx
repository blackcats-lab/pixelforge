"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Construction } from "lucide-react";
import Link from "next/link";

export default function BatchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
          <Construction className="w-16 h-16 text-gray-400 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            一括処理
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            複数画像の一括リサイズ機能は Phase 2 で実装予定です。
            現在は1枚ずつリサイズできます。
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            単体リサイズへ
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
