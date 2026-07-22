import { afterEach, describe, expect, test } from "vitest";
import { buildSiteUrl, getSiteUrl, normalizeSiteUrl } from "@/lib/site";

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalSiteUrl === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    return;
  }

  process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
});

describe("site URL utilities", () => {
  test("HTTPS URLの末尾スラッシュとパスをoriginへ正規化する", () => {
    expect(normalizeSiteUrl("https://example.com/sub/path/")).toBe("https://example.com");
  });

  test("未設定時はローカルURLへフォールバックする", () => {
    expect(normalizeSiteUrl(undefined)).toBe("http://localhost:3000");
    expect(normalizeSiteUrl(" ")).toBe("http://localhost:3000");
  });

  test("http/https以外や不正なURLはローカルURLへフォールバックする", () => {
    expect(normalizeSiteUrl("ftp://example.com")).toBe("http://localhost:3000");
    expect(normalizeSiteUrl("not-a-url")).toBe("http://localhost:3000");
  });

  test("環境変数から公開URLを取得する", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://diagnosis.example.com/";
    expect(getSiteUrl()).toBe("https://diagnosis.example.com");
  });

  test("パスとクエリを含む絶対URLを生成する", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://diagnosis.example.com";
    expect(buildSiteUrl("/result", { r: "v2_012_10" })).toBe(
      "https://diagnosis.example.com/result?r=v2_012_10"
    );
  });
});
