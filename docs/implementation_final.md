# 画像リサイズWebアプリ 実装計画書

## 1. 開発方針

### 1.1 基本方針

- **クライアント完結**: すべての画像処理をブラウザ内Canvas APIで実行。API Routeなし
- **Vercel最適化**: 静的コンテンツ中心のデプロイ、Edge配信の恩恵を最大化
- **`"use client"` ベース**: 全ページコンポーネントがクライアントコンポーネント

### 1.2 リポジトリ構成

```
pixelforge/
├── src/
│   ├── app/                          # App Router
│   │   ├── layout.tsx               # ルートレイアウト（ThemeProvider, フォント）
│   │   ├── page.tsx                 # メインリサイズ画面
│   │   ├── batch/
│   │   │   └── page.tsx             # バッチ処理画面
│   │   └── globals.css              # Tailwind ベーススタイル
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx           # ヘッダー（ロゴ, ナビ, テーマ切替, Clear）
│   │   │   └── Footer.tsx           # フッター
│   │   │
│   │   ├── upload/
│   │   │   └── DropZone.tsx         # D&Dアップロードエリア
│   │   │
│   │   ├── resize/
│   │   │   ├── SettingsPanel.tsx     # 設定パネル全体（左カラム）
│   │   │   ├── DimensionInput.tsx   # 幅×高さ入力 + Lock/Unlock
│   │   │   ├── ScalePresets.tsx     # 倍率プリセットボタン群
│   │   │   ├── SnsPresets.tsx       # SNSサイズプリセット
│   │   │   ├── FormatSelect.tsx     # 出力フォーマット選択
│   │   │   ├── QualitySlider.tsx    # 品質スライダー
│   │   │   ├── ResizeModeToggle.tsx # Smooth / Pixel Perfect 切替
│   │   │   └── ResizeButton.tsx     # リサイズ実行ボタン
│   │   │
│   │   ├── preview/
│   │   │   ├── PreviewPanel.tsx     # プレビューパネル全体（右カラム）
│   │   │   ├── ImagePreview.tsx     # 画像プレビュー + チェッカーボード背景
│   │   │   ├── CompareSlider.tsx    # ビフォー/アフター スライダー比較
│   │   │   ├── ImageInfo.tsx        # 画像情報表示
│   │   │   └── DownloadButton.tsx   # ダウンロードボタン
│   │   │
│   │   └── batch/
│   │       ├── BatchUploader.tsx     # 複数画像アップロード
│   │       ├── BatchList.tsx         # 処理リスト
│   │       ├── BatchItem.tsx         # 個別画像の状態表示
│   │       └── BatchDownload.tsx     # ZIP一括ダウンロード
│   │
│   ├── hooks/
│   │   ├── useFileUpload.ts         # ファイル選択 + D&D処理
│   │   ├── useCanvasResize.ts       # Canvas APIリサイズ
│   │   ├── useMultiStepResize.ts    # 多段階リサイズ（4x以上）
│   │   ├── useAspectRatio.ts        # アスペクト比ロック制御
│   │   ├── useDownload.ts           # ダウンロード処理
│   │   ├── useBatchResize.ts        # バッチ処理制御
│   │   └── useImageInfo.ts          # 画像メタデータ取得
│   │
│   ├── lib/
│   │   ├── canvas/
│   │   │   ├── resize.ts           # Canvas リサイズコア関数
│   │   │   ├── multi-step.ts       # 多段階リサイズ関数
│   │   │   └── detect-pixel-art.ts # ピクセルアート検出
│   │   ├── presets.ts               # プリセット定義（倍率 / SNS / 印刷）
│   │   ├── file-utils.ts            # ファイル検証・サイズフォーマット
│   │   ├── canvas-limits.ts         # ブラウザCanvas最大サイズ検出
│   │   └── constants.ts             # 定数
│   │
│   ├── stores/
│   │   ├── resizeStore.ts           # リサイズ設定のZustandストア
│   │   └── batchStore.ts            # バッチ処理のZustandストア
│   │
│   └── types/
│       └── index.ts                 # 型定義
│
├── public/
│   ├── favicon.ico
│   └── manifest.json               # PWA マニフェスト
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── .gitignore
├── vercel.json                      # Vercel設定
└── README.md
```

