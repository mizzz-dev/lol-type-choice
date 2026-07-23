# レンタルサーバー向けデプロイ手順

## 目的

LoL Playstyle Type Finderを、Node.jsの常駐実行に対応したレンタルサーバーへ公開するための手順です。

本手順では、Next.jsのstandalone成果物を使用し、アプリ本体は `127.0.0.1:3000` で待ち受け、外部公開はレンタルサーバーのリバースプロキシとSSL機能に任せます。

## 必要条件

契約前または作業前に、次の条件を確認してください。

- Node.js 22.xを使用できる
- npm 10.xを使用できる
- Node.jsプロセスを常駐実行できる
- 独自ドメインを設定できる
- HTTPSを利用できる
- 3000番などの内部ポートへリバースプロキシできる
- SSHまたは同等の方法でファイル配置とコマンド実行ができる

共有レンタルサーバーでNode.jsの常駐実行またはリバースプロキシが利用できない場合、この構成のままでは公開できません。

## 初回デプロイ

### 1. ソースコードを配置

```bash
git clone https://github.com/mizzz-dev/lol-type-choice.git
cd lol-type-choice
```

既存の配置先がある場合は、対象ディレクトリで `git fetch` 後にデプロイ対象コミットを明示的にcheckoutしてください。

### 2. Node.jsバージョンを確認

```bash
node --version
npm --version
```

期待値はNode.js 22.x、npm 10.xです。

nvmを利用できる場合は以下を実行します。

```bash
nvm use
```

### 3. 本番URLを設定

```bash
cp .env.example .env.production
```

`.env.production` の `NEXT_PUBLIC_SITE_URL` を実際のHTTPS URLへ変更します。

```env
NEXT_PUBLIC_SITE_URL=https://example.com
HOSTNAME=127.0.0.1
PORT=3000
```

`NEXT_PUBLIC_SITE_URL` はクライアント向け出力にも使用されるため、必ず本番ビルド前に設定してください。

### 4. 依存関係を導入して品質確認

```bash
npm ci --no-audit --no-fund
npm run lint
npm run test
```

### 5. standalone成果物を生成

```bash
npm run build
```

以下が生成されていることを確認します。

```text
.next/standalone/server.js
.next/standalone/.next/static/
.next/standalone/public/  # publicディレクトリが存在する場合
```

### 6. ローカル起動確認

```bash
npm run smoke:standalone
```

トップページ、診断ページ、ヘルスチェック、robots.txt、sitemap.xmlが正常応答すれば成功です。

## 常駐起動

### レンタルサーバーのNode.jsアプリ管理機能を使う場合

以下を設定します。

- 起動ファイル: `.next/standalone/server.js`
- 作業ディレクトリ: リポジトリのルート
- Node.js: 22.x
- 環境: `NODE_ENV=production`
- ホスト: `127.0.0.1`
- ポート: `3000`

### PM2を使う場合

PM2が利用できる環境では、同梱の設定例を使用できます。

```bash
pm2 start deploy/ecosystem.config.cjs
pm2 save
pm2 status
pm2 logs lol-type-choice
```

設定変更や再デプロイ後は以下を実行します。

```bash
pm2 reload deploy/ecosystem.config.cjs --update-env
```

## リバースプロキシとSSL

`deploy/nginx.conf.example` を参考に、公開ドメインから `127.0.0.1:3000` へ転送します。

本番では次を必ず変更してください。

- `example.com`
- SSL証明書パス
- 利用する内部ポート

アプリのNode.jsポートを直接インターネットへ公開せず、HTTPS終端を行うリバースプロキシ経由で公開します。

## 公開後スモークテスト

```bash
SMOKE_BASE_URL=https://example.com npm run smoke
```

確認対象は次の通りです。

- `/`
- `/diagnosis`
- `/api/health`
- `/robots.txt`
- `/sitemap.xml`

## 更新デプロイ

```bash
git fetch origin
git checkout <デプロイ対象コミットSHA>
npm ci --no-audit --no-fund
npm run lint
npm run test
npm run build
npm run smoke:standalone
pm2 reload deploy/ecosystem.config.cjs --update-env
SMOKE_BASE_URL=https://example.com npm run smoke
```

`main` の最新状態を無条件に使用せず、GitHub Actionsが成功したコミットSHAを指定してください。

## 切り戻し

問題発生時は、直前に正常稼働していたコミットへ戻します。

```bash
git checkout <直前の正常コミットSHA>
npm ci --no-audit --no-fund
npm run build
npm run smoke:standalone
pm2 reload deploy/ecosystem.config.cjs --update-env
```

切り戻し後、公開URLに対してスモークテストを実行します。

```bash
SMOKE_BASE_URL=https://example.com npm run smoke
```

## ログと障害確認

最低限、以下を確認できる状態にしてください。

- Node.jsプロセスの起動状態
- アプリケーション標準出力・標準エラー
- リバースプロキシのアクセスログ・エラーログ
- `/api/health` のHTTPステータス
- ディスク使用量とメモリ使用量

`/api/health` は稼働確認専用で、バージョン、環境変数、ホスト名、秘密情報は返しません。

## 未対応事項

- 特定事業者の管理画面操作
- DNSレコード設定
- SSL証明書の発行・自動更新
- GitHub Actionsからの自動本番デプロイ
- 複数インスタンス構成
- 無停止デプロイの保証
