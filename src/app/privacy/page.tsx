import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "PixelForge のプライバシーポリシー。画像データの取り扱い、Cookie、広告について。",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 space-y-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          プライバシーポリシー
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          最終更新日: 2025年3月22日
        </p>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            1. 画像データの取り扱い
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            PixelForge はすべての画像処理をお使いのブラウザ内で実行します。
            アップロードされた画像はサーバーに送信されることはなく、
            ブラウザのメモリ上でのみ処理されます。
            ページを閉じると画像データは完全に消去されます。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            2. 収集する情報
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            PixelForge は個人情報を直接収集しません。
            ただし、以下のサービスを利用しており、これらのサービスが情報を収集する場合があります。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            3. Google AdSense と Cookie
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            本サイトでは Google AdSense を使用して広告を配信しています。
            Google は Cookie を使用してユーザーの興味に基づく広告を表示することがあります。
            Google による Cookie の使用については、
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Google の広告に関するポリシー
            </a>
            をご確認ください。
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            パーソナライズ広告を無効にしたい場合は、
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Google 広告設定
            </a>
            から設定を変更できます。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            4. アクセス解析
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            本サイトでは、サービス改善のためにアクセス解析ツールを使用する場合があります。
            これらのツールは匿名化された利用状況データを収集します。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            5. お問い合わせ
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            本ポリシーに関するご質問は、サイト運営者までお問い合わせください。
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
