# PixelForge テスト設計書

## 改訂履歴

| バージョン | 日付 | 内容 |
|---|---|---|
| 1.0 | 2026-03-22 | 初版作成 |

---

## 1. テスト戦略概要

### 1.1 現状分析

現在のプロジェクトにはテストフレームワークが一切導入されていない。`package.json` の `devDependencies` にはテスト関連パッケージが存在せず、`scripts` にも `test` コマンドが定義されていない。

### 1.2 推奨テストスタック

| レイヤー | ツール | 用途 |
|---|---|---|
| ユニットテスト | **Vitest** | 純粋関数・ユーティリティ・Zustandストアのテスト |
| コンポーネントテスト | **@testing-library/react** + **jsdom** | Reactコンポーネント・カスタムフックのテスト |
| E2Eテスト | **Playwright** | ブラウザ上のユーザーフロー全体のテスト |
| カバレッジ | **@vitest/coverage-v8** | カバレッジレポート生成 |

### 1.3 テスト方針

- **ピラミッド型**: ユニットテストを最も多く、E2Eテストは主要フローに絞る
- **jsdom環境**: Canvas API のモックが必要な箇所では `jsdom` + カスタムモックを使用
- **ストアテスト**: Zustand ストアは React コンポーネント外で直接 `getState()` / `setState()` を呼び出してテスト
- **CI統合**: GitHub Actions で `vitest run --coverage` と `playwright test` を実行

---

## 2. テスト環境構成

### 2.1 追加する devDependencies

```json
{
  "devDependencies": {
    "vitest": "^3.0.0",
    "@vitest/coverage-v8": "^3.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "jsdom": "^25.0.0",
    "@playwright/test": "^1.50.0"
  }
}
```

### 2.2 vitest.config.ts

```typescript
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: ["src/**/*.d.ts", "src/app/layout.tsx"],
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
```

### 2.3 tests/setup.ts

```typescript
import "@testing-library/jest-dom/vitest";

// Canvas API モック
HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
  drawImage: vi.fn(),
  fillRect: vi.fn(),
  getImageData: vi.fn().mockReturnValue({ data: new Uint8ClampedArray([0, 0, 0, 255]) }),
  imageSmoothingEnabled: true,
  imageSmoothingQuality: "high",
});

HTMLCanvasElement.prototype.toDataURL = vi.fn().mockReturnValue("data:image/png;base64,mock");
HTMLCanvasElement.prototype.toBlob = vi.fn().mockImplementation(function (cb) {
  cb(new Blob(["mock"], { type: "image/png" }));
});
```