---

## 2. 開発フェーズ

### Phase 1: MVP — 単一画像リサイズ（2.5週間）

| Sprint | 期間 | 概要 |
|--------|------|------|
| Sprint 1 | Week 1-2 | コア機能実装 |
| Sprint 2 | Week 2.5 | UIポリッシュ + Vercelデプロイ |

#### Sprint 1: コア機能実装（Week 1-2）

| # | タスク | 工数 | 優先度 |
|---|--------|------|--------|
| T-01 | Next.jsプロジェクト初期化（App Router + Tailwind 4 + TypeScript） | 0.5d | 🔴 |
| T-02 | 共通レイアウト（Header, ThemeProvider, next-themes） | 0.5d | 🔴 |
| T-03 | DropZoneコンポーネント（D&D + ファイル選択） | 0.5d | 🔴 |
| T-04 | `useFileUpload` フック（FileReader → Data URL → Image寸法取得） | 0.5d | 🔴 |
| T-05 | DimensionInput + `useAspectRatio` フック | 1d | 🔴 |
| T-06 | FormatSelect（PNG/JPEG/WebP 3ボタン） | 0.25d | 🔴 |
| T-07 | QualitySlider（JPEG/WebP用品質スライダー） | 0.25d | 🔴 |
| T-08 | `canvas/resize.ts` — Canvasリサイズコア関数 | 0.5d | 🔴 |
| T-09 | `useCanvasResize` フック（リサイズ実行 + 状態管理） | 0.5d | 🔴 |
| T-10 | ResizeButton（実行ボタン + Processing状態） | 0.25d | 🔴 |
| T-11 | ImagePreview + チェッカーボード背景 | 0.5d | 🔴 |
| T-12 | DownloadButton + `useDownload` フック | 0.5d | 🔴 |
| T-13 | リセット機能 | 0.25d | 🔴 |
| T-14 | メイン画面の2カラムレイアウト統合 | 0.5d | 🔴 |
| T-15 | AnimatePresence によるステート遷移アニメーション | 0.5d | 🟡 |
| T-16 | ScalePresets（倍率プリセットボタン） | 0.5d | 🟡 |
| T-17 | 多段階リサイズ関数 + `useMultiStepResize` | 1d | 🟡 |
| T-18 | ResizeModeToggle（Smooth / Pixel Perfect） | 0.25d | 🟡 |
| T-19 | Zustandストア（resizeStore） | 0.5d | 🟡 |
| T-20 | ファイルバリデーション（MIME/拡張子/Canvas上限チェック） | 0.5d | 🟡 |

#### Sprint 2: UIポリッシュ + デプロイ（Week 2.5）

| # | タスク | 工数 | 優先度 |
|---|--------|------|--------|
| T-21 | CompareSlider（ビフォー/アフター比較） | 0.5d | 🟡 |
| T-22 | ImageInfo（画像情報パネル: サイズ/ファイルサイズ/倍率） | 0.5d | 🟡 |
| T-23 | SNSプリセット | 0.5d | 🟡 |
| T-24 | ダークモード対応（next-themes + Tailwind dark:） | 0.5d | 🟡 |
| T-25 | レスポンシブ対応（モバイル/タブレット） | 0.5d | 🔴 |
| T-26 | Vercelデプロイ設定 + 初回デプロイ | 0.25d | 🔴 |
| T-27 | OGP / メタデータ設定 | 0.25d | 🟢 |
| T-28 | README作成 | 0.25d | 🟢 |

**Phase 1 完了条件:**
- 1枚の画像をアップロードし、リサイズしてダウンロードできる
- アスペクト比ロック、フォーマット選択、品質設定、倍率プリセットが動作する
- 多段階リサイズ（4x以上）が動作する
- ダークモード対応
- Vercelにデプロイ済み

---

### Phase 2: 機能拡充（2週間）

| Sprint | 期間 | 概要 |
|--------|------|------|
| Sprint 3 | Week 3-4 | バッチ処理 + 多言語 + PWA |

