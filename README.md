# LoL Playstyle Type Finder (β)

League of Legends 向けの **MBTI風プレイスタイル診断サイト** です。  
β版では 48 問・8軸分析・8タイプ分類に拡張し、結果の納得感と共有しやすさを改善しています。

## β版での主な改善

- 設問を 12 問 → 48 問へ拡張（各軸6問・逆転項目あり）
- 結果タイプを 8 種に再整理し、強み / 注意点の説明を追加
- チャンプデータを 20体+ へ拡張
- 診断ページの進捗UX改善（残り問数表示、復元、離脱計測）
- 結果ページの情報設計改善（上位軸表示、注意点、共有文言）
- 軽量イベント計測（開始/回答/離脱/完了/共有/再診断）

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
  ResultActions.tsx
data/
  champions.ts
  questions.ts
  resultTypes.ts
lib/
  analytics.ts
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

## 起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開いて確認します。

## テスト

```bash
npm run test
npm run lint
npm run build
```

## 計測イベント（最小実装）

`lib/analytics.ts` の `trackEvent` で `dataLayer` / `gtag` に送信します。

- `diagnosis_started`
- `question_answered`
- `diagnosis_abandoned`
- `diagnosis_completed`
- `result_shared`
- `retake_clicked`

> TODO: 本番運用時はイベントの重複除去・セッションID採番・同意バナー連携を追加。

## Riot非公式表記に関する注意

本プロジェクトは Riot Games とは関係のない **非公式ファンプロジェクト** です。  
League of Legends および関連名称・アセットの権利は Riot Games に帰属します。
