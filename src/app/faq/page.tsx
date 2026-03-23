import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "よくある質問（FAQ）",
  description:
    "PixelForgeの使い方、対応フォーマット、プライバシーなどに関するよくある質問と回答をまとめています。",
  alternates: {
    canonical: "/faq",
  },
};

const faqs = [
  {
    question: "PixelForge とは何ですか？",
    answer:
      "PixelForge は、ブラウザ上で画像のリサイズが完結する無料のWebツールです。画像をサーバーにアップロードする必要がなく、すべての処理がお使いのブラウザ内で行われるため、プライバシーを守りながら画像サイズを変更できます。",
  },
  {
    question: "画像はサーバーにアップロードされますか？",
    answer:
      "いいえ、画像はサーバーにアップロードされません。PixelForge はブラウザの Canvas API を使用してすべての画像処理をローカルで実行します。画像データがインターネット上に送信されることは一切ありません。そのため、個人情報を含む画像や機密性の高い画像も安心してリサイズできます。",
  },
  {
    question: "どの画像フォーマットに対応していますか？",
    answer:
      "入力フォーマットとして、JPEG、PNG、WebP、BMP、GIF、SVG に対応しています。出力フォーマットは PNG、JPEG、WebP の3種類から選択できます。フォーマットの詳細については「画像フォーマット比較ガイド」をご覧ください。",
  },
  {
    question: "リサイズすると画質は劣化しますか？",
    answer:
      "PNG 形式で出力する場合は可逆圧縮のため画質の劣化はありません。JPEG・WebP 形式では非可逆圧縮を使用するため多少の劣化がありますが、品質スライダーで圧縮率を調整できます。品質を90%以上に設定すれば、目に見える劣化はほとんどありません。",
  },
  {
    question: "アスペクト比を維持したままリサイズできますか？",
    answer:
      "はい、アスペクト比ロック機能を使えば、幅または高さの一方を変更するだけで、もう一方が自動的に計算されます。鍵アイコンをクリックしてロック・アンロックを切り替えられます。",
  },
  {
    question: "SNS向けの画像サイズに変更できますか？",
    answer:
      "はい、X（旧Twitter）、Instagram、Facebook などの主要SNS向けのプリセットサイズが用意されています。ワンクリックで最適なサイズに設定できます。各SNSの推奨サイズについては「SNS別 画像サイズガイド」をご覧ください。",
  },
  {
    question: "一度に複数の画像をリサイズできますか？",
    answer:
      "はい、一括リサイズ機能を使えば、複数の画像をまとめてリサイズし、ZIPファイルとしてダウンロードできます。ヘッダーの「一括処理」リンクから一括リサイズページに移動できます。",
  },
  {
    question: "スマートフォンやタブレットでも使えますか？",
    answer:
      "はい、PixelForge はレスポンシブデザインに対応しており、スマートフォンやタブレットのブラウザからもご利用いただけます。アプリのインストールは不要で、Webブラウザさえあればどのデバイスからでも使用できます。",
  },
  {
    question: "ドット絵（ピクセルアート）をきれいに拡大できますか？",
    answer:
      "はい、「ドット絵モード」を有効にすると、ニアレストネイバー補間が使用され、ピクセルがぼやけることなくシャープに拡大されます。ドット絵やアイコンの拡大に最適な機能です。",
  },
  {
    question: "利用料金はかかりますか？",
    answer:
      "PixelForge は完全無料でご利用いただけます。アカウント登録も不要です。ブラウザでページを開くだけですぐにお使いいただけます。",
  },
];

export default function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              よくある質問（FAQ）
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              PixelForge の使い方やよくあるご質問にお答えします
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden group"
              >
                <summary className="px-5 py-4 text-sm font-medium text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  {faq.question}
                </summary>
                <p className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 space-y-3 text-center">
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
              お探しの情報が見つかりませんでしたか？
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              以下のガイドもぜひご覧ください。
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/guides/sns-image-sizes"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                SNS別 画像サイズガイド
              </Link>
              <Link
                href="/guides/image-formats"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                画像フォーマット比較
              </Link>
              <Link
                href="/guides/batch-resize"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                一括リサイズ活用術
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* JSON-LD FAQPage構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