| # | タスク | 工数 | 優先度 |
|---|--------|------|--------|
| T-29 | バッチアップロード画面 | 1d | 🟡 |
| T-30 | `useBatchResize` フック（キュー処理 + 進捗管理） | 1.5d | 🟡 |
| T-31 | BatchList / BatchItem コンポーネント | 1d | 🟡 |
| T-32 | JSZipによるZIP生成・ダウンロード | 0.5d | 🟡 |
| T-33 | Web Worker / OffscreenCanvas対応（大画像の非同期処理） | 1.5d | 🟢 |
| T-34 | カスタムプリセット管理（localStorage CRUD） | 0.5d | 🟢 |
| T-35 | i18n対応（next-intl: 日本語/英語） | 1d | 🟡 |
| T-36 | PWA対応（manifest.json + Service Worker） | 0.5d | 🟢 |
| T-37 | キーボードショートカット | 0.5d | 🟢 |
| T-38 | Canvas最大サイズ検出 + 警告UI | 0.5d | 🟡 |
| T-39 | E2Eテスト（Playwright） | 1d | 🟡 |

---

## 3. 実装詳細

### 3.1 Canvasリサイズコア関数

```typescript
// src/lib/canvas/resize.ts

export type ImageFormat = "image/jpeg" | "image/png" | "image/webp";

export interface ResizeOptions {
  imageSrc: string;
  targetWidth: number;
  targetHeight: number;
  format: ImageFormat;
  quality: number;         // 0.0 - 1.0
  smoothing: boolean;      // false = ピクセルアートモード
}

export interface ResizeResult {
  dataUrl: string;
  width: number;
  height: number;
  blob: Blob;
  fileSize: number;
}

/**
 * Canvas API による画像リサイズ
 */
export function resizeImage(options: ResizeOptions): Promise<ResizeResult> {
  const { imageSrc, targetWidth, targetHeight, format, quality, smoothing } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas 2D context"));
        return;
      }

      // 高品質スムージング設定
      ctx.imageSmoothingEnabled = smoothing;
      if (smoothing) {
        ctx.imageSmoothingQuality = "high";
      }

      // drawImage でリサイズ描画
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Data URL 取得
      const dataUrl = canvas.toDataURL(format, quality);

      // Blob も取得（ファイルサイズ表示用）
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to create blob"));
            return;
          }
          resolve({
            dataUrl,
            width: targetWidth,
            height: targetHeight,
            blob,
            fileSize: blob.size,
          });
        },
        format,
        quality
      );
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageSrc;
  });
}
```

### 3.2 多段階リサイズ

```typescript
// src/lib/canvas/multi-step.ts

import { type ImageFormat } from "./resize";

const STEP_FACTOR = 2;
const MULTI_STEP_THRESHOLD = 4;

/**
 * 4x以上の拡大時に段階的にCanvas描画を繰り返し品質を向上
 */
export function multiStepResize(options: {
  imageSrc: string;
  originalWidth: number;
  originalHeight: number;
  targetWidth: number;
  targetHeight: number;
  format: ImageFormat;
  quality: number;
  smoothing?: boolean;
  onProgress?: (step: number, totalSteps: number) => void;
}): Promise<string> {
  const {
    imageSrc, originalWidth, originalHeight,
    targetWidth, targetHeight,
    format, quality, smoothing = true, onProgress,
  } = options;

  const scale = Math.max(targetWidth / originalWidth, targetHeight / originalHeight);

  // 閾値以下なら通常の1ステップリサイズ
  if (scale <= MULTI_STEP_THRESHOLD) {
    return singleStepResize(imageSrc, targetWidth, targetHeight, format, quality, smoothing);
  }

  // ステップ数を計算
  const totalSteps = Math.ceil(Math.log(scale) / Math.log(STEP_FACTOR));

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let currentCanvas = imageToCanvas(img);
      let currentWidth = originalWidth;
      let currentHeight = originalHeight;

      for (let step = 0; step < totalSteps; step++) {
        const isLastStep = step === totalSteps - 1;
        const nextWidth = isLastStep
          ? targetWidth
          : Math.min(currentWidth * STEP_FACTOR, targetWidth);
        const nextHeight = isLastStep
          ? targetHeight
          : Math.min(currentHeight * STEP_FACTOR, targetHeight);

        const nextCanvas = document.createElement("canvas");
        nextCanvas.width = nextWidth;
        nextCanvas.height = nextHeight;
        const ctx = nextCanvas.getContext("2d")!;

        ctx.imageSmoothingEnabled = smoothing;
        if (smoothing) ctx.imageSmoothingQuality = "high";

        ctx.drawImage(currentCanvas, 0, 0, nextWidth, nextHeight);

        currentCanvas = nextCanvas;
        currentWidth = nextWidth;
        currentHeight = nextHeight;

        onProgress?.(step + 1, totalSteps);
      }

      resolve(currentCanvas.toDataURL(format, quality));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageSrc;
  });
}

function imageToCanvas(img: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  return canvas;
}

function singleStepResize(
  imageSrc: string, w: number, h: number,
  format: ImageFormat, quality: number, smoothing: boolean
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = smoothing;
      if (smoothing) ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL(format, quality));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageSrc;
  });
}
```

