import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Zap, ImageDown, Globe, Lock, Layers } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "PixelForge について",
  description:
    "PixelForge はブラウザ内で完結する無料の画像リサイズツールです。プライバシー保護の仕組み、使用技術、開発の背景をご紹介します。",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-12 space-y-12">
          {/* ヒーロー */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <ImageDown className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              PixelForge について
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
              PixelForge は、「画像をリサイズするだけなのに、なぜサーバーにアップロードしなければならないのか？」という疑問から生まれた、ブラウザ完結型の画像リサイズツールです。
            </p>
          </div>

          {/* ミッション */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              私たちの考え
            </h2>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                多くのオンライン画像リサイズツールは、画像をサーバーにアップロードして処理を行います。しかし、単純なリサイズ処理のために大切な画像を外部サーバーに送信する必要は本来ありません。
              </p>
              <p>
                PixelForge は、すべての画像処理をブラウザ内で完結させることで、この問題を解決しました。お使いの端末から画像データが外に出ることは一切なく、プライバシーを完全に保護しながら高品質なリサイズを実現します。
              </p>
              <p>
                個人的な写真、業務上の機密画像、医療データなど、どのような画像でも安心してお使いいただけます。
              </p>
            </div>
          </section>

          {/* 技術的な仕組み */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              技術的な仕組み
            </h2>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                PixelForge は、ブラウザに標準搭載されている <strong>Canvas API</strong> を使用して画像のリサイズ処理を行います。Canvas API はモダンブラウザのすべてに対応しており、高速かつ高品質な画像処理が可能です。
              </p>
              <p>
                一括リサイズ機能では、ブラウザ内で <strong>ZIP ファイル</strong> を生成し、複数の画像をまとめてダウンロードできるようにしています。サーバーサイドの処理は一切ありません。
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <Lock className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    ローカル処理
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    画像データはブラウザのメモリ内でのみ処理されます。ネットワーク通信は発生しません。
                  </p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <Zap className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    高速処理
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    サーバーとの通信が不要なため、アップロード・ダウンロードの待ち時間がありません。
                  </p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <Globe className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    クロスプラットフォーム
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Windows、Mac、Linux、スマートフォンなど、ブラウザがあればどこでも動作します。
                  </p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <Layers className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    多機能
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    単一・一括リサイズ、フォーマット変換、品質調整、SNSプリセット、ドット絵モード対応。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 主な機能 */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              主な機能
            </h2>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>画像リサイズ</strong> — 幅×高さの直接指定、倍率指定、SNSプリセットからサイズを選択</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>アスペクト比ロック</strong> — 縦横比を維持したままリサイズ可能</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>フォーマット変換</strong> — PNG、JPEG、WebP 間の相互変換に対応</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>品質調整</strong> — JPEG・WebP の圧縮品質をスライダーで細かく調整</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>一括リサイズ</strong> — 複数画像をまとめてリサイズし、ZIPでダウンロード</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>ドット絵モード</strong> — ピクセルアートをぼやけずにシャープに拡大</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>ビフォー/アフター比較</strong> — リサイズ前後の画像をスライダーで比較</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>ダークモード</strong> — 目に優しいダークテーマに対応</span>
              </li>
            </ul>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-8 text-center space-y-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              さっそく使ってみましょう
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              アカウント登録不要。ブラウザを開くだけですぐに使えます。
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <ImageDown className="w-4 h-4" />
                画像をリサイズする
              </Link>
              <Link
                href="/batch"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium rounded-lg transition-colors"
              >
                <Layers className="w-4 h-4" />
                一括リサイズ
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