### 2.4 Playwright 設定 (playwright.config.ts)

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30000,
  use: {
    baseURL: "http://localhost:3000",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run dev",
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
```

### 2.5 テストディレクトリ構成

```
pixelforge/
├── tests/
│   ├── setup.ts
│   ├── unit/
│   │   ├── canvas/
│   │   │   ├── resize.test.ts
│   │   │   └── multi-step.test.ts
│   │   ├── file-utils.test.ts
│   │   └── canvas-limits.test.ts
│   ├── hooks/
│   │   ├── useAspectRatio.test.ts
│   │   ├── useFileUpload.test.tsx
│   │   └── useCustomPresets.test.ts
│   ├── stores/
│   │   ├── resizeStore.test.ts
│   │   └── batchStore.test.ts
│   └── components/
│       ├── DropZone.test.tsx
│       ├── DimensionInput.test.tsx
│       ├── FormatSelect.test.tsx
│       ├── QualitySlider.test.tsx
│       └── ResizeButton.test.tsx
├── e2e/
│   ├── single-resize.spec.ts
│   ├── batch-resize.spec.ts
│   ├── dark-mode.spec.ts
│   ├── presets.spec.ts
│   └── keyboard-shortcuts.spec.ts
```

### 2.6 package.json scripts 追加

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

---

## 3. ユニットテスト設計

### 3.1 canvas/resize.ts

対象関数: `resizeImage(options: ResizeOptions): Promise<ResizeResult>`

| テストID | テスト名 | 入力 | 期待結果 | 優先度 |
|---|---|---|---|---|
| UT-RSZ-001 | 指定した幅・高さでリサイズされる | `{ targetWidth: 200, targetHeight: 100, format: "image/png", quality: 1, smoothing: true, imageSrc: "data:..." }` | `result.width === 200 && result.height === 100` | High |
| UT-RSZ-002 | JPEG形式で出力される | `{ format: "image/jpeg", quality: 0.8, ... }` | `canvas.toDataURL` が `"image/jpeg"` と `0.8` で呼ばれる | High |
| UT-RSZ-003 | WebP形式で出力される | `{ format: "image/webp", quality: 0.9, ... }` | `canvas.toDataURL` が `"image/webp"` と `0.9` で呼ばれる | High |
| UT-RSZ-004 | PNG形式 (quality=1) で出力される | `{ format: "image/png", quality: 1, ... }` | `canvas.toDataURL` が `"image/png"` と `1` で呼ばれる | High |
| UT-RSZ-005 | smoothing有効時にimageSmoothingQualityがhighになる | `{ smoothing: true, ... }` | `ctx.imageSmoothingEnabled === true && ctx.imageSmoothingQuality === "high"` | Medium |
| UT-RSZ-006 | smoothing無効時にimageSmoothingEnabledがfalseになる | `{ smoothing: false, ... }` | `ctx.imageSmoothingEnabled === false` | Medium |
| UT-RSZ-007 | Canvas 2Dコンテキスト取得失敗時にエラーを返す | `getContext` が `null` を返すモック | `reject("Failed to get canvas 2D context")` | High |
| UT-RSZ-008 | Blob生成失敗時にエラーを返す | `toBlob` が `null` を返すモック | `reject("Failed to create blob")` | High |
| UT-RSZ-009 | 画像読み込み失敗時にエラーを返す | 不正な `imageSrc` | `reject("Failed to load image")` | High |
| UT-RSZ-010 | 結果にdataUrl, blob, fileSizeが含まれる | 正常な入力 | `result.dataUrl` が文字列、`result.blob` が Blob インスタンス、`result.fileSize` が正の数 | High |

### 3.2 canvas/multi-step.ts

対象関数: `multiStepResize(options): Promise<string>`

定数: `STEP_FACTOR = 2`, `MULTI_STEP_THRESHOLD = 4`

| テストID | テスト名 | 入力 | 期待結果 | 優先度 |
|---|---|---|---|---|
| UT-MSR-001 | スケール4倍以下で単一ステップリサイズになる | `originalWidth: 100, originalHeight: 100, targetWidth: 400, targetHeight: 400` (scale=4) | `singleStepResize` が呼ばれ、段階処理は行われない | High |
| UT-MSR-002 | スケール2倍で単一ステップリサイズになる | `originalWidth: 100, originalHeight: 100, targetWidth: 200, targetHeight: 200` (scale=2) | 単一ステップで処理される | High |
| UT-MSR-003 | スケール4倍超で多段ステップリサイズになる | `originalWidth: 100, originalHeight: 100, targetWidth: 500, targetHeight: 500` (scale=5) | 多段ステップで処理される。`totalSteps = Math.ceil(Math.log(5) / Math.log(2)) = 3` | High |
| UT-MSR-004 | スケール8倍のステップ数が正しい | `originalWidth: 100, originalHeight: 100, targetWidth: 800, targetHeight: 800` (scale=8) | `totalSteps = Math.ceil(Math.log(8) / Math.log(2)) = 3` | High |
| UT-MSR-005 | スケール16倍のステップ数が正しい | `originalWidth: 100, originalHeight: 100, targetWidth: 1600, targetHeight: 1600` (scale=16) | `totalSteps = Math.ceil(Math.log(16) / Math.log(2)) = 4` | Medium |
| UT-MSR-006 | onProgressコールバックがステップごとに呼ばれる | scale=8 (3ステップ) + `onProgress` スパイ | `onProgress` が `(1,3)`, `(2,3)`, `(3,3)` の順で呼ばれる | High |
| UT-MSR-007 | onProgressが未指定でもエラーにならない | `onProgress: undefined` | 正常に完了する | Medium |
| UT-MSR-008 | smoothingデフォルトがtrueである | `smoothing` 省略 | `ctx.imageSmoothingEnabled === true` | Low |
| UT-MSR-009 | 画像読み込み失敗時にエラーを返す | 不正な `imageSrc` | `reject("Failed to load image")` | High |
| UT-MSR-010 | 幅と高さで異なるスケール比の場合、大きい方が基準になる | `originalWidth: 100, originalHeight: 200, targetWidth: 500, targetHeight: 400` (scaleW=5, scaleH=2, max=5) | `scale = 5`、多段ステップ処理になる | Medium |

### 3.3 file-utils.ts

#### isValidImageType

| テストID | テスト名 | 入力 | 期待結果 | 優先度 |
|---|---|---|---|---|
| UT-FU-001 | JPEG画像を有効と判定する | `File` (type: `"image/jpeg"`) | `true` | High |
| UT-FU-002 | PNG画像を有効と判定する | `File` (type: `"image/png"`) | `true` | High |
| UT-FU-003 | WebP画像を有効と判定する | `File` (type: `"image/webp"`) | `true` | High |
| UT-FU-004 | BMP画像を有効と判定する | `File` (type: `"image/bmp"`) | `true` | Medium |
| UT-FU-005 | GIF画像を有効と判定する | `File` (type: `"image/gif"`) | `true` | Medium |
| UT-FU-006 | SVG画像を有効と判定する | `File` (type: `"image/svg+xml"`) | `true` | Medium |
| UT-FU-007 | PDF ファイルを無効と判定する | `File` (type: `"application/pdf"`) | `false` | High |
| UT-FU-008 | テキストファイルを無効と判定する | `File` (type: `"text/plain"`) | `false` | High |
| UT-FU-009 | 空のMIMEタイプを無効と判定する | `File` (type: `""`) | `false` | Medium |
| UT-FU-010 | video/mp4を無効と判定する | `File` (type: `"video/mp4"`) | `false` | Low |

#### formatFileSize

| テストID | テスト名 | 入力 | 期待結果 | 優先度 |
|---|---|---|---|---|
| UT-FU-011 | 0バイトを正しく表示する | `0` | `"0 B"` | High |
| UT-FU-012 | 512バイトをB単位で表示する | `512` | `"512 B"` | High |
| UT-FU-013 | 1023バイトをB単位で表示する | `1023` | `"1023 B"` | Medium |
| UT-FU-014 | 1024バイトをKB単位で表示する | `1024` | `"1.0 KB"` | High |
| UT-FU-015 | 1536バイトをKB単位で表示する | `1536` | `"1.5 KB"` | Medium |
| UT-FU-016 | 1048576バイトをMB単位で表示する | `1048576` | `"1.0 MB"` | High |
| UT-FU-017 | 2621440バイトをMB単位で表示する | `2621440` | `"2.5 MB"` | Medium |
| UT-FU-018 | 1048575バイト (1MB未満) をKB単位で表示する | `1048575` | `"1024.0 KB"` | Low |

#### getExtensionFromFormat

| テストID | テスト名 | 入力 | 期待結果 | 優先度 |
|---|---|---|---|---|
| UT-FU-019 | image/jpegからjpgを返す | `"image/jpeg"` | `"jpg"` | High |
| UT-FU-020 | image/pngからpngを返す | `"image/png"` | `"png"` | High |
| UT-FU-021 | image/webpからwebpを返す | `"image/webp"` | `"webp"` | High |

#### getDefaultFormat

| テストID | テスト名 | 入力 | 期待結果 | 優先度 |
|---|---|---|---|---|
| UT-FU-022 | JPEGファイルからimage/jpegを返す | `File` (type: `"image/jpeg"`) | `"image/jpeg"` | High |
| UT-FU-023 | WebPファイルからimage/webpを返す | `File` (type: `"image/webp"`) | `"image/webp"` | High |
| UT-FU-024 | PNGファイルからimage/pngを返す | `File` (type: `"image/png"`) | `"image/png"` | High |
| UT-FU-025 | BMPファイルからimage/png (デフォルト) を返す | `File` (type: `"image/bmp"`) | `"image/png"` | Medium |
| UT-FU-026 | GIFファイルからimage/png (デフォルト) を返す | `File` (type: `"image/gif"`) | `"image/png"` | Medium |

#### generateFileName

| テストID | テスト名 | 入力 | 期待結果 | 優先度 |
|---|---|---|---|---|
| UT-FU-027 | JPEG形式でファイル名が生成される | `"photo.png", 800, 600, "image/jpeg"` | `"photo_800x600.jpg"` | High |
| UT-FU-028 | PNG形式でファイル名が生成される | `"image.jpg", 1920, 1080, "image/png"` | `"image_1920x1080.png"` | High |
| UT-FU-029 | WebP形式でファイル名が生成される | `"pic.bmp", 500, 500, "image/webp"` | `"pic_500x500.webp"` | High |
| UT-FU-030 | 拡張子なしのファイル名で"image"がベース名になる | `"noext", 100, 100, "image/png"` | `"image_100x100.png"` | Medium |
| UT-FU-031 | 複数ドットのファイル名を正しく処理する | `"my.photo.file.png", 640, 480, "image/jpeg"` | `"my.photo.file_640x480.jpg"` | Medium |

### 3.4 canvas-limits.ts

| テストID | テスト名 | 入力 | 期待結果 | 優先度 |
|---|---|---|---|---|
| UT-CL-001 | サポートされる最大Canvasサイズを返す | Canvas APIが16384をサポートするモック | `getCanvasMaxSize() === 16384` | High |
| UT-CL-002 | 2回目の呼び出しでキャッシュ値を返す | 1回目呼び出し後に再度呼び出し | Canvas生成が1回のみ（キャッシュ使用） | High |
| UT-CL-003 | 16384不可時に11180にフォールバックする | 16384で`getImageData`がゼロを返すモック | `getCanvasMaxSize() === 11180` | Medium |
| UT-CL-004 | すべてのサイズが不可時に4096にフォールバックする | すべてのCanvas作成で例外発生 | `getCanvasMaxSize() === 4096` | High |
| UT-CL-005 | checkCanvasLimitsで有効なサイズを判定する | `width: 1000, height: 1000` (maxSize: 4096) | `{ valid: true }` | High |
| UT-CL-006 | checkCanvasLimitsで幅超過を検出する | `width: 20000, height: 1000` (maxSize: 16384) | `{ valid: false, message: "...16384×16384..." }` | High |
| UT-CL-007 | checkCanvasLimitsで高さ超過を検出する | `width: 1000, height: 20000` (maxSize: 16384) | `{ valid: false, message: "...16384×16384..." }` | High |
| UT-CL-008 | 境界値：maxSizeちょうどのサイズは有効 | `width: 16384, height: 16384` (maxSize: 16384) | `{ valid: true }` | Medium |
| UT-CL-009 | 境界値：maxSize+1のサイズは無効 | `width: 16385, height: 100` (maxSize: 16384) | `{ valid: false }` | Medium |

---

## 4. フック テスト設計

### 4.1 useAspectRatio

テスト方法: `renderHook` を使用し、`result.current` で状態と操作関数にアクセスする。

| テストID | テスト名 | 操作手順 | 期待結果 | 優先度 |
|---|---|---|---|---|
| HK-AR-001 | 初期値が正しく設定される | `renderHook(() => useAspectRatio(1920, 1080))` | `width === 1920, height === 1080, isLocked === true` | High |
| HK-AR-002 | ロック時に幅変更で高さが自動計算される | 初期値 `(1920, 1080)` → `setWidth(960)` | `width === 960, height === 540` (960 / (1920/1080) = 540) | High |
| HK-AR-003 | ロック時に高さ変更で幅が自動計算される | 初期値 `(1920, 1080)` → `setHeight(540)` | `width === 960, height === 540` (540 * (1920/1080) ≈ 960) | High |
| HK-AR-004 | ロック解除時に幅変更で高さが変わらない | `toggleLock()` → `setWidth(500)` | `width === 500, height === 1080` | High |
| HK-AR-005 | ロック解除時に高さ変更で幅が変わらない | `toggleLock()` → `setHeight(500)` | `width === 1920, height === 500` | High |
| HK-AR-006 | ロック解除→再ロックでアスペクト比が再計算される | `toggleLock()` → `setWidth(500)` → `setHeight(500)` → `toggleLock()` | `isLocked === true`, アスペクト比が `500/500 = 1.0` に更新 | High |
| HK-AR-007 | applyScaleで正しくスケーリングされる | 初期値 `(1000, 500)` → `applyScale(0.5)` | `width === 500, height === 250` | High |
| HK-AR-008 | applyScale(2)で2倍になる | 初期値 `(800, 600)` → `applyScale(2)` | `width === 1600, height === 1200` | Medium |
| HK-AR-009 | applyPresetで指定サイズが適用される | `applyPreset(1080, 1080)` | `width === 1080, height === 1080` | High |
| HK-AR-010 | applyPreset時にロック状態ならアスペクト比が更新される | ロック状態で `applyPreset(1080, 1920)` | `aspectRatio === 1080/1920` (次の `setWidth` で反映確認) | Medium |
| HK-AR-011 | resetで初期状態に戻る | 各種変更後 → `reset(3000, 2000)` | `width === 3000, height === 2000, isLocked === true` | High |
| HK-AR-012 | 空文字を幅に設定できる | `setWidth("")` | `width === ""` (入力クリア用) | Medium |
| HK-AR-013 | 空文字を高さに設定できる | `setHeight("")` | `height === ""` | Medium |

### 4.2 useCustomPresets

テスト方法: `renderHook` + `localStorage` モック

| テストID | テスト名 | 操作手順 | 期待結果 | 優先度 |
|---|---|---|---|---|
| HK-CP-001 | 初期状態でプリセットが空配列 | `renderHook` (localStorage空) | `presets === []` | High |
| HK-CP-002 | プリセットを追加できる | `addPreset("SNSアイコン", 400, 400)` | `presets.length === 1`, `presets[0].name === "SNSアイコン"`, `width === 400`, `height === 400` | High |
| HK-CP-003 | 複数プリセットを追加できる | `addPreset` を3回実行 | `presets.length === 3` | Medium |
| HK-CP-004 | プリセットを削除できる | 追加後 → `removePreset(id)` | `presets.length === 0` | High |
| HK-CP-005 | 存在しないIDの削除はエラーにならない | `removePreset("nonexistent")` | `presets` が変化しない | Medium |
| HK-CP-006 | 追加時にlocalStorageに保存される | `addPreset("Test", 100, 100)` | `localStorage.getItem("pixelforge-custom-presets")` に保存されたJSON確認 | High |
| HK-CP-007 | 削除時にlocalStorageが更新される | 追加→削除 | `localStorage` の値が `[]` に更新 | High |
| HK-CP-008 | localStorageから既存データを読み込む | 事前に `localStorage.setItem` でデータ設定 | `presets` にデータが反映される | High |
| HK-CP-009 | localStorageに不正JSONがある場合は空配列になる | `localStorage.setItem("pixelforge-custom-presets", "invalid")` | `presets === []` | Medium |
| HK-CP-010 | プリセットのIDがユニークである | `addPreset` を2回実行 | `presets[0].id !== presets[1].id` | Medium |

### 4.3 useFileUpload

テスト方法: `renderHook` + `File` / `FileReader` モック

| テストID | テスト名 | 操作手順 | 期待結果 | 優先度 |
|---|---|---|---|---|
| HK-FU-001 | 初期状態でimageがnull | `renderHook` | `image === null` | High |
| HK-FU-002 | 有効なJPEGファイルをアップロードできる | `handleFileChange` にJPEGの `File` を渡す | `image` にファイル情報が設定される | High |
| HK-FU-003 | 無効なファイル形式でアラートが表示される | `processFile` に `File` (type: `"application/pdf"`) を渡す | `alert` が呼ばれ、`image` は `null` のまま | High |
| HK-FU-004 | ドロップイベントでファイルを処理できる | `handleDrop` に `DragEvent` モックを渡す | ファイルが処理される | High |
| HK-FU-005 | handleDragOverでdefaultが防止される | `handleDragOver` を呼び出す | `e.preventDefault()` が呼ばれる | Medium |
| HK-FU-006 | resetでimageがnullに戻る | アップロード後 → `reset()` | `image === null` | High |
| HK-FU-007 | openFileDialogでinputのclickが呼ばれる | `openFileDialog()` | `fileInputRef.current.click()` が呼ばれる | Medium |

---

## 5. ストア テスト設計

### 5.1 resizeStore

テスト方法: `useResizeStore.getState()` と `useResizeStore.setState()` を直接使用。各テスト前に `resetAll()` を呼び出す。

| テストID | テスト名 | 操作手順 | 期待結果 | 優先度 |
|---|---|---|---|---|
| ST-RS-001 | 初期状態が正しい | `getState()` | `format === "image/png", quality === 0.9, smoothing === true, isProcessing === false, resizedDataUrl === null, resizedFileSize === null` | High |
| ST-RS-002 | JPEGに変更するとqualityが0.9になる | `setFormat("image/jpeg")` | `format === "image/jpeg", quality === 0.9` | High |
| ST-RS-003 | PNGに変更するとqualityが1になる | `setFormat("image/jpeg")` → `setFormat("image/png")` | `format === "image/png", quality === 1` | High |
| ST-RS-004 | WebPに変更するとqualityが0.9になる | `setFormat("image/webp")` | `format === "image/webp", quality === 0.9` | High |
| ST-RS-005 | format変更でresultがクリアされる | `setResult("url", 1000)` → `setFormat("image/jpeg")` | `resizedDataUrl === null, resizedFileSize === null` | High |
| ST-RS-006 | qualityを直接設定できる | `setQuality(0.5)` | `quality === 0.5` | High |
| ST-RS-007 | smoothingを切り替えられる | `setSmoothing(false)` | `smoothing === false` | Medium |
| ST-RS-008 | setResultでデータとサイズが設定される | `setResult("data:image/png;base64,...", 5000)` | `resizedDataUrl === "data:image/png;base64,..."`, `resizedFileSize === 5000`, `isProcessing === false` | High |
| ST-RS-009 | setResultでisProcessingがfalseになる | `setProcessing(true)` → `setResult("url", 100)` | `isProcessing === false` | High |
| ST-RS-010 | clearResultでresultがクリアされる | `setResult("url", 100)` → `clearResult()` | `resizedDataUrl === null, resizedFileSize === null` | High |
| ST-RS-011 | resetAllで全状態が初期化される | 各種変更後 → `resetAll()` | すべてのフィールドが初期値に戻る | High |
| ST-RS-012 | setProcessingで処理中フラグを設定できる | `setProcessing(true)` | `isProcessing === true` | Medium |

### 5.2 batchStore

テスト方法: `useBatchStore.getState()` と `useBatchStore.setState()` を直接使用。

| テストID | テスト名 | 操作手順 | 期待結果 | 優先度 |
|---|---|---|---|---|
| ST-BS-001 | 初期状態が正しい | `getState()` | `items === [], resizeMode === "scale", commonFormat === "image/png", commonQuality === 0.9, commonScale === 1` | High |
| ST-BS-002 | addItemsでアイテムが追加される | `addItems([{ id: "1", file, src, width: 800, height: 600 }])` | `items.length === 1`, `items[0].status === "pending"`, `items[0].resizedDataUrl === null` | High |
| ST-BS-003 | addItemsで複数アイテムが一括追加される | `addItems([item1, item2, item3])` | `items.length === 3`, すべて `status === "pending"` | High |
| ST-BS-004 | addItemsで既存アイテムに追記される | `addItems([item1])` → `addItems([item2])` | `items.length === 2` | Medium |
| ST-BS-005 | removeItemで指定アイテムが削除される | 3アイテム追加後 → `removeItem("2")` | `items.length === 2`, id "2" が存在しない | High |
| ST-BS-006 | updateItemStatusでステータスが遷移する | `addItems` → `updateItemStatus("1", "processing")` | `items[0].status === "processing"` | High |
| ST-BS-007 | updateItemStatusでerrorステータスとメッセージが設定される | `updateItemStatus("1", "error", "Canvas作成失敗")` | `items[0].status === "error"`, `items[0].error === "Canvas作成失敗"` | High |
| ST-BS-008 | setItemResultでdoneステータスとデータが設定される | `setItemResult("1", "data:...", 5000)` | `items[0].status === "done"`, `resizedDataUrl === "data:..."`, `resizedFileSize === 5000` | High |
| ST-BS-009 | clearAllで全アイテムとフラグがクリアされる | アイテム追加 + `setProcessing(true)` → `clearAll()` | `items === [], isProcessing === false` | High |
| ST-BS-010 | setCommonFormatでPNG時にqualityが1になる | `setCommonFormat("image/png")` | `commonFormat === "image/png"`, `commonQuality === 1` | High |
| ST-BS-011 | setCommonFormatでJPEG時にqualityが0.9になる | `setCommonFormat("image/jpeg")` | `commonFormat === "image/jpeg"`, `commonQuality === 0.9` | High |
| ST-BS-012 | ステータスライフサイクル全体 | pending → processing → done | 各遷移が正しく反映される | High |
| ST-BS-013 | ステータスライフサイクル（エラー） | pending → processing → error | `status === "error"`, `error` にメッセージ | High |
| ST-BS-014 | setResizeModeの切り替え | `setResizeMode("dimensions")` | `resizeMode === "dimensions"` | Medium |
| ST-BS-015 | setCommonScaleの設定 | `setCommonScale(0.5)` | `commonScale === 0.5` | Medium |
| ST-BS-016 | setCommonWidth/Heightの設定 | `setCommonWidth(1920)` → `setCommonHeight(1080)` | `commonWidth === 1920`, `commonHeight === 1080` | Medium |

---

## 6. コンポーネントテスト設計

### 6.1 DropZone

| テストID | テスト名 | 操作 | 期待結果 | 優先度 |
|---|---|---|---|---|
| CT-DZ-001 | ドロップゾーンが表示される | `render(<DropZone />)` | ドロップ領域のテキスト（「ドラッグ＆ドロップ」等）が表示される | High |
| CT-DZ-002 | ドラッグオーバーでハイライトされる | `dragOver` イベント発火 | CSSクラスまたはスタイルが変化する | Medium |
| CT-DZ-003 | ファイルドロップで処理される | `drop` イベントにJPEGファイルを設定 | コールバックが呼ばれる | High |
| CT-DZ-004 | クリックでファイル選択ダイアログが開く | ドロップゾーンをクリック | `input[type="file"]` の `click` が発火 | High |
| CT-DZ-005 | dragLeaveでハイライトが解除される | `dragOver` → `dragLeave` | ハイライトが解除される | Low |

### 6.2 DimensionInput

| テストID | テスト名 | 操作 | 期待結果 | 優先度 |
|---|---|---|---|---|
| CT-DI-001 | 幅と高さの入力フィールドが表示される | `render` | `input` 要素が2つ表示される | High |
| CT-DI-002 | 数値入力が反映される | 幅フィールドに `"800"` を入力 | `onChange` が `800` で呼ばれる | High |
| CT-DI-003 | 0以下の値が入力できない（バリデーション） | `"0"` を入力 | 値が受け付けられないか、エラー表示 | Medium |
| CT-DI-004 | 非数値入力が無視される | `"abc"` を入力 | 値が変更されない | Medium |
| CT-DI-005 | ロックアイコンの表示が切り替わる | ロックボタンをクリック | アイコンがロック/アンロックで切り替わる | Medium |

### 6.3 FormatSelect

| テストID | テスト名 | 操作 | 期待結果 | 優先度 |
|---|---|---|---|---|
| CT-FS-001 | フォーマット選択肢が表示される | `render` | PNG, JPEG, WebP のオプションが表示される | High |
| CT-FS-002 | フォーマット変更で値が更新される | JPEG を選択 | `onChange` が `"image/jpeg"` で呼ばれる | High |
| CT-FS-003 | 初期値が正しく選択されている | `defaultValue="image/png"` | PNG が選択状態 | Medium |

### 6.4 QualitySlider

| テストID | テスト名 | 操作 | 期待結果 | 優先度 |
|---|---|---|---|---|
| CT-QS-001 | スライダーが表示される | `render` | `input[type="range"]` が表示される | High |
| CT-QS-002 | スライダー操作で値が変更される | スライダーを `0.5` に移動 | `onChange` が `0.5` で呼ばれる | High |
| CT-QS-003 | 現在の品質値が表示される | `quality=0.9` | `"90%"` 等の表示がある | Medium |
| CT-QS-004 | PNG選択時にスライダーが非活性になる | `format="image/png"` | スライダーが `disabled` | Medium |

### 6.5 ResizeButton

| テストID | テスト名 | 操作 | 期待結果 | 優先度 |
|---|---|---|---|---|
| CT-RB-001 | ボタンが表示される | `render` | 「リサイズ」テキストを含むボタンが表示される | High |
| CT-RB-002 | クリックでonClickが呼ばれる | ボタンをクリック | `onClick` コールバックが呼ばれる | High |
| CT-RB-003 | 処理中はローディング表示になる | `isProcessing={true}` | ローディングインジケーターが表示され、ボタンが `disabled` | High |
| CT-RB-004 | 画像未選択時はボタンが非活性 | `disabled={true}` | ボタンが `disabled` | High |

---

## 7. E2Eテスト設計

### 7.1 シナリオ1: 単一画像リサイズフロー

**ファイル**: `e2e/single-resize.spec.ts`

```
テスト名: 画像をアップロードしてリサイズ→プレビュー→ダウンロードする
前提条件: テスト用の640x480のJPEG画像をfixtureとして用意

手順:
  1. トップページ (/) にアクセスする
  2. DropZoneにテスト画像をドラッグ＆ドロップ（またはファイル選択）する
  3. 画像のプレビューが表示されることを確認する
  4. 幅を「320」、高さを「240」に設定する
  5. フォーマットを「JPEG」に変更する
  6. 品質スライダーを「80%」に設定する
  7. 「リサイズ」ボタンをクリックする
  8. リサイズ完了後、プレビューが表示されることを確認する
  9. ファイルサイズが表示されることを確認する
  10. 「ダウンロード」ボタンをクリックする
  11. ダウンロードが開始されることを確認する（downloadイベント検出）

期待結果:
  - 各ステップが正常に完了する
  - リサイズ後の画像が320x240で表示される
  - ダウンロードファイル名が「テスト画像名_320x240.jpg」形式である
```

### 7.2 シナリオ2: 一括リサイズフロー

**ファイル**: `e2e/batch-resize.spec.ts`

```
テスト名: 複数画像を一括アップロードしてリサイズ→ZIPダウンロードする
前提条件: テスト用画像3枚をfixtureとして用意

手順:
  1. 一括処理ページ (/batch) にアクセスする
  2. 3枚の画像をアップロードする
  3. アップロードされた画像一覧が表示されることを確認する（3件）
  4. リサイズモードを「スケール」に設定し、50%を指定する
  5. フォーマットを「WebP」に変更する
  6. 「一括リサイズ」ボタンをクリックする
  7. 各画像の処理状態（pending → processing → done）が順に表示されることを確認する
  8. 全件完了後、「ZIPダウンロード」ボタンが有効になることを確認する
  9. ZIPダウンロードをクリックする

期待結果:
  - 3件すべてがdoneステータスになる
  - ZIPファイルのダウンロードが開始される
```

### 7.3 シナリオ3: ダークモード切り替え

**ファイル**: `e2e/dark-mode.spec.ts`

```
テスト名: ダークモードの切り替えが正しく動作する
手順:
  1. トップページにアクセスする
  2. テーマ切り替えボタンをクリックする
  3. ダークモードのクラス（dark）がhtml要素に付与されることを確認する
  4. 再度テーマ切り替えボタンをクリックする
  5. ダークモードが解除されることを確認する

期待結果:
  - テーマ切り替えが即座に反映される
  - ページリロード後もテーマが維持される（localStorageに保存）
```

### 7.4 シナリオ4: プリセット適用とアスペクト比

**ファイル**: `e2e/presets.spec.ts`

```
テスト名: プリセットを選択してアスペクト比が正しく計算される
前提条件: テスト用の1920x1080画像

手順:
  1. トップページにアクセスし画像をアップロードする
  2. SNSプリセット「Xヘッダー (1500×500)」を選択する
  3. 幅が1500、高さが500に設定されることを確認する
  4. スケールプリセット「50%」を選択する
  5. 幅が960、高さが540に設定されることを確認する
  6. アスペクト比ロックがONの状態で幅を「1280」に変更する
  7. 高さが自動的に「720」に更新されることを確認する（16:9比率）

期待結果:
  - プリセット適用後のサイズが正確
  - アスペクト比ロック時の連動計算が正確
```

### 7.5 シナリオ5: キーボードショートカット

**ファイル**: `e2e/keyboard-shortcuts.spec.ts`

```
テスト名: キーボードショートカットが動作する
前提条件: 画像アップロード済み

手順:
  1. 画像アップロード後、Enterキーを押す
  2. リサイズ処理が開始されることを確認する
  3. リサイズ完了後、Ctrl+S（またはCmd+S）を押す
  4. ダウンロードが開始されることを確認する

期待結果:
  - Enter でリサイズが実行される
  - Ctrl+S でダウンロードが実行される
  - ブラウザデフォルトの保存ダイアログが抑制される
```

---

## 8. テストケースマトリクス

### 8.1 ユニットテスト

| テストID | カテゴリ | テスト名 | 入力 | 期待出力 | 優先度 |
|---|---|---|---|---|---|
| UT-RSZ-001 | canvas/resize | リサイズ出力サイズ検証 | `targetWidth:200, targetHeight:100` | `result.width===200, result.height===100` | High |
| UT-RSZ-002 | canvas/resize | JPEG形式出力 | `format:"image/jpeg", quality:0.8` | `toDataURL("image/jpeg", 0.8)` | High |
| UT-RSZ-005 | canvas/resize | スムージング有効 | `smoothing:true` | `imageSmoothingQuality==="high"` | Medium |
| UT-RSZ-006 | canvas/resize | スムージング無効 | `smoothing:false` | `imageSmoothingEnabled===false` | Medium |
| UT-RSZ-007 | canvas/resize | Context取得失敗 | `getContext→null` | Error: "Failed to get canvas 2D context" | High |
| UT-MSR-001 | canvas/multi-step | 4倍以下→単一ステップ | `100→400 (scale=4)` | 単一ステップ処理 | High |
| UT-MSR-003 | canvas/multi-step | 4倍超→多段ステップ | `100→500 (scale=5)` | `totalSteps=3` | High |
| UT-MSR-006 | canvas/multi-step | onProgressコールバック | `scale=8, onProgress=spy` | 3回呼出: `(1,3),(2,3),(3,3)` | High |
| UT-FU-001 | file-utils | JPEG有効判定 | `File(type:"image/jpeg")` | `true` | High |
| UT-FU-007 | file-utils | PDF無効判定 | `File(type:"application/pdf")` | `false` | High |
| UT-FU-011 | file-utils | 0バイト表示 | `0` | `"0 B"` | High |
| UT-FU-014 | file-utils | 1024バイト表示 | `1024` | `"1.0 KB"` | High |
| UT-FU-016 | file-utils | 1MBバイト表示 | `1048576` | `"1.0 MB"` | High |
| UT-FU-019 | file-utils | JPEG拡張子 | `"image/jpeg"` | `"jpg"` | High |
| UT-FU-027 | file-utils | ファイル名生成 | `"photo.png",800,600,"image/jpeg"` | `"photo_800x600.jpg"` | High |
| UT-FU-030 | file-utils | 拡張子なしファイル名 | `"noext",100,100,"image/png"` | `"image_100x100.png"` | Medium |
| UT-CL-001 | canvas-limits | 最大サイズ取得 | Canvas 16384サポート | `16384` | High |
| UT-CL-002 | canvas-limits | キャッシュ動作 | 2回目呼び出し | Canvas生成1回のみ | High |
| UT-CL-004 | canvas-limits | フォールバック | 全サイズ失敗 | `4096` | High |
| UT-CL-005 | canvas-limits | 有効サイズ判定 | `1000×1000` | `{valid:true}` | High |
| UT-CL-006 | canvas-limits | 超過サイズ判定 | `20000×1000` | `{valid:false}` | High |

### 8.2 フック・ストアテスト

| テストID | カテゴリ | テスト名 | 入力 | 期待出力 | 優先度 |
|---|---|---|---|---|---|
| HK-AR-001 | useAspectRatio | 初期値設定 | `(1920,1080)` | `w=1920,h=1080,locked=true` | High |
| HK-AR-002 | useAspectRatio | ロック時幅変更→高さ連動 | `setWidth(960)` | `h=540` | High |
| HK-AR-006 | useAspectRatio | 再ロック時アスペクト比更新 | unlock→resize→lock | 新アスペクト比で計算 | High |
| HK-AR-009 | useAspectRatio | プリセット適用 | `applyPreset(1080,1080)` | `w=1080,h=1080` | High |
| HK-CP-002 | useCustomPresets | プリセット追加 | `addPreset("Test",400,400)` | `presets.length===1` | High |
| HK-CP-006 | useCustomPresets | localStorage保存 | `addPreset(...)` | localStorageに保存確認 | High |
| HK-FU-002 | useFileUpload | JPEG処理 | `File(type:"image/jpeg")` | `image` にデータ設定 | High |
| HK-FU-003 | useFileUpload | 無効ファイル拒否 | `File(type:"application/pdf")` | `alert`発火、`image===null` | High |
| ST-RS-002 | resizeStore | JPEG設定→quality | `setFormat("image/jpeg")` | `quality===0.9` | High |
| ST-RS-003 | resizeStore | PNG設定→quality | `setFormat("image/png")` | `quality===1` | High |
| ST-RS-005 | resizeStore | format変更→result消去 | `setResult→setFormat` | `resizedDataUrl===null` | High |
| ST-RS-008 | resizeStore | setResult | `setResult("url",5000)` | データ・サイズ設定、processing=false | High |
| ST-BS-002 | batchStore | アイテム追加 | `addItems([item])` | `items.length===1,status==="pending"` | High |
| ST-BS-008 | batchStore | 結果設定 | `setItemResult(id,url,size)` | `status==="done"`, データ設定 | High |
| ST-BS-009 | batchStore | 全クリア | `clearAll()` | `items===[], isProcessing===false` | High |
| ST-BS-010 | batchStore | PNG format→quality | `setCommonFormat("image/png")` | `commonQuality===1` | High |

### 8.3 コンポーネントテスト

| テストID | カテゴリ | テスト名 | 入力 | 期待出力 | 優先度 |
|---|---|---|---|---|---|
| CT-DZ-001 | DropZone | 表示確認 | `render` | テキスト表示 | High |
| CT-DZ-003 | DropZone | ドロップ処理 | `drop` イベント + JPEG | コールバック発火 | High |
| CT-DI-002 | DimensionInput | 数値入力 | `"800"` 入力 | `onChange(800)` | High |
| CT-FS-002 | FormatSelect | フォーマット変更 | JPEG選択 | `onChange("image/jpeg")` | High |
| CT-QS-002 | QualitySlider | 品質変更 | スライダー操作 | `onChange(0.5)` | High |
| CT-RB-002 | ResizeButton | クリック | ボタンクリック | `onClick` 発火 | High |
| CT-RB-003 | ResizeButton | ローディング状態 | `isProcessing=true` | disabled + ローディング表示 | High |

### 8.4 E2Eテスト

| テストID | カテゴリ | テスト名 | 入力 | 期待出力 | 優先度 |
|---|---|---|---|---|---|
| E2E-001 | 単一リサイズ | アップロード→リサイズ→DL | 640x480 JPEG | 320x240 JPEGダウンロード | High |
| E2E-002 | 一括リサイズ | 3枚→50%→WebP→ZIP | 画像3枚 | ZIPダウンロード | High |
| E2E-003 | ダークモード | テーマ切り替え | ボタンクリック | `dark` クラス付与/解除 | Medium |
| E2E-004 | プリセット | SNSプリセット→比率確認 | プリセット選択 | 正しいサイズ設定 | High |
| E2E-005 | ショートカット | Enter→リサイズ、Ctrl+S→DL | キーボード操作 | 対応処理の実行 | Medium |

---

## 9. カバレッジ目標

### 9.1 カバレッジ基準

| テストレベル | 対象 | 目標カバレッジ |
|---|---|---|
| ユニットテスト | `src/lib/**/*.ts` | ステートメント **80%以上**、ブランチ **75%以上** |
| フック・ストアテスト | `src/hooks/**/*.ts`, `src/stores/**/*.ts` | ステートメント **80%以上** |
| コンポーネントテスト | `src/components/**/*.tsx` | ステートメント **70%以上** |
| E2Eテスト | 主要ユーザーフロー | すべての主要フローをカバー（カバレッジ計測対象外） |

### 9.2 優先度別実装順序

| フェーズ | 内容 | 対象テスト数 | 期間目安 |
|---|---|---|---|
| Phase 1 | ユニットテスト (file-utils, canvas-limits) | 約31件 | 1日 |
| Phase 2 | ストアテスト (resizeStore, batchStore) | 約28件 | 1日 |
| Phase 3 | フックテスト (useAspectRatio, useCustomPresets, useFileUpload) | 約30件 | 1〜2日 |
| Phase 4 | Canvas関連ユニットテスト (resize, multi-step) | 約20件 | 1日 |
| Phase 5 | コンポーネントテスト | 約17件 | 1〜2日 |
| Phase 6 | E2Eテスト | 5シナリオ | 2〜3日 |

### 9.3 CI統合推奨構成

```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  unit-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm run test:coverage
      - uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/

  e2e-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

### 9.4 カバレッジ除外対象

以下のファイルはカバレッジ計測から除外する:

- `src/app/layout.tsx` — Next.js レイアウトファイル（フレームワーク定型コード）
- `src/**/*.d.ts` — 型定義ファイル
- `src/app/sitemap.ts`, `src/app/robots.ts` — SEO設定ファイル
- `next.config.ts`, `tailwind.config.ts` — 設定ファイル