### 3.3 アスペクト比ロックフック

```typescript
// src/hooks/useAspectRatio.ts

"use client";
import { useState, useCallback } from "react";

export function useAspectRatio(initialWidth: number, initialHeight: number) {
  const [isLocked, setIsLocked] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(initialWidth / initialHeight);
  const [width, setWidthState] = useState<number | "">(initialWidth);
  const [height, setHeightState] = useState<number | "">(initialHeight);

  // 幅変更 — ロック時に高さを自動計算
  const setWidth = useCallback((val: number | "") => {
    setWidthState(val);
    if (typeof val === "number" && isLocked) {
      setHeightState(Math.round(val / aspectRatio));
    }
  }, [isLocked, aspectRatio]);

  // 高さ変更 — ロック時に幅を自動計算
  const setHeight = useCallback((val: number | "") => {
    setHeightState(val);
    if (typeof val === "number" && isLocked) {
      setWidthState(Math.round(val * aspectRatio));
    }
  }, [isLocked, aspectRatio]);

  // ロック/アンロック切替
  const toggleLock = useCallback(() => {
    setIsLocked((prev) => {
      if (!prev) {
        // unlocked → locked: 現在の値からアスペクト比を再計算
        const w = typeof width === "number" ? width : 0;
        const h = typeof height === "number" ? height : 0;
        if (h !== 0) setAspectRatio(w / h);
      }
      return !prev;
    });
  }, [width, height]);

  // 倍率プリセット適用
  const applyScale = useCallback((scale: number) => {
    const newW = Math.round(initialWidth * scale);
    const newH = Math.round(initialHeight * scale);
    setWidthState(newW);
    setHeightState(newH);
    setAspectRatio(initialWidth / initialHeight);
  }, [initialWidth, initialHeight]);

  // SNSプリセット適用
  const applyPreset = useCallback((presetW: number, presetH: number) => {
    setWidthState(presetW);
    setHeightState(presetH);
    if (isLocked) {
      setAspectRatio(presetW / presetH);
    }
  }, [isLocked]);

  // 初期化（新しい画像がロードされた時）
  const reset = useCallback((newWidth: number, newHeight: number) => {
    setWidthState(newWidth);
    setHeightState(newHeight);
    setAspectRatio(newWidth / newHeight);
    setIsLocked(true);
  }, []);

  return {
    width, height, isLocked,
    setWidth, setHeight, toggleLock,
    applyScale, applyPreset, reset,
  };
}
```

### 3.4 ダウンロードフック

