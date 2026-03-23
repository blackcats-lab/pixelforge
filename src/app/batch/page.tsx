import Link from "next/link";
import { Layers, Zap, Shield, Download } from "lucide-react";
import BatchTool from "@/components/batch/BatchTool";
import Footer from "@/components/layout/Footer";

export default function BatchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <BatchTool />

      {/* 静的コンテンツ — SSRでクローラーに表示 */}
      <section className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 text-center">
            一括リサイズの特徴
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex gap-3 p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center">
                <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">まとめて処理</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  複数の画像を一度にアップロードして、同じ設定で一括リサイズできます。1枚ずつ処理する手間を省けます。
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">ZIPダウンロード</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  リサイズ後の画像はZIPファイルにまとめてダウンロードできます。ファイル管理の手間を最小限に抑えます。
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950 flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">高速処理</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  ブラウザのCanvas APIを活用し、サーバーを介さず高速にリサイズ処理を行います。
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950 flex items-center justify-center">
                <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">安全・安心</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  画像データはブラウザの外に出ることがありません。機密性の高い画像も安心してリサイズできます。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 text-center">
            使い方（3ステップ）
          </h3>
          <ol className="space-y-3 max-w-md mx-auto">
            <li className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">1</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                上のエリアに複数の画像をドラッグ＆ドロップ、またはクリックして選択
              </p>
            </li>
            <li className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">2</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                各画像のリサイズ設定を確認し、「すべてリサイズ」ボタンをクリック
              </p>
            </li>
            <li className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">3</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                処理が完了したら「ZIPダウンロード」ボタンで一括保存
              </p>
            </li>
          </ol>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 text-center">
            よくある質問
          </h3>
          <details className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <summary className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              一度にアップロードできる画像数に制限はありますか？
            </summary>
            <p className="px-4 pb-3 text-xs text-gray-500 dark:text-gray-400">
              ブラウザのメモリに依存しますが、一般的なPCであれば数十枚程度は問題なく処理できます。非常に大きなファイル（10MB以上）が多い場合は、分割してリサイズすることをおすすめします。
            </p>
          </details>
          <details className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <summary className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              画像ごとに異なるサイズを指定できますか？
            </summary>
            <p className="px-4 pb-3 text-xs text-gray-500 dark:text-gray-400">
              はい、各画像に個別のリサイズ設定を適用できます。リスト内の各画像のサイズ欄を編集してから「すべてリサイズ」を実行してください。
            </p>
          </details>
          <details className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <summary className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              出力フォーマットは選べますか？
            </summary>
            <p className="px-4 pb-3 text-xs text-gray-500 dark:text-gray-400">
              はい、PNG・JPEG・WebP から出力フォーマットを選択できます。元のフォーマットを維持することも、別のフォーマットに変換することも可能です。
            </p>
          </details>
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            1枚ずつ細かく設定したい場合は
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            単一リサイズモードを使う →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
