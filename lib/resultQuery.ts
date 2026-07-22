import { questions } from "@/data/questions";
import { decodeAnswers } from "@/lib/share";
import type { AnswerMap, OptionValue } from "@/lib/types";
import { validateAnswerMap } from "@/lib/validation";

export type SearchParamValue = string | string[] | undefined;

export const readSingleQueryParam = (raw: SearchParamValue): string | null => {
  if (typeof raw === "string") return raw;
  if (Array.isArray(raw)) return raw.length > 0 ? raw[0] : null;
  return null;
};

export const toAnswerMap = (answers: OptionValue[]): AnswerMap | null => {
  if (answers.length !== questions.length) {
    return null;
  }

  return Object.fromEntries(questions.map((question, index) => [question.id, answers[index]]));
};

export const parseResultQuery = (raw: SearchParamValue):
  | { ok: true; encoded: string; answerMap: AnswerMap }
  | { ok: false; reason: string } => {
  const encoded = readSingleQueryParam(raw);
  if (!encoded) {
    return { ok: false, reason: "URLに診断データが含まれていません。" };
  }

  const answers = decodeAnswers(encoded);
  if (!answers) {
    return { ok: false, reason: "URL内の診断データが不正です。" };
  }

  const answerMap = toAnswerMap(answers);
  if (!answerMap) {
    return { ok: false, reason: "URL内の診断データ件数が不正です。" };
  }

  const validation = validateAnswerMap(answerMap);
  if (!validation.valid) {
    return { ok: false, reason: validation.message ?? "診断データの整合性チェックに失敗しました。" };
  }

  return { ok: true, encoded, answerMap };
};
