import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SNS別 推奨画像サイズ一覧【2026年最新】",
  description:
    "X（Twitter）、Instagram、Facebook、LINE、YouTubeなど主要SNSの推奨画像サイズをまとめました。プロフィール画像、投稿画像、カバー画像のサイズ一覧。",
  alternates: {
    canonical: "/guides/sns-image-sizes",
  },
};

export default function SnsImageSizesPage() {
  return (
    <article className="space-y-10">
      <div className="space-y-3">
        <nav className="text-xs text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">ホーム</Link>
          <span className="mx-1.5">/</span>
          <span>ガイド</span>
          <span className="mx-1.5">/</span>
          <span className="text-gray-800 dark:text-gray-200">SNS別 画像サイズ</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          SNS別 推奨画像サイズ一覧【2026年最新】
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          各SNSプラットフォームには、それぞれ推奨される画像サイズがあります。適切なサイズで画像を投稿することで、画質の劣化を防ぎ、見栄えの良い投稿を作成できます。PixelForge のSNSプリセット機能を使えば、ワンクリックで最適なサイズにリサイズできます。
        </p>
      </div>

      {/* X (Twitter) */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          X（旧Twitter）
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          X では画像が自動的にクロップされることがあるため、推奨サイズに合わせて投稿することが重要です。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-2 pr-4 font-semibold text-gray-800 dark:text-gray-200">用途</th>
                <th className="text-left py-2 pr-4 font-semibold text-gray-800 dark:text-gray-200">推奨サイズ（px）</th>
                <th className="text-left py-2 font-semibold text-gray-800 dark:text-gray-200">アスペクト比</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4">プロフィール画像</td>
                <td className="py-2 pr-4">400 × 400</td>
                <td className="py-2">1:1</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4">ヘッダー画像</td>
                <td className="py-2 pr-4">1500 × 500</td>
                <td className="py-2">3:1</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4">投稿画像（1枚）</td>
                <td className="py-2 pr-4">1200 × 675</td>
                <td className="py-2">16:9</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4">投稿画像（2枚）</td>
                <td className="py-2 pr-4">700 × 800</td>
                <td className="py-2">7:8</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">OGP / カード画像</td>
                <td className="py-2 pr-4">1200 × 630</td>
                <td className="py-2">約1.91:1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Instagram */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          Instagram
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Instagram ではフィード投稿、ストーリーズ、リールそれぞれで最適なサイズが異なります。高解像度の画像を使用すると、より鮮明な表示が可能です。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-2 pr-4 font-semibold text-gray-800 dark:text-gray-200">用途</th>
                <th className="text-left py-2 pr-4 font-semibold text-gray-800 dark:text-gray-200">推奨サイズ（px）</th>
                <th className="text-left py-2 font-semibold text-gray-800 dark:text-gray-200">アスペクト比</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4">プロフィール画像</td>
                <td className="py-2 pr-4">320 × 320</td>
                <td className="py-2">1:1</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4">フィード投稿（正方形）</td>
                <td className="py-2 pr-4">1080 × 1080</td>
                <td className="py-2">1:1</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4">フィード投稿（縦長）</td>
                <td className="py-2 pr-4">1080 × 1350</td>
                <td className="py-2">4:5</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4">フィード投稿（横長）</td>
                <td className="py-2 pr-4">1080 × 566</td>
                <td className="py-2">1.91:1</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">ストーリーズ / リール</td>
                <td className="py-2 pr-4">1080 × 1920</td>
                <td className="py-2">9:16</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Facebook */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          Facebook
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Facebook では投稿の種類によって推奨サイズが異なります。カバー写真はデバイスによって表示範囲が変わるため、重要な要素は中央に配置しましょう。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-2 pr-4 font-semibold text-gray-800 dark:text-gray-200">用途</th>
                <th className="text-left py-2 pr-4 font-semibold text-gray-800 dark:text-gray-200">推奨サイズ（px）</th>
                <th className="text-left py-2 font-semibold text-gray-800 dark:text-gray-200">アスペクト比</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4">プロフィール画像</td>
                <td className="py-2 pr-4">170 × 170</td>
                <td className="py-2">1:1</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4">カバー写真</td>
                <td className="py-2 pr-4">851 × 315</td>
                <td className="py-2">2.7:1</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4">投稿画像</td>
                <td className="py-2 pr-4">1200 × 630</td>
                <td className="py-2">1.91:1</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">イベントカバー</td>
                <td className="py-2 pr-4">1920 × 1005</td>
                <td className="py-2">1.91:1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* LINE */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          LINE
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          LINE のプロフィール画像やタイムライン投稿に適した画像サイズです。LINE 公式アカウントのリッチメッセージにも対応しています。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-2 pr-4 font-semibold text-gray-800 dark:text-gray-200">用途</th>
                <th className="text-left py-2 pr-4 font-semibold text-gray-800 dark:text-gray-200">推奨サイズ（px）</th>
                <th className="text-left py-2 font-semibold text-gray-800 dark:text-gray-200">アスペクト比</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4">プロフィール画像</td>
                <td className="py-2 pr-4">480 × 480</td>
                <td className="py-2">1:1</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4">ホーム画像</td>
                <td className="py-2 pr-4">720 × 1280</td>
                <td className="py-2">9:16</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">リッチメッセージ</td>
                <td className="py-2 pr-4">1040 × 1040</td>
                <td className="py-2">1:1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* YouTube */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          YouTube
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          YouTube のサムネイルはクリック率に大きく影響します。高解像度で見やすいサムネイルを作成しましょう。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-2 pr-4 font-semibold text-gray-800 dark:text-gray-200">用途</th>
                <th className="text-left py-2 pr-4 font-semibold text-gray-800 dark:text-gray-200">推奨サイズ（px）</th>
                <th className="text-left py-2 font-semibold text-gray-800 dark:text-gray-200">アスペクト比</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4">チャンネルアイコン</td>
                <td className="py-2 pr-4">800 × 800</td>
                <td className="py-2">1:1</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4">チャンネルバナー</td>
                <td className="py-2 pr-4">2560 × 1440</td>
                <td className="py-2">16:9</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">動画サムネイル</td>
                <td className="py-2 pr-4">1280 × 720</td>
                <td className="py-2">16:9</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Tips */}
      <section className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-6 space-y-3">
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
          画像サイズに関するポイント
        </h2>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>各SNSの推奨サイズは変更される場合があります。最新の情報は各プラットフォームの公式ドキュメントをご確認ください。</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>推奨サイズより大きい画像をアップロードすると自動的にリサイズされますが、事前に適切なサイズにしておくことで、より高品質な表示が可能です。</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>プロフィール画像は丸くクロップされるプラットフォームが多いため、重要な要素は中央に配置しましょう。</span>
          </li>
        </ul>
      </section>

      {/* CTA */}
      <div className="text-center space-y-3">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          PixelForge のSNSプリセット機能を使えば、上記のサイズにワンクリックでリサイズできます。
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          今すぐリサイズする →
        </Link>
      </div>
    </article>
  );
}
