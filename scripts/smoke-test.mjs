const DEFAULT_BASE_URL = "http://127.0.0.1:3000";
const REQUEST_TIMEOUT_MS = 10_000;

const normalizeBaseUrl = (value) => {
  const candidate = value?.trim() || DEFAULT_BASE_URL;
  const url = new URL(candidate);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("SMOKE_BASE_URLにはhttpまたはhttpsのURLを指定してください。");
  }

  return url.origin;
};

const checks = [
  { path: "/", label: "トップページ" },
  { path: "/diagnosis", label: "診断ページ" },
  { path: "/api/health", label: "ヘルスチェック", includes: '"status":"ok"' },
  { path: "/robots.txt", label: "robots.txt", includes: "Disallow: /result" },
  { path: "/sitemap.xml", label: "sitemap.xml", includes: "/diagnosis" }
];

const run = async () => {
  const baseUrl = normalizeBaseUrl(process.env.SMOKE_BASE_URL);

  for (const check of checks) {
    const targetUrl = new URL(check.path, `${baseUrl}/`);
    const response = await fetch(targetUrl, {
      redirect: "manual",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
    });
    const body = await response.text();

    if (response.status !== 200) {
      throw new Error(`${check.label}がHTTP ${response.status}を返しました: ${targetUrl}`);
    }

    if (check.includes && !body.includes(check.includes)) {
      throw new Error(`${check.label}の応答に期待する内容がありません: ${check.includes}`);
    }

    console.log(`OK ${check.label}: ${targetUrl}`);
  }
};

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
