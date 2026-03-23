import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
          {/* サイドバーナビ */}
          <aside className="hidden lg:block">
            <nav className="sticky top-20 space-y-1">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                ガイド一覧
              </p>
              <Link
                href="/guides/sns-image-sizes"
                className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
              >
                SNS別 画像サイズ
              </Link>
              <Link
                href="/guides/image-formats"
                className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
              >
                画像フォーマット比較
              </Link>
              <Link
                href="/guides/batch-resize"
                className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
              >
                一括リサイズ活用術
              </Link>
              <hr className="border-gray-200 dark:border-gray-800 my-3" />
              <Link
                href="/faq"
                className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
              >
                よくある質問
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
              >
                PixelForge について
              </Link>
            </nav>
          </aside>

          {/* メインコンテンツ */}
          <main>{children}</main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
