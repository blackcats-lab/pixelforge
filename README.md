# PixelForge

ブラウザ完結型の画像リサイズWebアプリケーションです。画像データはサーバーに一切送信されず、すべての処理がブラウザ内のCanvas APIで完結します。

## 主な機能

- **画像リサイズ** — ピクセル指定・倍率プリセット・SNSプリセットに対応
- **アスペクト比ロック** — 幅/高さ変更時に自動計算
- **出力フォーマット選択** — PNG / JPEG / WebP + 品質調整
- **多段階リサイズ** — 4x以上の拡大時に段階的処理で品質を向上
- **ピクセルアートモード** — Nearest Neighbor相当の補間でドットを保持
- **ビフォー/アフター比較** — スライダーでリサイズ前後を比較
- **ダークモード** — OS設定連動 + 手動切替
- **キーボードショートカット** — Enter: リサイズ実行、Ctrl+S: ダウンロード

## 技術スタック

| 技術 | 用途 |
|------|------|
| Next.js 16 (App Router) | フレームワーク |
| React 19 | UI |
| TypeScript | 型安全な開発 |
| Tailwind CSS 4 | スタイリング |
| Zustand | 状態管理 |
| Framer Motion | アニメーション |
| lucide-react | アイコン |
| react-compare-slider | ビフォー/アフター比較 |
| next-themes | テーマ切替 |
| Canvas API | 画像リサイズエンジン |

## 開発

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## ビルド

```bash
npm run build
```

## デプロイ

Vercelにデプロイする場合:

```bash
# Vercel CLIでデプロイ
npx vercel --prod
```

東京リージョン (`hnd1`) に最適化済みです。

## プロジェクト構成

```
src/
├── app/              # App Router (ページ・レイアウト)
├── components/       # UIコンポーネント
│   ├── layout/       #   ヘッダー・フッター
│   ├── upload/       #   ドラッグ&ドロップアップロード
│   ├── resize/       #   リサイズ設定パネル
│   └── preview/      #   プレビュー・比較・ダウンロード
├── hooks/            # カスタムフック
├── lib/              # ユーティリティ・Canvas処理
│   └── canvas/       #   リサイズコア関数
├── stores/           # Zustand ストア
└── types/            # 型定義
```

## ライセンス

MIT
