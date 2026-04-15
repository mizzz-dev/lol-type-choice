# LoL Playstyle Type Finder (MVP)

League of Legends 向けの **MBTI風プレイスタイル診断サイト** です。  
12問サンプルでMVPを成立させ、48問へ拡張しやすい構造を採用しています。

## 全体構成（Step 3〜11の実装方針）

1. **実装計画（Step 3）**
   - 型・データ・ロジック・画面を責務分離して段階実装
   - 1PR単位でレビューしやすい差分サイズを維持
2. **ディレクトリ設計（Step 4）**
   - `data` は定義のみ、`lib` は純関数ロジック、`components` はUI限定
3. **型設計（Step 5）**
   - `Question`, `QuestionOption`, `AxisKey`, `AxisScore`, `AnswerMap`, `ResultType`, `Champion`, `Role`, `DiagnosisResult`, `RecommendationReason`
4. **データ設計（Step 6）**
   - 8軸、7タイプ、12問、12体のチャンピオンサンプル
5. **診断ロジック（Step 7）**
   - 純関数: `normalizeAnswerValue`, `calculateAxisScores`, `determineResultType`, `recommendRoles`, `recommendChampions`, `buildDiagnosisResult`
6. **画面実装（Step 8）**
   - `/`, `/diagnosis`, `/result`
7. **結果共有（Step 9）**
   - URLエンコード方式を採用（MVP優先）
8. **OGP（Step 10）**
   - `metadata` と `generateMetadata` で最低限対応
9. **README（Step 11）**
   - ローカル起動・構造説明・拡張案を明記

---

## ディレクトリ構成

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
  scoring.ts
  share.ts
  types.ts
  validation.ts
tests/
  scoring.test.ts
```

---

## 使用技術

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Vitest

---

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
```

---

## データ構造の説明

- `data/questions.ts`
  - 12問の設問データ（5択、逆転項目、重み）
  - `questionSeeds` を増やすだけで48問へ拡張可能
- `data/resultTypes.ts`
  - 7種類の結果タイプ定義（条件ベース）
- `data/champions.ts`
  - 12体のチャンピオン特徴量（ロール・相性計算用の数値）

---

## 診断ロジックの説明

`lib/scoring.ts` は純関数中心です。

- `normalizeAnswerValue`: 回答値を -2〜2 に丸め、必要なら逆転
- `calculateAxisScores`: 回答を8軸スコア（0〜100）へ変換
- `determineResultType`: 軸スコアからタイプ判定
- `recommendRoles`: 軸スコアとロールプロファイル距離で推薦
- `recommendChampions`: チャンプ特徴量距離で上位を推薦
- `buildDiagnosisResult`: 最終結果を統合生成

不正値や欠損値は、`normalizeAnswerValue` と `decodeAnswers` の防御で落ちにくい実装にしています。

---

## 共有方式（MVP採用）

### A. URLパラメータエンコード
- 実装コスト: 低
- 保守性: 高（DB不要）
- URL長: 質問数増で伸びる
- 改ざん耐性: 低（MVP許容）
- MVP適性: 高

### B. サーバー保存 + share token
- 実装コスト: 中〜高
- 保守性: DB運用が必要
- URL長: 短い
- 改ざん耐性: 高
- MVP適性: 中

**現状は A を採用**。将来はBへ移行可能です。

---

## 今後の拡張案

1. 48問版への拡張（軸ごと6問）
2. DB保存方式（share token）への移行
3. OGP画像の動的生成（`app/api/og/route.ts` 追加）
4. パッチ連動のチャンピオンデータ更新
5. 多言語対応（日本語/英語）

---

## Riot非公式表記に関する注意

本プロジェクトは Riot Games とは関係のない **非公式ファンプロジェクト** です。  
League of Legends および関連名称・アセットの権利は Riot Games に帰属します。
