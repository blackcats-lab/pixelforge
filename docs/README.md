# PixelForge 設計ドキュメント

本ディレクトリには、PixelForge プロジェクトの設計書一式を格納しています。

## ドキュメント一覧

### 要件・計画

| ドキュメント | ファイル | 概要 |
|------------|---------|------|
| 要件定義書 | [requirements_final.md](requirements_final.md) | プロジェクト概要、ユーザー要件、機能/非機能要件、Canvas API仕様 |
| 実装計画書 | [implementation_final.md](implementation_final.md) | 開発方針、フェーズ別スケジュール、実装詳細、リスク評価 |

### 設計書

| ドキュメント | ファイル | 概要 |
|------------|---------|------|
| 基本設計書 | [basic_design.md](basic_design.md) | システム構成、技術スタック、アーキテクチャ、処理フロー、画面遷移 |
| 詳細設計書 | [detailed_design.md](detailed_design.md) | コンポーネント・フック・ライブラリの内部ロジック、依存関係 |
| 画面設計書 | [screen_design.md](screen_design.md) | デザインシステム、レイアウト、レスポンシブ対応、アニメーション |
| データ設計書 | [data_design.md](data_design.md) | 型定義、Zustandストア設計、localStorage、データフロー |
| インターフェース設計書 | [interface_design.md](interface_design.md) | コンポーネントProps、フックAPI、関数シグネチャ、ストアアクション |
| セキュリティ設計書 | [security_design.md](security_design.md) | プライバシー設計、HTTPヘッダー、入力検証、XSS対策 |
| インフラ設計書 | [infrastructure_design.md](infrastructure_design.md) | Vercelデプロイ、ビルド設定、パフォーマンス、SEO、PWA |
| テスト設計書 | [test_design.md](test_design.md) | テスト戦略、ユニット/E2Eテストケース、カバレッジ目標 |

## ドキュメント間の関係

```
要件定義書 ──→ 基本設計書 ──→ 詳細設計書
                 │               │
                 ├→ 画面設計書    ├→ インターフェース設計書
                 ├→ データ設計書  │
                 ├→ セキュリティ設計書
                 ├→ インフラ設計書
                 └→ テスト設計書 ←┘
                       ↑
実装計画書 ────────────┘
```

## 読み進める順序

1. **要件定義書** — プロジェクトの目的と要件を理解
2. **基本設計書** — アーキテクチャと全体像を把握
3. **データ設計書** — 型定義とストア構造を確認
4. **インターフェース設計書** — 各モジュールのAPI仕様を参照
5. **詳細設計書** — 内部ロジックとアルゴリズムを理解
6. **画面設計書** — UI/UX仕様を確認
7. **セキュリティ設計書** / **インフラ設計書** — 非機能要件の設計を確認
8. **テスト設計書** — テスト方針とケースを確認
