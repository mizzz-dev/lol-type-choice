import { describe, expect, test } from "vitest";
import { questions } from "@/data/questions";
import { buildDiagnosisResult, normalizeAnswerValue } from "@/lib/scoring";
import { decodeAnswers, encodeAnswers } from "@/lib/share";
import type { AnswerMap } from "@/lib/types";

const answerAll = (value: -2 | -1 | 0 | 1 | 2): AnswerMap =>
  Object.fromEntries(questions.map((question) => [question.id, value]));

const toArray = (map: AnswerMap) => questions.map((question) => map[question.id]);

describe("diagnosis scoring", () => {
  test("同一回答で同一結果になる", () => {
    const answers = answerAll(1);
    const a = buildDiagnosisResult(questions, answers);
    const b = buildDiagnosisResult(questions, answers);

    expect(a.type.id).toBe(b.type.id);
    expect(a.axisScore).toEqual(b.axisScore);
    expect(a.recommendedChampions[0]?.champion.slug).toBe(b.recommendedChampions[0]?.champion.slug);
  });

  test("境界値: -2と+2で軸スコアが有効範囲に収まる", () => {
    const low = buildDiagnosisResult(questions, answerAll(-2));
    const high = buildDiagnosisResult(questions, answerAll(2));

    Object.values(low.axisScore).forEach((score) => expect(score).toBeGreaterThanOrEqual(0));
    Object.values(low.axisScore).forEach((score) => expect(score).toBeLessThanOrEqual(100));
    Object.values(high.axisScore).forEach((score) => expect(score).toBeGreaterThanOrEqual(0));
    Object.values(high.axisScore).forEach((score) => expect(score).toBeLessThanOrEqual(100));
  });

  test("回答が欠けていても安全に処理できる", () => {
    const incomplete: AnswerMap = { [questions[0].id]: 2 };
    const result = buildDiagnosisResult(questions, incomplete);
    expect(result.recommendedRoles.length).toBeGreaterThan(0);
  });

  test("結果URLの再現性", () => {
    const answers = answerAll(0);
    const encoded = encodeAnswers(toArray(answers));

    expect(encoded).not.toBeNull();

    const decoded = decodeAnswers(encoded as string);
    expect(decoded).toEqual(toArray(answers));
  });

  test("normalizeAnswerValueは範囲外を丸める", () => {
    expect(normalizeAnswerValue(99)).toBe(2);
    expect(normalizeAnswerValue(-99)).toBe(-2);
    expect(normalizeAnswerValue(1.7)).toBe(2);
    expect(normalizeAnswerValue(1, true)).toBe(-1);
  });
});
