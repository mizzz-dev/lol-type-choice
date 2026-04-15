import { describe, expect, test } from "vitest";
import { questions } from "@/data/questions";
import { buildDiagnosis } from "@/lib/scoring";
import { decodeAnswers, encodeAnswers } from "@/lib/share";

const answerAll = (value: -2 | -1 | 0 | 1 | 2) => Array.from({ length: questions.length }, () => value);

describe("diagnosis scoring", () => {
  test("同一回答で同一結果になる", () => {
    const answers = answerAll(1);
    const a = buildDiagnosis(answers);
    const b = buildDiagnosis(answers);

    expect(a.typeId).toBe(b.typeId);
    expect(a.axisScores).toEqual(b.axisScores);
    expect(a.recommendedChampions[0]?.champion.slug).toBe(b.recommendedChampions[0]?.champion.slug);
  });

  test("境界値: -2と+2で軸スコアが有効範囲に収まる", () => {
    const low = buildDiagnosis(answerAll(-2));
    const high = buildDiagnosis(answerAll(2));

    Object.values(low.axisScores).forEach((score) => expect(score).toBeGreaterThanOrEqual(0));
    Object.values(low.axisScores).forEach((score) => expect(score).toBeLessThanOrEqual(100));
    Object.values(high.axisScores).forEach((score) => expect(score).toBeGreaterThanOrEqual(0));
    Object.values(high.axisScores).forEach((score) => expect(score).toBeLessThanOrEqual(100));
  });

  test("異常系: 回答数が不足していると例外", () => {
    expect(() => buildDiagnosis([1, 1, 1])).toThrowError();
  });

  test("結果URLの再現性", () => {
    const answers = answerAll(0);
    const encoded = encodeAnswers(answers);

    expect(encoded).not.toBeNull();

    const decoded = decodeAnswers(encoded as string);
    expect(decoded).toEqual(answers);
  });
});
