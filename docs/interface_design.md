# インターフェース設計書 — PixelForge

ブラウザベース画像リサイズアプリケーション PixelForge のインターフェース設計書。
コンポーネントProps、カスタムフック、ライブラリ関数、Zustandストアの全APIを記載する。

---

## 1. コンポーネントProps一覧

### 1.1 レイアウト系

#### Header

**ファイル:** `src/components/layout/Header.tsx`

| プロパティ | 型 | 必須 | 説明 |
|---|---|---|---|
| `onClear` | `() => void` | いいえ | クリアボタン押下時のコールバック |
| `showClear` | `boolean` | いいえ | クリアボタンの表示・非表示 |

#### Footer

**ファイル:** `src/components/layout/Footer.tsx`

Propsなし。プライバシーメッセージとアプリ名を表示する静的コンポーネント。

---

### 1.2 アップロード系

#### DropZone

**ファイル:** `src/components/upload/DropZone.tsx`

| プロパティ | 型 | 必須 | 説明 |
|---|---|---|---|
| `fileInputRef` | `RefObject<HTMLInputElement \| null>` | はい | ファイル入力要素のref |
| `onFileChange` | `(e: ChangeEvent<HTMLInputElement>) => void` | はい | ファイル選択時のコールバック |
| `onDrop` | `(e: DragEvent<HTMLDivElement>) => void` | はい | ドロップ時のコールバック |
| `onDragOver` | `(e: DragEvent<HTMLDivElement>) => void` | はい | ドラッグオーバー時のコールバック |
| `onOpenFileDialog` | `() => void` | はい | ファイル選択ダイアログを開くコールバック |

---

### 1.3 リサイズ設定系

#### SettingsPanel

**ファイル:** `src/components/resize/SettingsPanel.tsx`

| プロパティ | 型 | 必須 | 説明 |
|---|---|---|---|
| `width` | `number \| ""` | はい | 現在の幅（空文字は未入力状態） |
| `height` | `number \| ""` | はい | 現在の高さ（空文字は未入力状態） |
| `isLocked` | `boolean` | はい | アスペクト比ロックの状態 |
| `originalWidth` | `number` | はい | 元画像の幅 |
| `originalHeight` | `number` | はい | 元画像の高さ |
| `onWidthChange` | `(val: number \| "") => void` | はい | 幅変更時のコールバック |
| `onHeightChange` | `(val: number \| "") => void` | はい | 高さ変更時のコールバック |
| `onToggleLock` | `() => void` | はい | アスペクト比ロック切替コールバック |
| `onApplyScale` | `(scale: number) => void` | はい | 倍率プリセット適用コールバック |
| `onApplyPreset` | `(w: number, h: number) => void` | はい | サイズプリセット適用コールバック |
| `onResize` | `() => void` | はい | リサイズ実行コールバック |

#### DimensionInput

**ファイル:** `src/components/resize/DimensionInput.tsx`

| プロパティ | 型 | 必須 | 説明 |
|---|---|---|---|
| `width` | `number \| ""` | はい | 現在の幅 |
| `height` | `number \| ""` | はい | 現在の高さ |
| `isLocked` | `boolean` | はい | アスペクト比ロックの状態 |
| `onWidthChange` | `(val: number \| "") => void` | はい | 幅変更時のコールバック |
| `onHeightChange` | `(val: number \| "") => void` | はい | 高さ変更時のコールバック |
| `onToggleLock` | `() => void` | はい | アスペクト比ロック切替コールバック |
| `originalWidth` | `number` | はい | 元画像の幅（参考表示用） |
| `originalHeight` | `number` | はい | 元画像の高さ（参考表示用） |

#### ScalePresets

**ファイル:** `src/components/resize/ScalePresets.tsx`

| プロパティ | 型 | 必須 | 説明 |
|---|---|---|---|
| `onApply` | `(scale: number) => void` | はい | 倍率プリセット選択時のコールバック |

#### SnsPresets

**ファイル:** `src/components/resize/SnsPresets.tsx`

| プロパティ | 型 | 必須 | 説明 |
|---|---|---|---|
| `onApply` | `(width: number, height: number) => void` | はい | SNSプリセット選択時のコールバック |

#### CustomPresets

