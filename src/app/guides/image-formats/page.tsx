import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PNG・JPEG・WebP 画像フォーマット比較ガイド",
  description:
    "PNG、JPEG、WebPの特徴と違いを詳しく解説。用途別の使い分け、ファイルサイズ、画質、透過対応を比較します。",
  alternates: {
    canonical: "/guides/image-formats",
  },
};

export default function ImageFormatsPage() {
  return (
    <article className="space-y-10">
      <div className="space-y-3">
        <nav className="text-xs text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">ホーム</Link>
          <span className="mx-1.5">/</span>
          <span>ガイド</span>
          <span className="mx-1.5">/</span>
          <span className="text-gray-800 dark:text-gray-200">画像フォーマット比較</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          PNG・JPEG・WebP 画像フォーマット比較ガイド
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          画像を保存する際に選べるフォーマットには、それぞれ特徴があります。この記事では、PixelForge が対応する3つの主要フォーマット（PNG、JPEG、WebP）の違いを詳しく解説し、用途別の使い分けをご紹介します。
        </p>
      </div>

      {/* 比較表 */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          フォーマット比較一覧
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-2 pr-4 font-semibold text-gray-800 dark:text-gray-200">特徴</th>
                <th className="text-left py-2 pr-4 font-semibold text-gray-800 dark:text-gray-200">PNG</th>
                <th className="text-left py-2 pr-4 font-semibold text-gray-800 dark:text-gray-200">JPEG</th>
                <th className="text-left py-2 font-semibold text-gray-800 dark:text-gray-200">WebP</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4 font-medium">圧縮方式</td>
                <td className="py-2 pr-4">可逆圧縮</td>
                <td className="py-2 pr-4">非可逆圧縮</td>
                <td className="py-2">可逆 / 非可逆</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4 font-medium">透過（アルファ）</td>
                <td className="py-2 pr-4">対応</td>
                <td className="py-2 pr-4">非対応</td>
                <td className="py-2">対応</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4 font-medium">ファイルサイズ</td>
                <td className="py-2 pr-4">大きい</td>
                <td className="py-2 pr-4">小さい</td>
                <td className="py-2">最も小さい</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4 font-medium">画質</td>
                <td className="py-2 pr-4">劣化なし</td>
                <td className="py-2 pr-4">圧縮率で変動</td>
                <td className="py-2">高品質</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4 font-medium">アニメーション</td>
                <td className="py-2 pr-4">APNG で対応</td>
                <td className="py-2 pr-4">非対応</td>
                <td className="py-2">対応</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">ブラウザ対応</td>
                <td className="py-2 pr-4">全ブラウザ</td>
                <td className="py-2 pr-4">全ブラウザ</td>
                <td className="py-2">主要ブラウザ対応</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* PNG 詳細 */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          PNG（Portable Network Graphics）
        </h2>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>
            PNG は<strong>可逆圧縮</strong>を採用した画像フォーマットです。「可逆」とは、圧縮・展開を繰り返しても画質が一切劣化しないことを意味します。また、<strong>透過（アルファチャンネル）</strong>に対応しているため、背景を透明にした画像を扱えます。
          </p>
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 pt-2">PNG が適している場面</h3>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span><strong>ロゴやアイコン</strong> — 透過が必要な画像に最適。シャープなエッジも維持できます。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span><strong>スクリーンショット</strong> — テキストやUI要素がくっきりと保存されます。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span><strong>イラストやグラフ</strong> — 色数が限定された画像では効率的に圧縮されます。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span><strong>画質を最優先したい場合</strong> — 加工を繰り返しても劣化しません。</span>
            </li>
          </ul>
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 pt-2">PNG の注意点</h3>
          <p>
            写真のような色数が多い画像では、ファイルサイズが非常に大きくなります。Webサイトに写真を掲載する場合は、JPEG や WebP の方が適しています。
          </p>
        </div>
      </section>

      {/* JPEG 詳細 */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          JPEG（Joint Photographic Experts Group）
        </h2>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>
            JPEG は<strong>非可逆圧縮</strong>を使用するフォーマットで、写真の保存に最も広く使われています。圧縮率を高くするとファイルサイズを大幅に削減できますが、その分画質は低下します。品質設定で圧縮率を調整できるため、用途に応じて最適なバランスを選べます。
          </p>
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 pt-2">JPEG が適している場面</h3>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              <span><strong>写真</strong> — 色数が多く、グラデーションが豊かな画像に最適です。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              <span><strong>Webサイトの画像</strong> — ファイルサイズが小さいため、ページの読み込み速度を向上させます。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              <span><strong>メール添付</strong> — ファイルサイズを抑えながら十分な画質を保てます。</span>
            </li>
          </ul>
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 pt-2">JPEG の注意点</h3>
          <p>
            透過（アルファチャンネル）には対応していません。背景を透明にしたい場合は PNG か WebP を使用してください。また、保存のたびに画質が劣化するため、編集用のマスターデータとしては PNG を使用し、最終出力で JPEG に変換する運用がおすすめです。
          </p>
        </div>
      </section>

      {/* WebP 詳細 */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          WebP
        </h2>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>
            WebP は <strong>Google が開発</strong>した比較的新しい画像フォーマットです。可逆圧縮と非可逆圧縮の両方に対応し、透過やアニメーションもサポートしています。同等の画質で比較した場合、JPEG より約25-35%、PNG より約26%小さいファイルサイズを実現します。
          </p>
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 pt-2">WebP が適している場面</h3>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span><strong>Webサイトの最適化</strong> — 最小のファイルサイズでページ速度を最大化できます。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span><strong>透過画像のWeb掲載</strong> — PNG の代替として、より小さいファイルサイズで透過画像を使用できます。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span><strong>SNS投稿</strong> — 高画質を維持しながらアップロード時間を短縮できます。</span>
            </li>
          </ul>
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 pt-2">WebP の注意点</h3>
          <p>
            Chrome、Firefox、Edge、Safari など主要ブラウザではすべて対応していますが、一部の古いブラウザや画像編集ソフトでは対応していない場合があります。互換性を重視する場合は、JPEG や PNG との併用を検討してください。
          </p>
        </div>
      </section>

      {/* 使い分けまとめ */}
      <section className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
          用途別おすすめフォーマット
        </h2>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded">PNG</span>
            <span>ロゴ、アイコン、スクリーンショット、イラスト、透過画像</span>
          </div>
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-semibold rounded">JPEG</span>
            <span>写真、自然画像、メール添付、互換性を重視する場合</span>
          </div>
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-semibold rounded">WebP</span>
            <span>Webサイト掲載、SNS投稿、ファイルサイズを最小化したい場合</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center space-y-3">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          PixelForge では、リサイズ時に出力フォーマットを自由に変換できます。
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