```typescript
// src/hooks/useDownload.ts

"use client";
import { useCallback } from "react";

export function useDownload() {
  const download = useCallback((params: {
    dataUrl: string;
    originalFileName: string;
    width: number;
    height: number;
    format: "image/jpeg" | "image/png" | "image/webp";
  }) => {
    const { dataUrl, originalFileName, width, height, format } = params;

    const link = document.createElement("a");
    link.href = dataUrl;

    // ファイル名生成
    const extension = format === "image/jpeg" ? "jpg"
                    : format === "image/png" ? "png"
                    : "webp";
    const baseName = originalFileName.substring(
      0, originalFileName.lastIndexOf(".")
    ) || "image";
    link.download = `${baseName}_${width}x${height}.${extension}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return { download };
}
```

### 3.5 ファイルアップロードフック

```typescript
// src/hooks/useFileUpload.ts

"use client";
import { useState, useRef, useCallback } from "react";
import type { ChangeEvent, DragEvent } from "react";

export interface UploadedImage {
  file: File;
  src: string;      // Data URL
  width: number;
  height: number;
}

export function useFileUpload() {
  const [image, setImage] = useState<UploadedImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ファイル処理
  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("画像ファイルをアップロードしてください。");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;

      const img = new Image();
      img.onload = () => {
        setImage({
          file,
          src,
          width: img.width,
          height: img.height,
        });
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  }, []);

  // ファイル選択ダイアログからの入力
  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  // ドラッグ&ドロップ
  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  // リセット
  const reset = useCallback(() => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return {
    image, fileInputRef,
    handleFileChange, handleDrop, handleDragOver,
    reset, openFileDialog,
  };
}
```

### 3.6 Zustandストア

```typescript
// src/stores/resizeStore.ts

import { create } from "zustand";
import type { ImageFormat } from "@/lib/canvas/resize";

interface ResizeState {
  // 出力設定
  format: ImageFormat;
  quality: number;
  smoothing: boolean;   // true = Smooth, false = Pixel Perfect

  // 処理状態
  isProcessing: boolean;
  resizedDataUrl: string | null;
  resizedFileSize: number | null;

  // アクション
  setFormat: (format: ImageFormat) => void;
  setQuality: (quality: number) => void;
  setSmoothing: (smoothing: boolean) => void;
  setProcessing: (isProcessing: boolean) => void;
  setResult: (dataUrl: string, fileSize: number) => void;
  clearResult: () => void;
  resetAll: () => void;
}

export const useResizeStore = create<ResizeState>((set) => ({
  format: "image/png",
  quality: 0.9,
  smoothing: true,
  isProcessing: false,
  resizedDataUrl: null,
  resizedFileSize: null,

  setFormat: (format) => {
    const quality = format === "image/png" ? 1 : 0.9;
    set({ format, quality, resizedDataUrl: null, resizedFileSize: null });
  },
  setQuality: (quality) => set({ quality }),
  setSmoothing: (smoothing) => set({ smoothing }),
  setProcessing: (isProcessing) => set({ isProcessing }),
  setResult: (dataUrl, fileSize) => set({
    resizedDataUrl: dataUrl,
    resizedFileSize: fileSize,
    isProcessing: false,
  }),
  clearResult: () => set({ resizedDataUrl: null, resizedFileSize: null }),
  resetAll: () => set({
    format: "image/png",
    quality: 0.9,
    smoothing: true,
    isProcessing: false,
    resizedDataUrl: null,
    resizedFileSize: null,
  }),
}));
```

### 3.7 プリセット定義

```typescript
// src/lib/presets.ts

export interface ScalePreset {
  label: string;
  scale: number;
}

export const SCALE_PRESETS: ScalePreset[] = [
  { label: "0.25x", scale: 0.25 },
  { label: "0.5x",  scale: 0.5  },
  { label: "0.75x", scale: 0.75 },
  { label: "1.5x",  scale: 1.5  },
  { label: "2x",    scale: 2    },
  { label: "3x",    scale: 3    },
  { label: "4x",    scale: 4    },
];

export interface SnsPreset {
  label: string;
  platform: string;
  width: number;
  height: number;
}