**ファイル:** `src/components/resize/CustomPresets.tsx`

| プロパティ | 型 | 必須 | 説明 |
|---|---|---|---|
| `presets` | `CustomPreset[]` | はい | 保存済みカスタムプリセットの配列 |
| `onApply` | `(width: number, height: number) => void` | はい | プリセット適用時のコールバック |
| `onAdd` | `(name: string, width: number, height: number) => void` | はい | プリセット追加時のコールバック |
| `onRemove` | `(id: string) => void` | はい | プリセット削除時のコールバック |
| `currentWidth` | `number \| ""` | はい | 現在の幅（保存時に使用） |
| `currentHeight` | `number \| ""` | はい | 現在の高さ（保存時に使用） |

#### FormatSelect

**ファイル:** `src/components/resize/FormatSelect.tsx`

| プロパティ | 型 | 必須 | 説明 |
|---|---|---|---|
| `format` | `ImageFormat` | はい | 現在選択中の出力フォーマット |
| `onFormatChange` | `(format: ImageFormat) => void` | はい | フォーマット変更時のコールバック |

#### QualitySlider

**ファイル:** `src/components/resize/QualitySlider.tsx`

| プロパティ | 型 | 必須 | 説明 |
|---|---|---|---|
| `quality` | `number` | はい | 品質値（0.0〜1.0） |
| `onQualityChange` | `(quality: number) => void` | はい | 品質変更時のコールバック |
| `disabled` | `boolean` | いいえ | 無効状態（PNG選択時にtrue） |

#### ResizeModeToggle

**ファイル:** `src/components/resize/ResizeModeToggle.tsx`

| プロパティ | 型 | 必須 | 説明 |
|---|---|---|---|
| `smoothing` | `boolean` | はい | スムージングの有効/無効 |
| `onSmoothingChange` | `(smoothing: boolean) => void` | はい | スムージング切替コールバック |

#### ResizeButton

**ファイル:** `src/components/resize/ResizeButton.tsx`

| プロパティ | 型 | 必須 | 説明 |
|---|---|---|---|
| `onClick` | `() => void` | はい | リサイズ実行コールバック |
| `isProcessing` | `boolean` | はい | 処理中フラグ（ローディング表示制御） |
| `disabled` | `boolean` | いいえ | ボタン無効状態 |

#### CanvasWarning

**ファイル:** `src/components/resize/CanvasWarning.tsx`

| プロパティ | 型 | 必須 | 説明 |
|---|---|---|---|
| `targetWidth` | `number \| ""` | はい | リサイズ先の幅 |
| `targetHeight` | `number \| ""` | はい | リサイズ先の高さ |

Canvas最大サイズを超過している場合に警告メッセージを表示する。超過していない場合は何もレンダリングしない。

---

### 1.4 プレビュー系

#### PreviewPanel

**ファイル:** `src/components/preview/PreviewPanel.tsx`

| プロパティ | 型 | 必須 | 説明 |
|---|---|---|---|
| `originalSrc` | `string` | はい | 元画像のData URL |
| `resizedSrc` | `string \| null` | はい | リサイズ後画像のData URL（未リサイズ時null） |
| `fileName` | `string` | はい | ファイル名 |
| `originalWidth` | `number` | はい | 元画像の幅 |
| `originalHeight` | `number` | はい | 元画像の高さ |
| `originalFileSize` | `number` | はい | 元画像のファイルサイズ（バイト） |
| `targetWidth` | `number \| ""` | はい | リサイズ先の幅 |
| `targetHeight` | `number \| ""` | はい | リサイズ先の高さ |
| `resizedFileSize` | `number \| null` | はい | リサイズ後のファイルサイズ（バイト、未リサイズ時null） |
| `onDownload` | `() => void` | はい | ダウンロードボタン押下時のコールバック |

#### ImagePreview

**ファイル:** `src/components/preview/ImagePreview.tsx`

| プロパティ | 型 | 必須 | 説明 |
|---|---|---|---|
| `src` | `string` | はい | 表示する画像のData URL |
| `alt` | `string` | いいえ | alt属性（デフォルト: `"プレビュー"`） |

#### CompareSlider

**ファイル:** `src/components/preview/CompareSlider.tsx`

