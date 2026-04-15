# LoL Playstyle Type Finder (MVP)

League of Legends 向けの **MBTI風プレイスタイル診断サイト** です。  
12問サンプルでMVPを成立させ、48問へ拡張しやすい構造を採用しています。

## 目的

- MVP品質を維持しつつ、**壊れにくさ・レビューしやすさ**を優先して改善する
- `data` / `lib` / `components` / `app` の責務を明確化する
- URL共有時の不正入力に最低限耐える

## 全体構成

```txt
app/
  layout.tsx
  page.tsx
  diagnosis/page.tsx
  result/page.tsx
components/
  AxisBars.tsx
  ProgressBar.tsx
  QuestionCard.tsx
data/
  champions.ts
  questions.ts
  resultTypes.ts
lib/
  resultQuery.ts
  scoring.ts
  share.ts
  types.ts
  validation.ts
tests/
  scoring.test.ts
```

## 使用技術

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Vitest

## セットアップ

```bash
npm install
```

## 起動方法

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開いて確認します。

## テスト

```bash
npm run test
npm run lint
```

## 実装ポリシー（重要）

### 1) 回答状態の保持

- 診断画面では `sessionStorage` に回答配列を一時保存
- ページリロード時に可能な範囲で復元
- 型不正値は `null` 扱いで無効化

### 2) URL共有方式

- `v2_<回答本体>_<checksum>` 形式を採用
- checksum不一致時は結果ページでエラー表示
- **注**: 改ざん不能ではなく「最低限の検知」

### 3) 結果ページの安全性

- クエリ `r` を `parseResultQuery` で一元検証
- 形式不正・欠損・未回答を明示メッセージでフォールバック
- 推薦チャンピオンデータ欠損時にも画面を落とさない

### 4) 責務分離

- `lib/scoring.ts`: 純関数ベースの診断ロジック
- `lib/resultQuery.ts`: URLクエリ解析・検証
- `app/*`: 画面遷移と表示
- `data/*`: 定義データのみ

## 現時点の制約 / TODO

- TODO: URL共有は署名方式にしていないため、公開運用ではサーバー保存 + トークン方式を検討
- TODO: OGP画像は静的メタデータのみ（動的OGPは未実装）
- TODO: 設問48問化時は設問バランス（軸ごとの質問数と逆転項目比率）の再設計が必要

## Riot非公式表記に関する注意

本プロジェクトは Riot Games とは関係のない **非公式ファンプロジェクト** です。  
League of Legends および関連名称・アセットの権利は Riot Games に帰属します。
