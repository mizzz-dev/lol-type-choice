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
  robots.ts
  sitemap.ts
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
  site.ts
  types.ts
  validation.ts
tests/
  scoring.test.ts
  site.test.ts
```

## 使用技術

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Vitest

## 必要環境

- Node.js 22.x
- npm 10.x

Node.jsのバージョンは `.nvmrc` で固定しています。

## セットアップ

```bash
nvm use
npm install
```

## 起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開いて確認します。

## 品質確認

```bash
npm run lint
npm run test
npm run build
```

`main` 向けPull Requestと `main` へのpushでは、GitHub Actionsが上記コマンドを順番に実行します。いずれかが失敗した場合、CIは失敗として終了します。

## レンタルサーバーへの公開準備

Node.js 22.xを実行できるレンタルサーバーを前提としています。共有レンタルサーバーでNode.jsの常駐プロセスを起動できない場合、この構成のままでは公開できません。

### 1. 環境変数を設定

`.env.example` を参考に、本番環境で公開URLを設定します。

```bash
NEXT_PUBLIC_SITE_URL=https://example.com
```

- HTTPSの本番URLを指定する
- 末尾スラッシュは不要
- サブディレクトリ配下への公開は現在未対応
- 未設定または不正な値の場合は `http://localhost:3000` へフォールバックするため、本番では必ず設定する

### 2. 本番ビルドと起動

```bash
npm ci --no-audit --no-fund
npm run build
npm run start
```

プロセスマネージャーやレンタルサーバーのNode.jsアプリ管理機能を使用し、`npm run start` を常駐させます。

### 3. 公開後の確認

- `/` がHTTPSで表示される
- `/diagnosis` から診断を完了できる
- 結果共有URLが本番ドメインになる
- `/robots.txt` が表示される
- `/sitemap.xml` にトップページと診断ページが含まれる
- `/result` が検索対象外として設定されている
- GitHub ActionsのLint / Test / Buildが成功している

DNS、SSL、リバースプロキシ、プロセス再起動、ログ保存の具体手順は、利用するレンタルサーバーの機能に合わせて別途設定します。

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