| プロパティ | 型 | 必須 | 説明 |
|---|---|---|---|
| `originalSrc` | `string` | はい | 元画像のData URL |
| `resizedSrc` | `string` | はい | リサイズ後画像のData URL |

#### ImageInfo

**ファイル:** `src/components/preview/ImageInfo.tsx`

| プロパティ | 型 | 必須 | 説明 |
|---|---|---|---|
| `fileName` | `string` | はい | ファイル名 |
| `originalWidth` | `number` | はい | 元画像の幅 |
| `originalHeight` | `number` | はい | 元画像の高さ |
| `originalFileSize` | `number` | はい | 元画像のファイルサイズ（バイト） |
| `targetWidth` | `number \| ""` | はい | リサイズ先の幅 |
| `targetHeight` | `number \| ""` | はい | リサイズ先の高さ |
| `resizedFileSize` | `number \| null` | はい | リサイズ後のファイルサイズ（バイト、未リサイズ時null） |

#### DownloadButton

**ファイル:** `src/components/preview/DownloadButton.tsx`

| プロパティ | 型 | 必須 | 説明 |
|---|---|---|---|
| `onClick` | `() => void` | はい | ダウンロード実行コールバック |
| `disabled` | `boolean` | いいえ | ボタン無効状態 |

---

### 1.5 一括処理系

#### BatchUploader

**ファイル:** `src/components/batch/BatchUploader.tsx`

Propsなし。内部で `useBatchStore` を使用して状態を管理する。ドラッグ＆ドロップおよびファイル選択による複数画像の一括アップロードを提供する。

#### BatchList

**ファイル:** `src/components/batch/BatchList.tsx`

| プロパティ | 型 | 必須 | 説明 |
|---|---|---|---|
| `onResizeAll` | `() => void` | はい | 全画像リサイズ実行コールバック |

#### BatchItem

**ファイル:** `src/components/batch/BatchItem.tsx`

| プロパティ | 型 | 必須 | 説明 |
|---|---|---|---|
| `item` | `BatchItem` | はい | バッチアイテムのデータ |
| `resizeMode` | `BatchResizeMode` | はい | リサイズモード（`"scale"` \| `"dimensions"`） |
| `scale` | `number` | はい | 共通倍率 |
| `targetWidth` | `number` | はい | 共通ターゲット幅 |
| `targetHeight` | `number` | はい | 共通ターゲット高さ |
| `onRemove` | `(id: string) => void` | はい | アイテム削除コールバック |

#### BatchDownload

**ファイル:** `src/components/batch/BatchDownload.tsx`

Propsなし。内部で `useBatchStore` を使用。完了済みアイテムをZIPファイルとしてダウンロードする。完了アイテムがない場合は何もレンダリングしない。

---

### 1.6 広告系

#### AdScript

**ファイル:** `src/components/ad/AdScript.tsx`

Propsなし。環境変数 `NEXT_PUBLIC_ADSENSE_CLIENT` が設定されている場合にGoogle AdSenseスクリプトを読み込む。

#### AdSlot

**ファイル:** `src/components/ad/AdSlot.tsx`

Propsなし。環境変数 `NEXT_PUBLIC_ADSENSE_CLIENT` および `NEXT_PUBLIC_ADSENSE_SLOT` が設定されている場合にAdSense広告を表示する。未設定またはブロック時はプレースホルダーを表示する。

---

## 2. カスタムフックAPI

### 2.1 useFileUpload

**ファイル:** `src/hooks/useFileUpload.ts`

単一画像のアップロード処理を管理するフック。

**引数:** なし

**戻り値:**

| フィールド | 型 | 説明 |
|---|---|---|
| `image` | `UploadedImage \| null` | アップロード済み画像データ（未アップロード時null） |
| `fileInputRef` | `RefObject<HTMLInputElement \| null>` | ファイル入力要素のref |
| `handleFileChange` | `(e: ChangeEvent<HTMLInputElement>) => void` | ファイル選択変更ハンドラ |
| `handleDrop` | `(e: DragEvent<HTMLDivElement>) => void` | ドロップイベントハンドラ |
| `handleDragOver` | `(e: DragEvent<HTMLDivElement>) => void` | ドラッグオーバーイベントハンドラ |
| `reset` | `() => void` | アップロード状態をリセット |
| `openFileDialog` | `() => void` | ファイル選択ダイアログを開く |

