import { questions } from "@/data/questions";
import { isOptionValue } from "@/lib/validation";

const OFFSET = 2;
const VERSION = "v2";
const LEGACY_VERSION = "v1";
// TODO: 公開運用時は署名付きトークン（サーバー保存）方式へ移行する。

const checksum = (body: string): string => {
  const value = body.split("").reduce((sum, char, index) => {
    return (sum + (char.charCodeAt(0) - 48) * (index + 3)) % 97;
  }, 0);

  return String(value).padStart(2, "0");
};

export const encodeAnswers = (answers: number[]): string | null => {
  if (answers.length !== questions.length || answers.some((value) => !isOptionValue(value))) {
    return null;
  }

  const body = answers.map((value) => String(value + OFFSET)).join("");
  return `${VERSION}_${body}_${checksum(body)}`;
};

const decodeLegacyV1 = (body: string): number[] | null => {
  if (!body || body.length !== questions.length) {
    return null;
  }

  const answers = body.split("").map((char) => Number.parseInt(char, 10) - OFFSET);
  if (answers.some((value) => !isOptionValue(value))) {
    return null;
  }

  return answers;
};

export const decodeAnswers = (encoded: string | null | undefined): number[] | null => {
  if (!encoded) return null;

  const tokens = encoded.split("_");
  if (tokens.length !== 3) {
    return null;
  }

  const [version, body, check] = tokens;

  if (version === LEGACY_VERSION) {
    return decodeLegacyV1(body ?? "");
  }

  if (version !== VERSION || !body || body.length !== questions.length || !check) {
    return null;
  }

  if (checksum(body) !== check) {
    return null;
  }

  const answers = body.split("").map((char) => Number.parseInt(char, 10) - OFFSET);
  if (answers.some((value) => !isOptionValue(value))) {
    return null;
  }

  return answers;
};
