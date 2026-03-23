import { ImageIcon, Shield, Zap, Layers, FileImage, FileType, Globe } from "lucide-react";
import Link from "next/link";
import HomeClient from "@/components/home/HomeClient";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const landingContent = (
    <section className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          PixelForge とは
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          PixelForge は、ブラウザだけで画像リサイズが完結する無料ツールです。
          画像をサーバーにアップロードする必要がないため、プライバシーを守りながら
          PNG・JPEG・WebP 形式の画像を自由にリサイズできます。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col items-center text-center gap-2 p-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">プライバシー保護</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            画像はブラウザ内で処理され、外部サーバーに送信されません
          </p>
        </div>

        <div className="flex flex-col items-center text-center gap-2 p-4">
          <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950 flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">複数フォーマット対応</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            PNG、JPEG、WebP に対応。品質調整も自由自在
          </p>
        </div>

        <div className="flex flex-col items-center text-center gap-2 p-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center">
            <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">一括リサイズ</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            複数画像をまとめてリサイズし、ZIPでダウンロード
          </p>
        </div>

        <div className="flex flex-col items-center text-center gap-2 p-4">
          <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950 flex items-center justify-center">
            <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">SNSプリセット</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            X(Twitter)、Instagram など主要SNS向けサイズをワンクリックで
          </p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 text-center">
          使い方（3ステップ）
        </h3>
        <ol className="space-y-3 max-w-md mx-auto">
          <li className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
            <p className="text-sm text-gray-600 dark:text-gray-400">上のエリアに画像をドラッグ＆ドロップ、またはクリックして選択</p>
          </li>
          <li className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">2</span>
            <p className="text-sm text-gray-600 dark:text-gray-400">サイズやフォーマットを設定して「リサイズ実行」をクリック</p>
          </li>
          <li className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">3</span>
            <p className="text-sm text-gray-600 dark:text-gray-400">プレビューを確認し、ダウンロードボタンで保存</p>
          </li>
        </ol>
      </div>

      {/* 対応フォーマット詳細 */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 text-center">
          対応フォーマット
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <FileImage className="w-5 h-5 text-blue-500" />
              <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">PNG</h4>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              透過（アルファチャンネル）に対応した可逆圧縮形式。ロゴやスクリーンショットに最適です。
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <FileType className="w-5 h-5 text-green-500" />
              <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">JPEG</h4>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              写真に最適な非可逆圧縮形式。品質とファイルサイズのバランスを調整できます。
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-500" />
              <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">WebP</h4>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Googleが開発した次世代フォーマット。PNGやJPEGより小さいファイルサイズで高画質を実現します。
            </p>
          </div>
        </div>
      </div>

      {/* 簡易FAQ */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 text-center">
          よくある質問
        </h3>
        <div className="space-y-3">
          <details className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden group">
            <summary className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              画像はサーバーにアップロードされますか？
            </summary>
            <p className="px-4 pb-3 text-xs text-gray-500 dark:text-gray-400">
              いいえ、アップロードされません。PixelForge はすべての画像処理をブラウザ内の Canvas API で実行します。画像データが外部サーバーに送信されることは一切ありません。
            </p>
          </details>
          <details className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden group">
            <summary className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              リサイズすると画質は劣化しますか？
            </summary>
            <p className="px-4 pb-3 text-xs text-gray-500 dark:text-gray-400">
              PNG形式では可逆圧縮のため、画質の劣化はありません。JPEG・WebP形式では品質スライダーで圧縮率を調整できます。高品質（90%以上）に設定すれば、ほとんど劣化を感じずにファイルサイズを削減できます。
            </p>
          </details>
          <details className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden group">
            <summary className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              スマートフォンでも使えますか？
            </summary>
            <p className="px-4 pb-3 text-xs text-gray-500 dark:text-gray-400">
              はい、レスポンシブデザインに対応しているため、スマートフォンやタブレットのブラウザからもご利用いただけます。インストール不要で、Webブラウザさえあればどこでも使えます。
            </p>
          </details>
          <details className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden group">
            <summary className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              一度に複数の画像をリサイズできますか？
            </summary>
            <p className="px-4 pb-3 text-xs text-gray-500 dark:text-gray-400">
              はい、<Link href="/batch" className="text-blue-600 dark:text-blue-400 hover:underline">一括リサイズ機能</Link>を使えば、複数の画像をまとめてリサイズし、ZIPファイルとしてダウンロードできます。
            </p>
          </details>
        </div>
        <p className="text-center">
          <Link href="/faq" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            すべてのFAQを見る →
          </Link>
        </p>
      </div>

      {/* ガイドへのリンク */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 text-center">
          お役立ちガイド
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/guides/sns-image-sizes"
            className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
          >
            <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              SNS別 画像サイズガイド
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              X・Instagram・Facebook・LINE・YouTubeの推奨画像サイズ一覧
            </p>
          </Link>
          <Link
            href="/guides/image-formats"
            className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
          >
            <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              画像フォーマット比較
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              PNG・JPEG・WebPの特徴と使い分けを解説
            </p>
          </Link>
          <Link
            href="/guides/batch-resize"
            className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
          >
            <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              一括リサイズ活用術
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              複数画像を効率的にリサイズするコツを紹介
            </p>
          </Link>
        </div>
      </div>
    </section>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <HomeClient landingContent={landingContent} />
      <Footer />
    </div>
  );
}