---

### 2.2 useCanvasResize

**ファイル:** `src/hooks/useCanvasResize.ts`

Canvas APIを使用した画像リサイズ処理を提供するフック。内部で `useResizeStore` の `format`, `quality`, `smoothing` を参照する。拡大率が4倍を超える場合は自動的に段階的リサイズ（`multiStepResize`）を使用する。

**引数:** なし

**戻り値:**

| フィールド | 型 | 説明 |
|---|---|---|
| `resize` | `(image: UploadedImage, targetWidth: number, targetHeight: number) => Promise<void>` | リサイズ実行関数。結果はresizeStoreに保存される |

---

### 2.3 useAspectRatio

**ファイル:** `src/hooks/useAspectRatio.ts`

アスペクト比を維持しながら幅・高さを管理するフック。

**引数:**

| 引数 | 型 | 説明 |
|---|---|---|
| `initialWidth` | `number` | 初期幅 |
| `initialHeight` | `number` | 初期高さ |

**戻り値:**

| フィールド | 型 | 説明 |
|---|---|---|
| `width` | `number \| ""` | 現在の幅 |
| `height` | `number \| ""` | 現在の高さ |
| `isLocked` | `boolean` | アスペクト比ロック状態 |
| `setWidth` | `(val: number \| "") => void` | 幅を設定（ロック時は高さも連動） |
| `setHeight` | `(val: number \| "") => void` | 高さを設定（ロック時は幅も連動） |
| `toggleLock` | `() => void` | アスペクト比ロックを切替。ロック有効化時に現在の比率を保存 |
| `applyScale` | `(scale: number) => void` | 初期サイズに対する倍率を適用 |
| `applyPreset` | `(presetW: number, presetH: number) => void` | プリセットサイズを適用。ロック時はアスペクト比も更新 |
| `reset` | `(newWidth: number, newHeight: number) => void` | 新しいサイズで状態をリセット（ロックをtrueに戻す） |

---

### 2.4 useDownload

**ファイル:** `src/hooks/useDownload.ts`

リサイズ後画像のダウンロード処理を提供するフック。

**引数:** なし

**戻り値:**

| フィールド | 型 | 説明 |
|---|---|---|
| `download` | `(params: { dataUrl: string; originalFileName: string; width: number; height: number; format: ImageFormat }) => void` | ダウンロード実行関数。ファイル名は自動生成される |

---

### 2.5 useBatchResize

**ファイル:** `src/hooks/useBatchResize.ts`

一括リサイズ処理を管理するフック。内部で `useBatchStore` を参照する。

**引数:** なし

**戻り値:**

| フィールド | 型 | 説明 |
|---|---|---|
| `resizeAll` | `() => Promise<void>` | 未処理・エラーのアイテムをすべてリサイズ実行。処理結果はbatchStoreに保存される |

---

### 2.6 useImageInfo

**ファイル:** `src/hooks/useImageInfo.ts`

画像の情報を整形して返すフック。

**引数:**

| 引数 | 型 | 説明 |
|---|---|---|
| `image` | `UploadedImage \| null` | アップロード済み画像データ |
| `targetWidth` | `number \| ""` | リサイズ先の幅 |
| `targetHeight` | `number \| ""` | リサイズ先の高さ |

**戻り値:** `{ fileName: string; originalSize: string; targetSize: string; fileSize: string; scalePercent: string } | null`

| フィールド | 型 | 説明 |
|---|---|---|
| `fileName` | `string` | ファイル名 |
| `originalSize` | `string` | 元の画像サイズ（例: `"1920 × 1080"`） |
| `targetSize` | `string` | リサイズ先サイズ（例: `"800 × 450"`） |
| `fileSize` | `string` | 元のファイルサイズ（整形済み、例: `"2.5 MB"`） |
| `scalePercent` | `string` | 倍率（例: `"42%"`） |

画像がnullの場合はnullを返す。

---

### 2.7 useCustomPresets

**ファイル:** `src/hooks/useCustomPresets.ts`

カスタムプリセットのCRUD操作を提供するフック。データは `localStorage` に永続化される。

**引数:** なし

**戻り値:**

