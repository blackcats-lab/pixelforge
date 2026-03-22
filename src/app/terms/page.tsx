import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "利用規約",
  description: "PixelForge の利用規約。サービスの利用条件について。",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 space-y-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          利用規約
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          最終更新日: 2025年3月22日
        </p>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            1. サービスの概要
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            PixelForge（以下「本サービス」）は、ブラウザ上で画像のリサイズを行う無料の Web アプリケーションです。
            すべての画像処理はユーザーのブラウザ内で完結し、画像データがサーバーに送信されることはありません。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            2. 利用条件
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            本サービスは、個人・商用を問わず無料でご利用いただけます。
            本サービスを利用することにより、本利用規約に同意したものとみなされます。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            3. 免責事項
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            本サービスは「現状のまま」提供されます。
            サービスの利用により生じた損害について、運営者は一切の責任を負いません。
            画像の品質、変換結果の正確性について保証するものではありません。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            4. 知的財産権
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            ユーザーがアップロードした画像の著作権はユーザー自身に帰属します。
            本サービスのデザイン、ロゴ、ソースコードの著作権は運営者に帰属します。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            5. 広告表示
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            本サービスでは Google AdSense による広告を表示しています。
            広告表示によりサービスの無料提供を維持しています。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            6. 規約の変更
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            本規約は予告なく変更される場合があります。
            変更後の規約は本ページに掲載された時点で効力を持ちます。
          </p>
        </section>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <Link
            href="/"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            PixelForge に戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
