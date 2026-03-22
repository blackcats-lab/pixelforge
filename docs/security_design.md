# セキュリティ設計書

プロジェクト名: PixelForge
文書種別: セキュリティ設計書
最終更新日: 2026-03-22

---

## 目次

1. [セキュリティ設計方針](#1-セキュリティ設計方針)
2. [プライバシー設計](#2-プライバシー設計)
3. [HTTPセキュリティヘッダー](#3-httpセキュリティヘッダー)
4. [入力バリデーション](#4-入力バリデーション)
5. [XSS対策](#5-xss対策)
6. [Canvas セキュリティ](#6-canvas-セキュリティ)
7. [サードパーティスクリプト管理](#7-サードパーティスクリプト管理)
8. [localStorage セキュリティ](#8-localstorage-セキュリティ)
9. [依存パッケージセキュリティ](#9-依存パッケージセキュリティ)
10. [改善推奨事項](#10-改善推奨事項)

---

## 1. セキュリティ設計方針

### 1.1 基本理念

PixelForge は**プライバシーファースト**を設計の根幹に据えたブラウザ完結型画像リサイズツールである。以下の原則に基づきセキュリティ設計を行う。

- **ゼロサーバー処理保証**: 画像データのリサイズ・変換・圧縮処理はすべてクライアントサイド（ブラウザ内）で完結する。サーバーサイドでの画像処理は一切行わない。
- **最小権限の原則**: アプリケーションが必要とするブラウザ API やデータアクセスは最小限に留める。
- **多層防御**: HTTPヘッダー、入力バリデーション、フレームワークレベルのXSS対策など、複数の防御層を設ける。

### 1.2 アーキテクチャ概要

```
ユーザーブラウザ
├── ファイル選択 / ドラッグ&ドロップ
├── FileReader API (Data URL 読み込み)
├── Canvas API (リサイズ・フォーマット変換)
├── Blob/URL.createObjectURL (ダウンロード生成)
└── localStorage (プリセット設定のみ)

サーバー (Next.js)
├── 静的アセット配信
├── HTMLレンダリング (SSR/SSG)
└── HTTPセキュリティヘッダー付与
※ API Routes による画像受信エンドポイントは存在しない
```

---

## 2. プライバシー設計

### 2.1 画像データの取り扱い

| 項目 | 設計内容 |
|------|----------|
| 画像アップロード先 | なし（ブラウザ内のみ） |
| サーバーへの画像送信 | 一切行わない |
| API Routes | 画像関連のAPIエンドポイントは存在しない |
| 外部サービスへの画像転送 | 一切行わない |
| 画像データの永続化 | localStorage に画像データは保存しない |

### 2.2 データフロー

ユーザーが選択した画像ファイルは以下のフローで処理される。

1. `useFileUpload` フックにて `FileReader.readAsDataURL()` で Data URL に変換
2. `Image` オブジェクトに読み込み、幅・高さを取得
3. Canvas API 上でリサイズ処理を実行
4. `canvas.toBlob()` または `canvas.toDataURL()` で変換後の画像を生成
5. ダウンロードリンクを生成してユーザーに提供

上記すべての処理はブラウザのメモリ上で完結し、ネットワーク通信は発生しない。

### 2.3 プライバシー通知

アプリケーション内のヘルプパネルにおいて、画像がサーバーにアップロードされないこと、すべての処理がブラウザ内で完結することをユーザーに明示している。メタデータの `description` にも「サーバーへのアップロード不要で、プライバシーを守ります」と記載している。

---

## 3. HTTPセキュリティヘッダー

### 3.1 実装済みヘッダー

`next.config.ts` にて以下のセキュリティヘッダーをすべてのルート (`/(.*)`) に適用している。

#### X-Content-Type-Options: nosniff

```
{ key: "X-Content-Type-Options", value: "nosniff" }
```

- **目的**: ブラウザによるMIMEタイプのスニッフィング（推測）を防止する。
- **効果**: サーバーが宣言した Content-Type を厳密に適用し、悪意あるファイルが異なるMIMEタイプとして解釈されることを防ぐ。

#### X-Frame-Options: DENY

```
{ key: "X-Frame-Options", value: "DENY" }
```

- **目的**: クリックジャッキング攻撃の防止。
- **効果**: 本サイトのページが `<iframe>`, `<frame>`, `<embed>`, `<object>` 等で他サイトに埋め込まれることを完全にブロックする。

#### Referrer-Policy: strict-origin-when-cross-origin

```
{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }
```

- **目的**: リファラー情報の漏洩を最小限に抑える。
- **効果**: 同一オリジンへのリクエストではフルURLを送信するが、クロスオリジンへのリクエストではオリジン（ドメイン）のみを送信する。HTTPSからHTTPへの遷移ではリファラーを送信しない。

### 3.2 追加推奨ヘッダー

現在未実装であるが、導入を推奨するヘッダーについては [10. 改善推奨事項](#10-改善推奨事項) を参照のこと。

---

## 4. 入力バリデーション

### 4.1 MIMEタイプ検証

`src/lib/file-utils.ts` の `isValidImageType()` 関数により、アップロードされたファイルのMIMEタイプを許可リスト方式で検証する。

**許可されるMIMEタイプ** (`src/lib/constants.ts`):

| MIMEタイプ | 形式 |
|-----------|------|
| `image/jpeg` | JPEG |
| `image/png` | PNG |
| `image/webp` | WebP |
| `image/bmp` | BMP |
| `image/gif` | GIF |
| `image/svg+xml` | SVG |

```typescript
export function isValidImageType(file: File): boolean {
  return (ACCEPTED_IMAGE_TYPES as readonly string[]).includes(file.type);
}
```

- **方式**: ホワイトリスト方式（許可リストに含まれるMIMEタイプのみ受け入れ）
- **検証箇所**: `useFileUpload` フック内の `processFile()` にて、ファイル読み込み前に検証を実行
- **拒否時の動作**: `alert()` でユーザーに対応形式を通知し、処理を中断

### 4.2 Canvas サイズ制限

`src/lib/canvas-limits.ts` にて、ブラウザごとのCanvas最大サイズを動的に検出し、制限を適用する。

```typescript
export function getCanvasMaxSize(): number {
  const sizes = [16384, 11180, 8192, 4096];
  // 各サイズで Canvas を生成し、描画可能かテスト
  // 最初に成功したサイズを最大値として返す
  // すべて失敗した場合は安全な 4096 をフォールバック値とする
}
```

- **検出方式**: 大きいサイズから順に Canvas を生成し、`fillRect` + `getImageData` で実際に描画可能かを確認
- **キャッシュ**: 検出結果は `cachedMaxSize` に保持し、再検出のオーバーヘッドを排除
- **フォールバック**: すべてのサイズでテストが失敗した場合、安全な最小値 `4096` を使用
- **バリデーション**: `checkCanvasLimits()` で指定された幅・高さが最大サイズを超えていないかを検証

### 4.3 一括処理ファイル数制限

```typescript
export const MAX_BATCH_FILES = 20;
```

一括処理モードでは最大20ファイルに制限を設けている。これにより以下のリスクを軽減する。

- ブラウザのメモリ枯渇によるクラッシュ
- 大量ファイル処理によるUI無応答状態
- 意図しないリソース消費

### 4.4 ファイルサイズに関する考慮事項

現在、明示的なファイルサイズ上限は設けていない。ただし、以下の自然な制約が存在する。

- Canvas サイズ制限により、極端に大きな画像は処理を拒否される
- ブラウザのメモリ制限により、巨大ファイルは `FileReader` の段階で失敗する
- すべての処理がクライアントサイドのため、サーバーリソースへの影響はない

---

## 5. XSS対策

### 5.1 React による自動エスケープ

本アプリケーションは React 19 (Next.js) を使用しており、JSX内のテキスト出力は自動的にHTMLエスケープされる。これにより、ユーザー入力が意図せずHTMLとして解釈されるリスクを排除している。

### 5.2 dangerouslySetInnerHTML の使用箇所

`dangerouslySetInnerHTML` の使用は `src/app/layout.tsx` における JSON-LD 構造化データの出力に限定される。

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "PixelForge",
      // ... 静的データのみ
    }),
  }}
/>
```

**リスク評価: 低**

- 出力されるデータはすべてソースコード内にハードコードされた静的データである
- ユーザー入力やクエリパラメータ等の動的データは一切含まれない
- `JSON.stringify()` による適切なエスケープが行われている
- `type="application/ld+json"` はブラウザにスクリプトとして実行されない

### 5.3 Data URL の取り扱い

ユーザーがアップロードした画像は `FileReader.readAsDataURL()` で Data URL に変換され、Canvas API を通じてリサイズされる。

- **Canvas API によるサニタイゼーション**: 画像データを Canvas に描画し、`toBlob()` / `toDataURL()` で再エンコードすることにより、元ファイルに埋め込まれた潜在的な悪意あるデータ（メタデータ、スクリプト等）は Canvas のレンダリングパイプラインで除去される。
- **SVG の取り扱い**: SVG は `image/svg+xml` として許可されているが、Canvas に描画される時点でラスタライズされるため、SVG内に含まれるスクリプトは実行されない。

---

## 6. Canvas セキュリティ

### 6.1 Canvas 汚染（Taint）保護

Canvas には同一オリジンポリシーに基づく汚染保護メカニズムがある。クロスオリジンの画像を Canvas に描画すると Canvas が「汚染」され、`toBlob()` や `getImageData()` の呼び出しがブロックされる。

本アプリケーションでは以下の理由によりこのリスクは極めて低い。

- **ローカルファイルのみ使用**: ユーザーのローカルファイルシステムから選択された画像のみを処理する
- **外部URL非対応**: URL指定による外部画像の読み込み機能は提供していない
- **Data URL 経由**: `FileReader.readAsDataURL()` で変換された Data URL は同一オリジンとして扱われるため、Canvas の汚染は発生しない

### 6.2 CORS に関する考慮

外部画像リソースを読み込む機能がないため、CORS に関する特別な対応は不要である。将来的に外部画像URL入力機能を追加する場合は、`crossOrigin="anonymous"` 属性の設定と適切なCORS対応が必要となる。

### 6.3 Image onerror ハンドリング

`useFileUpload` フック内で `Image` オブジェクトを生成する際、`img.onload` コールバックで正常系を処理している。画像の読み込みに失敗した場合、`onload` が呼ばれず状態更新がスキップされるため、アプリケーションの状態は安全に保たれる。

---

## 7. サードパーティスクリプト管理

### 7.1 Google AdSense

#### スクリプト読み込み (`AdScript.tsx`)

```typescript
<Script
  src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
  strategy="lazyOnload"
  crossOrigin="anonymous"
/>
```

| 項目 | 設計内容 |
|------|----------|
| 読み込み戦略 | `lazyOnload` — ページの初期読み込みに影響を与えず、ブラウザのアイドル時に読み込む |
| crossOrigin | `anonymous` — 認証情報なしのリクエストで読み込み |
| 環境変数 | `NEXT_PUBLIC_ADSENSE_CLIENT` が未設定の場合、スクリプトタグ自体をレンダリングしない |
| ドメイン制限 | Google AdSense (`pagead2.googlesyndication.com`) のみ |

#### 広告スロット描画 (`AdSlot.tsx`)

- 環境変数 `NEXT_PUBLIC_ADSENSE_CLIENT` および `NEXT_PUBLIC_ADSENSE_SLOT` が未設定の場合、プレースホルダーを表示
- 広告の初期化 (`adsbygoogle.push({})`) が例外をスローした場合、`adFailed` フラグでフォールバック表示に切り替え
- ユーザーデータを広告ネットワークに送信する処理は実装していない

#### インタースティシャル広告 (`InterstitialOverlay.tsx`)

- カウントダウン制御により、一定秒数経過後にのみ閉じるボタンを表示
- オーバーレイ表示中はボディのスクロールを無効化し、意図しない操作を防止
- 閉じるボタンは明確に配置されており、ユーザーの操作を妨げない設計

### 7.2 サードパーティスクリプトのリスク

Google AdSense スクリプトはサードパーティのJavaScriptコードであり、以下のリスクを伴う。

- AdSense スクリプトは DOM へのフルアクセス権を持つ
- Google のCDNが侵害された場合、悪意あるコードが実行される可能性がある

**緩和策**:

- `lazyOnload` 戦略により、メインコンテンツの読み込み・表示後に遅延読み込みを行う
- AdSense は広く使用されているサービスであり、Googleによるセキュリティ管理が行われている
- 環境変数が未設定の場合はスクリプト自体を読み込まないため、開発環境やAdSense不要な環境では完全に無効化できる

---

## 8. localStorage セキュリティ

### 8.1 保存データ一覧

| キー | 内容 | 機密性 |
|------|------|--------|
| `pixelforge-custom-presets` | カスタムプリセット（名前、幅、高さ） | 非機密 |
| テーマ設定 | ダークモード/ライトモード切替 | 非機密 |

### 8.2 セキュリティ上の考慮

- **画像データの非保存**: localStorage に画像データ（Data URL、Blob等）は一切保存しない
- **認証情報の非保存**: パスワード、トークン、APIキー等の認証情報は保存しない
- **個人情報の非保存**: ユーザーを特定できる情報は保存しない
- **JSON パースのエラーハンドリング**: `useCustomPresets.ts` の `loadPresets()` 関数では `JSON.parse()` を `try-catch` で囲み、破損データや改ざんデータによる例外を安全に処理する

```typescript
function loadPresets(): CustomPreset[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];  // パースエラー時は空配列にフォールバック
  }
}
```

### 8.3 localStorage の一般的リスク

- **XSS による読み取り**: XSS攻撃が成立した場合、localStorage のデータは読み取り可能であるが、機密データを保存していないためリスクは限定的である
- **同一オリジンポリシー**: localStorage は同一オリジンからのみアクセス可能であり、他サイトからの直接アクセスは不可能である

---

## 9. 依存パッケージセキュリティ

### 9.1 サプライチェーンリスク

npm パッケージのサプライチェーン攻撃は増加傾向にある。以下の対策を推奨する。

### 9.2 推奨プラクティス

| 対策 | 説明 |
|------|------|
| `npm audit` の定期実行 | 既知の脆弱性を持つパッケージを検出する。CI/CDパイプラインに組み込むことを推奨 |
| `npm audit --production` | 本番依存のみに絞った監査。開発依存の脆弱性はプロダクションに影響しにくい |
| `package-lock.json` の管理 | ロックファイルをバージョン管理に含め、依存関係の意図しない変更を防止する |
| Dependabot / Renovate | 自動的に依存パッケージの更新PRを生成するツールの導入を推奨 |
| パッケージ数の最小化 | 不要なパッケージを定期的に棚卸しし、攻撃対象面を削減する |

### 9.3 主要依存パッケージ

| パッケージ | 用途 | セキュリティ上の注意 |
|-----------|------|---------------------|
| Next.js | フレームワーク | セキュリティアップデートを速やかに適用すること |
| React | UIライブラリ | 自動エスケープによるXSS防止が有効 |
| framer-motion | アニメーション | DOM操作を伴うため、バージョンを最新に保つこと |
| zustand | 状態管理 | 軽量でセキュリティリスクは低い |
| lucide-react | アイコン | SVGアイコンのみ、セキュリティリスクは低い |

---

## 10. 改善推奨事項

### 10.1 Content-Security-Policy (CSP) ヘッダーの導入

**優先度: 高**

現在CSPヘッダーは未設定である。以下のポリシーの導入を推奨する。

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagservices.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://pagead2.googlesyndication.com;
  font-src 'self';
  connect-src 'self' https://pagead2.googlesyndication.com;
  frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com;
```

**注意事項**:

- AdSense の動作に必要なドメインを許可リストに含める必要がある
- Next.js のインラインスクリプト（JSON-LD等）に対応するため `'unsafe-inline'` が必要。より厳密な制御には `nonce` ベースの CSP を検討すること
- 導入前に `Content-Security-Policy-Report-Only` ヘッダーで影響を確認することを強く推奨する

### 10.2 Permissions-Policy ヘッダーの導入

**優先度: 中**

不要なブラウザAPIへのアクセスを制限する。

```
Permissions-Policy:
  camera=(),
  microphone=(),
  geolocation=(),
  payment=(),
  usb=()
```

本アプリケーションはカメラ、マイク、位置情報等のセンシティブなAPIを使用しないため、明示的に無効化することで攻撃対象面を削減できる。

### 10.3 HSTS (Strict-Transport-Security) ヘッダーの導入

**優先度: 高**

HTTPS 接続を強制し、ダウングレード攻撃を防止する。

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

- `max-age=63072000`: 2年間のHSTS有効期間
- `includeSubDomains`: サブドメインにも適用
- `preload`: ブラウザのHSTSプリロードリストへの登録を可能にする

### 10.4 一括処理のレート制限

**優先度: 低**

現在、一括処理のファイル数上限は `MAX_BATCH_FILES = 20` で制限されているが、以下の追加制限を検討する。

- **合計ファイルサイズ制限**: 一括処理する全ファイルの合計サイズに上限を設ける（例: 100MB）
- **同時処理数制限**: 大量ファイルを逐次処理ではなく、同時処理数を制限した並列処理にすることでメモリ使用量を制御する
- **処理タイムアウト**: 個別ファイルの処理に時間制限を設け、無限ループ等の異常動作を防止する

これらはすべてクライアントサイドの制限であり、サーバーリソースへの影響はないが、ユーザー体験の安定性向上に寄与する。

### 10.5 SVG ファイルの追加バリデーション

**優先度: 中**

SVG は XML ベースのフォーマットであり、`<script>` タグや `onload` 属性等を含む可能性がある。Canvas API でのラスタライズ時にスクリプトは実行されないが、追加の安全策として以下を検討する。

- SVG ファイルの内容検査（`<script>` タグ、イベントハンドラ属性の検出）
- DOMPurify 等のサニタイザーライブラリによる前処理

### 10.6 明示的なファイルサイズ上限の設定

**優先度: 低**

現在、明示的なファイルサイズ制限は未実装である。巨大ファイルの読み込みによるブラウザのメモリ逼迫を防止するため、ファイルサイズ上限（例: 50MB）の導入を検討する。

---

## 付録: セキュリティチェックリスト

| # | チェック項目 | 状態 |
|---|-------------|------|
| 1 | サーバーへの画像データ送信がないことの確認 | 実装済み |
| 2 | MIMEタイプによるファイル形式バリデーション | 実装済み |
| 3 | Canvas サイズ制限の動的検出と適用 | 実装済み |
| 4 | 一括処理ファイル数の上限設定 | 実装済み |
| 5 | X-Content-Type-Options ヘッダー | 実装済み |
| 6 | X-Frame-Options ヘッダー | 実装済み |
| 7 | Referrer-Policy ヘッダー | 実装済み |
| 8 | localStorage への機密データ非保存 | 実装済み |
| 9 | JSON-LD の dangerouslySetInnerHTML が静的データのみ | 確認済み |
| 10 | Content-Security-Policy ヘッダー | 未実装（推奨） |
| 11 | Permissions-Policy ヘッダー | 未実装（推奨） |
| 12 | Strict-Transport-Security ヘッダー | 未実装（推奨） |
| 13 | 明示的なファイルサイズ上限 | 未実装（推奨） |
| 14 | SVG 追加バリデーション | 未実装（推奨） |