| フィールド | 型 | 説明 |
|---|---|---|
| `presets` | `CustomPreset[]` | 保存済みカスタムプリセットの配列 |
| `addPreset` | `(name: string, width: number, height: number) => void` | 新規プリセットを追加 |
| `removePreset` | `(id: string) => void` | IDを指定してプリセットを削除 |

---

## 3. ライブラリ関数API

### 3.1 canvas/resize.ts

**ファイル:** `src/lib/canvas/resize.ts`

#### resizeImage

Canvas APIによる画像リサイズ処理。

```typescript
function resizeImage(options: ResizeOptions): Promise<ResizeResult>
```

**引数:** `ResizeOptions`

| フィールド | 型 | 説明 |
|---|---|---|
| `imageSrc` | `string` | 元画像のData URL |
| `targetWidth` | `number` | リサイズ先の幅 |
| `targetHeight` | `number` | リサイズ先の高さ |
| `format` | `ImageFormat` | 出力フォーマット |
| `quality` | `number` | 品質（0.0〜1.0） |
| `smoothing` | `boolean` | スムージング有効/無効（falseでピクセルアートモード） |

**戻り値:** `Promise<ResizeResult>`

| フィールド | 型 | 説明 |
|---|---|---|
| `dataUrl` | `string` | リサイズ後画像のData URL |
| `width` | `number` | リサイズ後の幅 |
| `height` | `number` | リサイズ後の高さ |
| `blob` | `Blob` | リサイズ後画像のBlobオブジェクト |
| `fileSize` | `number` | リサイズ後のファイルサイズ（バイト） |

---

### 3.2 canvas/multi-step.ts

**ファイル:** `src/lib/canvas/multi-step.ts`

#### multiStepResize

4倍以上の拡大時に段階的にCanvas描画を繰り返し品質を向上させるリサイズ関数。内部でステップ係数2を使用し、段階的にサイズを拡大する。

```typescript
function multiStepResize(options: {
  imageSrc: string;
  originalWidth: number;
  originalHeight: number;
  targetWidth: number;
  targetHeight: number;
  format: ImageFormat;
  quality: number;
  smoothing?: boolean;
  onProgress?: (step: number, totalSteps: number) => void;
}): Promise<string>
```

**引数:**

| フィールド | 型 | 必須 | 説明 |
|---|---|---|---|
| `imageSrc` | `string` | はい | 元画像のData URL |
| `originalWidth` | `number` | はい | 元画像の幅 |
| `originalHeight` | `number` | はい | 元画像の高さ |
| `targetWidth` | `number` | はい | リサイズ先の幅 |
| `targetHeight` | `number` | はい | リサイズ先の高さ |
| `format` | `ImageFormat` | はい | 出力フォーマット |
| `quality` | `number` | はい | 品質（0.0〜1.0） |
| `smoothing` | `boolean` | いいえ | スムージング有効/無効（デフォルト: `true`） |
| `onProgress` | `(step: number, totalSteps: number) => void` | いいえ | 進捗コールバック |

**戻り値:** `Promise<string>` — リサイズ後画像のData URL

---

### 3.3 canvas-limits.ts

**ファイル:** `src/lib/canvas-limits.ts`

#### getCanvasMaxSize

ブラウザのCanvas最大サイズを検出して返す。結果はキャッシュされる。

```typescript
function getCanvasMaxSize(): number
```

**戻り値:** `number` — Canvas最大サイズ（ピクセル）。検出候補: 16384, 11180, 8192, 4096。検出失敗時は4096を返す。

#### checkCanvasLimits

指定サイズがCanvasの制限内かチェックする。

```typescript
function checkCanvasLimits(
  width: number,
  height: number
): { valid: boolean; message?: string }
```

**引数:**

| 引数 | 型 | 説明 |
|---|---|---|
| `width` | `number` | チェックする幅 |
| `height` | `number` | チェックする高さ |

**戻り値:** `{ valid: boolean; message?: string }`

| フィールド | 型 | 説明 |
|---|---|---|
| `valid` | `boolean` | 制限内であればtrue |
| `message` | `string \| undefined` | 制限超過時の警告メッセージ |

---

### 3.4 file-utils.ts

**ファイル:** `src/lib/file-utils.ts`

#### isValidImageType

