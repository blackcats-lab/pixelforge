import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "一括リサイズ活用術 — 複数画像を効率的にリサイズ",
  description:
    "PixelForge の一括リサイズ機能を最大限活用するためのガイド。複数画像のまとめてリサイズ、ZIPダウンロード、活用シーンを解説します。",
  alternates: {
    canonical: "/guides/batch-resize",
  },
};

export default function BatchResizePage() {
  return (
    <article className="space-y-10">
      <div className="space-y-3">
        <nav className="text-xs text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">ホーム</Link>
          <span className="mx-1.5">/</span>
          <span>ガイド</span>
          <span className="mx-1.5">/</span>
          <span className="text-gray-800 dark:text-gray-200">一括リサイズ活用術</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          一括リサイズ活用術 — 複数画像を効率的にリサイズ
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          大量の画像を一枚ずつリサイズするのは時間がかかります。PixelForge の一括リサイズ機能を使えば、複数の画像をまとめてリサイズし、ZIPファイルとして一括ダウンロードできます。このガイドでは、一括リサイズ機能の使い方と活用シーンをご紹介します。
        </p>
      </div>

      {/* 基本的な使い方 */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          基本的な使い方
        </h2>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">1</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">画像を選択する</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                <Link href="/batch" className="text-blue-600 dark:text-blue-400 hover:underline">一括リサイズページ</Link>にアクセスし、リサイズしたい画像をドラッグ＆ドロップするか、クリックしてファイルを選択します。JPEG、PNG、WebP、BMP、GIF、SVG 形式の画像に対応しています。一度に複数のファイルを選択できます。
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">2</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">リサイズ設定を確認する</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                アップロードされた画像はリストに表示されます。各画像のリサイズ後のサイズを個別に設定できます。すべての画像に同じサイズを適用することも、画像ごとに異なるサイズを指定することも可能です。
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">3</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">リサイズを実行する</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                「すべてリサイズ」ボタンをクリックすると、すべての画像が一括でリサイズされます。処理はブラウザ内で行われるため、サーバーへの画像送信は発生しません。
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">4</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">ZIPでダウンロードする</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                リサイズが完了したら、「ZIPダウンロード」ボタンでリサイズ済みの画像をすべてまとめてダウンロードできます。ZIPファイルの生成もブラウザ内で行われます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 活用シーン */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          活用シーン
        </h2>
        <div className="space-y-4">
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 space-y-2">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              ECサイトの商品画像
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ECサイトに掲載する商品画像は、統一されたサイズにする必要があります。一括リサイズ機能を使えば、何十枚もの商品画像を同じサイズに一度でリサイズでき、作業時間を大幅に短縮できます。画像はサーバーに送信されないため、発売前の新商品画像も安心して処理できます。
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 space-y-2">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              ブログ・メディアの記事画像
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ブログやニュースメディアの記事に挿入する画像は、ページの読み込み速度に影響します。一括リサイズ機能で記事内のすべての画像を適切なサイズに縮小すれば、ページのパフォーマンスが向上し、SEO効果も期待できます。
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 space-y-2">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              SNS投稿の画像準備
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              X（Twitter）や Instagram への投稿画像を、まとめて最適なサイズにリサイズできます。
              <Link href="/guides/sns-image-sizes" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                SNS別 画像サイズガイド
              </Link>
              を参考に、各プラットフォームに最適なサイズを設定してください。
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 space-y-2">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              プレゼン資料の画像
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              プレゼンテーション資料に高解像度の画像を大量に使うと、ファイルサイズが膨大になります。一括リサイズで適切なサイズに縮小すれば、資料のファイルサイズを抑えながら、十分な画質を維持できます。
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 space-y-2">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              写真の整理・バックアップ
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              旅行やイベントで撮影した大量の写真を、メール送信や共有用に縮小したい場合に便利です。元の高解像度画像を保持したまま、共有用のサイズを一括で作成できます。
            </p>
          </div>
        </div>
      </section>

      {/* パフォーマンスのコツ */}
      <section className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 space-y-3">
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
          パフォーマンスのコツ
        </h2>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-0.5">•</span>
            <span><strong>適度な枚数に分ける</strong> — 一度に処理する画像が多すぎるとブラウザのメモリ使用量が増えます。20-30枚程度ずつ処理するのがおすすめです。</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-0.5">•</span>
            <span><strong>不要な画像は先に除外</strong> — アップロード前に不要な画像を選別しておくと、処理時間を短縮できます。</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-0.5">•</span>
            <span><strong>出力フォーマットを活用</strong> — WebP 形式で出力すると、JPEG や PNG よりもファイルサイズを小さくできます。詳しくは<Link href="/guides/image-formats" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">画像フォーマット比較ガイド</Link>をご覧ください。</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-0.5">•</span>
            <span><strong>安定したブラウザを使用</strong> — Chrome や Edge など、最新のブラウザを使用すると最も安定した処理が可能です。</span>
          </li>
        </ul>
      </section>

      {/* 単一リサイズとの比較 */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          一括リサイズ vs 単一リサイズ
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-2 pr-4 font-semibold text-gray-800 dark:text-gray-200">比較項目</th>
                <th className="text-left py-2 pr-4 font-semibold text-gray-800 dark:text-gray-200">一括リサイズ</th>
                <th className="text-left py-2 font-semibold text-gray-800 dark:text-gray-200">単一リサイズ</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4 font-medium">処理枚数</td>
                <td className="py-2 pr-4">複数枚を一度に</td>
                <td className="py-2">1枚ずつ</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4 font-medium">プレビュー</td>
                <td className="py-2 pr-4">リスト表示</td>
                <td className="py-2">大きなプレビュー + 比較機能</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4 font-medium">SNSプリセット</td>
                <td className="py-2 pr-4">—</td>
                <td className="py-2">対応</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4 font-medium">ドット絵モード</td>
                <td className="py-2 pr-4">—</td>
                <td className="py-2">対応</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">ダウンロード形式</td>
                <td className="py-2 pr-4">ZIPファイル</td>
                <td className="py-2">個別ダウンロード</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          大量の画像を同じサイズにリサイズしたい場合は一括リサイズ、1枚の画像を細かく調整したい場合は単一リサイズが適しています。
        </p>
      </section>

      {/* CTA */}
      <div className="text-center space-y-3">
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/batch"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            一括リサイズを使う →
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium rounded-lg transition-colors"
          >
            単一リサイズを使う
          </Link>
        </div>
      </div>
    </article>
  );
}
