import { describe, expect, test } from "vitest";
import { GET } from "@/app/api/health/route";

describe("health endpoint", () => {
  test("内部情報を含まない正常応答を返す", async () => {
    const response = GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store, max-age=0");
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    await expect(response.json()).resolves.toEqual({ status: "ok" });
  });
});