ファイルが対応画像形式かどうかを判定する。

```typescript
function isValidImageType(file: File): boolean
```

**引数:**

| 引数 | 型 | 説明 |
|---|---|---|
| `file` | `File` | 判定対象のファイル |

**戻り値:** `boolean` — 対応形式であればtrue

#### formatFileSize

バイト数を人間が読みやすい形式に変換する。

```typescript
function formatFileSize(bytes: number): string
```

**引数:**

| 引数 | 型 | 説明 |
|---|---|---|
| `bytes` | `number` | ファイルサイズ（バイト） |

**戻り値:** `string` — 整形済みサイズ文字列（例: `"1.5 MB"`, `"256.0 KB"`, `"512 B"`）

#### getExtensionFromFormat

画像フォーマットからファイル拡張子を取得する。

```typescript
function getExtensionFromFormat(format: ImageFormat): string
```

**引数:**

| 引数 | 型 | 説明 |
|---|---|---|
| `format` | `ImageFormat` | 画像フォーマット |

**戻り値:** `string` — 拡張子（`"jpg"`, `"png"`, `"webp"`）

#### getDefaultFormat

ファイルのMIMEタイプからデフォルトの出力フォーマットを決定する。

```typescript
function getDefaultFormat(file: File): ImageFormat
```

**引数:**

| 引数 | 型 | 説明 |
|---|---|---|
| `file` | `File` | 対象ファイル |

**戻り値:** `ImageFormat` — JPEG/WebPはそのまま、その他はPNGを返す

#### generateFileName

リサイズ後のダウンロード用ファイル名を生成する。

```typescript
function generateFileName(
  originalName: string,
  width: number,
  height: number,
  format: ImageFormat
): string
```

**引数:**

| 引数 | 型 | 説明 |
|---|---|---|
| `originalName` | `string` | 元のファイル名 |
| `width` | `number` | リサイズ後の幅 |
| `height` | `number` | リサイズ後の高さ |
| `format` | `ImageFormat` | 出力フォーマット |

**戻り値:** `string` — 生成されたファイル名（例: `"photo_800x600.webp"`）

---

## 4. Zustandストアアクション

### 4.1 resizeStore

**ファイル:** `src/stores/resizeStore.ts`

単一画像リサイズの設定と結果を管理するストア。

#### ステートフィールド

| フィールド | 型 | 初期値 | 説明 |
|---|---|---|---|
| `format` | `ImageFormat` | `"image/png"` | 出力フォーマット |
| `quality` | `number` | `0.9` | 品質（0.0〜1.0） |
| `smoothing` | `boolean` | `true` | スムージング有効/無効 |
| `isProcessing` | `boolean` | `false` | 処理中フラグ |
| `resizedDataUrl` | `string \| null` | `null` | リサイズ後画像のData URL |
| `resizedFileSize` | `number \| null` | `null` | リサイズ後のファイルサイズ（バイト） |

#### アクション

| メソッド | シグネチャ | 説明 |
|---|---|---|
| `setFormat` | `(format: ImageFormat) => void` | フォーマットを設定。PNG選択時はqualityを1に、それ以外は0.9にリセット。リサイズ結果もクリアされる |
| `setQuality` | `(quality: number) => void` | 品質を設定 |
| `setSmoothing` | `(smoothing: boolean) => void` | スムージングを設定 |
| `setProcessing` | `(isProcessing: boolean) => void` | 処理中フラグを設定 |
| `setResult` | `(dataUrl: string, fileSize: number) => void` | リサイズ結果を保存し、処理中フラグをfalseに設定 |
| `clearResult` | `() => void` | リサイズ結果のみクリア |
| `resetAll` | `() => void` | 全ステートを初期値にリセット |

---

### 4.2 batchStore

**ファイル:** `src/stores/batchStore.ts`

一括処理の全状態を管理するストア。

**エクスポート型:** `BatchResizeMode = "scale" | "dimensions"`

#### ステートフィールド