export const SNS_PRESETS: SnsPreset[] = [
  { label: "投稿",        platform: "Instagram", width: 1080, height: 1080 },
  { label: "ストーリー",   platform: "Instagram", width: 1080, height: 1920 },
  { label: "投稿",        platform: "X/Twitter", width: 1200, height: 675  },
  { label: "ヘッダー",     platform: "X/Twitter", width: 1500, height: 500  },
  { label: "カバー",       platform: "Facebook",  width: 820,  height: 312  },
  { label: "サムネイル",    platform: "YouTube",   width: 1280, height: 720  },
  { label: "OGP",         platform: "Web",       width: 1200, height: 630  },
];
```

---

## 4. Vercel デプロイ設定

### 4.1 next.config.ts

```typescript
// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // 画像最適化は不要（全処理クライアントサイド）
  images: {
    unoptimized: true,
  },

  // セキュリティヘッダー
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    },
  ],
};

export default nextConfig;
```

### 4.2 vercel.json

```json
{
  "framework": "nextjs",
  "regions": ["hnd1"]
}
```

- `hnd1` = 東京リージョン（日本ユーザー向け最適化）

### 4.3 デプロイ手順

```bash
# 1. Vercel CLIインストール
npm i -g vercel

# 2. プロジェクトリンク
vercel link

# 3. デプロイ（プレビュー）
vercel

# 4. 本番デプロイ
vercel --prod

# または GitHub連携で main ブランチ push 時に自動デプロイ
```

---

## 5. テスト戦略

### 5.1 テスト構成

| レベル | ツール | 対象 |
|--------|--------|------|
| ユニットテスト | Vitest | Canvas関数, フック, ユーティリティ |
| コンポーネントテスト | Vitest + Testing Library | UIコンポーネント |
| E2Eテスト | Playwright | ユーザーフロー全体（Phase 2） |

### 5.2 重点テストケース

```typescript
// Canvas リサイズ関数のテスト
describe("resizeImage", () => {
  it("指定サイズにリサイズされる");
  it("JPEG品質パラメータが反映される");
  it("ピクセルアートモードでsmoothing無効");
  it("不正なData URLでエラー");
});

// 多段階リサイズのテスト
describe("multiStepResize", () => {
  it("4x以下は1ステップで処理");
  it("8xは3ステップで処理 (2→4→8)");
  it("進捗コールバックが正しく呼ばれる");
  it("最終サイズが目標と一致する");
});

// アスペクト比フックのテスト
describe("useAspectRatio", () => {
  it("ロック時に幅変更で高さが自動計算される");
  it("ロック時に高さ変更で幅が自動計算される");
  it("アンロック時は独立して変更可能");
  it("再ロック時にアスペクト比が再計算される");
  it("倍率プリセット適用で正しいサイズになる");
});

// ダウンロードフックのテスト
describe("useDownload", () => {
  it("ファイル名が {元名}_{W}x{H}.{ext} 形式");
  it("JPEG拡張子が .jpg になる");
});
```

---

## 6. スケジュールサマリー

```
Week 1-2    [Sprint 1] ████████████████ コア機能実装
Week 2.5    [Sprint 2] ████████         UIポリッシュ + Vercelデプロイ
                        ──── Phase 1 MVP リリース（Vercel公開） ────
Week 3-4    [Sprint 3] ████████████████ バッチ処理 + i18n + PWA
                        ──── Phase 2 機能拡充リリース ────
```

**合計見積もり: 約4.5週間（1名フルタイム想定）**

---

## 7. リスクと対策

| リスク | 影響度 | 対策 |
|--------|--------|------|
| Canvas最大サイズのブラウザ制限 | 中 | 起動時にテストCanvasで最大サイズを検出し、超過時は警告表示。`canvas-limits.ts` で実装 |
| 大画像処理時のメインスレッドブロック | 中 | Phase 2 で OffscreenCanvas + Web Worker による非同期処理を導入 |
| モバイルブラウザのメモリ制限 | 中 | モバイル判定時に入力画像サイズ上限を引き下げ（推奨: 4096×4096以下） |
| `canvas.toDataURL()` でWebP非対応ブラウザ | 低 | WebP対応チェック関数を用意し、非対応時はPNG/JPEGにフォールバック |
| Vercel無料プランの帯域制限 | 低 | 静的サイトに近い構成のため帯域消費は極小。画像はクライアント内で処理し配信しない |