| フィールド | 型 | 初期値 | 説明 |
|---|---|---|---|
| `items` | `BatchItem[]` | `[]` | バッチアイテムの配列 |
| `resizeMode` | `BatchResizeMode` | `"scale"` | リサイズモード（倍率/解像度） |
| `commonFormat` | `ImageFormat` | `"image/png"` | 共通出力フォーマット |
| `commonQuality` | `number` | `0.9` | 共通品質 |
| `commonSmoothing` | `boolean` | `true` | 共通スムージング設定 |
| `commonScale` | `number` | `1` | 共通倍率 |
| `commonWidth` | `number` | `1080` | 共通ターゲット幅 |
| `commonHeight` | `number` | `1080` | 共通ターゲット高さ |
| `isProcessing` | `boolean` | `false` | 処理中フラグ |

#### アクション

| メソッド | シグネチャ | 説明 |
|---|---|---|
| `addItems` | `(items: Omit<BatchItem, "status" \| "resizedDataUrl" \| "resizedFileSize" \| "error">[]) => void` | アイテムを追加。status等は自動設定（status: `"pending"`, その他: `null`） |
| `removeItem` | `(id: string) => void` | IDを指定してアイテムを削除 |
| `clearAll` | `() => void` | 全アイテムをクリアし、処理中フラグをfalseにリセット |
| `updateItemStatus` | `(id: string, status: BatchItemStatus, error?: string) => void` | アイテムのステータスを更新。エラーメッセージも任意で設定 |
| `setItemResult` | `(id: string, dataUrl: string, fileSize: number) => void` | アイテムのリサイズ結果を保存し、ステータスを `"done"` に設定 |
| `setResizeMode` | `(mode: BatchResizeMode) => void` | リサイズモードを設定 |
| `setCommonFormat` | `(format: ImageFormat) => void` | 共通フォーマットを設定。PNG選択時はqualityを1に、それ以外は0.9にリセット |
| `setCommonQuality` | `(quality: number) => void` | 共通品質を設定 |
| `setCommonSmoothing` | `(smoothing: boolean) => void` | 共通スムージングを設定 |
| `setCommonScale` | `(scale: number) => void` | 共通倍率を設定 |
| `setCommonWidth` | `(width: number) => void` | 共通ターゲット幅を設定 |
| `setCommonHeight` | `(height: number) => void` | 共通ターゲット高さを設定 |
| `setProcessing` | `(isProcessing: boolean) => void` | 処理中フラグを設定 |

---

### 4.3 adStore

**ファイル:** `src/stores/adStore.ts`

インタースティシャル広告の表示状態を管理するストア。

#### ステートフィールド

| フィールド | 型 | 初期値 | 説明 |
|---|---|---|---|
| `isVisible` | `boolean` | `false` | 広告の表示状態 |
| `countdown` | `number` | `5` | 閉じるまでのカウントダウン秒数 |
| `canClose` | `boolean` | `false` | 閉じるボタンの有効化フラグ |

#### アクション

| メソッド | シグネチャ | 説明 |
|---|---|---|
| `show` | `() => void` | 広告を表示し、カウントダウンを5にリセット、canCloseをfalseに設定 |
| `hide` | `() => void` | 広告を非表示にする |
| `tick` | `() => void` | カウントダウンを1減らす。0以下になった場合はcanCloseをtrueに設定 |

---

## 付録: 共通型定義

**ファイル:** `src/types/index.ts`

```typescript
type ImageFormat = "image/jpeg" | "image/png" | "image/webp";

interface ResizeOptions {
  imageSrc: string;
  targetWidth: number;
  targetHeight: number;
  format: ImageFormat;
  quality: number;       // 0.0 - 1.0
  smoothing: boolean;    // false = ピクセルアートモード
}

interface ResizeResult {
  dataUrl: string;
  width: number;
  height: number;
  blob: Blob;
  fileSize: number;
}

interface UploadedImage {
  file: File;
  src: string;           // Data URL
  width: number;
  height: number;
}

interface ScalePreset {
  label: string;
  scale: number;
}

interface SnsPreset {
  label: string;
  platform: string;
  width: number;
  height: number;
}

type BatchItemStatus = "pending" | "processing" | "done" | "error";

interface BatchItem {
  id: string;
  file: File;
  src: string;
  width: number;
  height: number;
  status: BatchItemStatus;
  resizedDataUrl: string | null;
  resizedFileSize: number | null;
  error: string | null;
}

interface CustomPreset {
  id: string;
  name: string;
  width: number;
  height: number;
}
```
