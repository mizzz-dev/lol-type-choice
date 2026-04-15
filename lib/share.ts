import { questions } from "@/data/questions";
import { isOptionValue } from "@/lib/validation";

const OFFSET = 2;
const VERSION = "v1";

export const encodeAnswers = (answers: number[]): string | null => {
  if (answers.length !== questions.length || answers.some((value) => !isOptionValue(value))) {
    return null;
  }

  const body = answers.map((value) => String(value + OFFSET)).join("");
  return `${VERSION}_${body}`;
};

export const decodeAnswers = (encoded: string | null | undefined): number[] | null => {
  if (!encoded) return null;

  const [version, body] = encoded.split("_");
  if (version !== VERSION || !body || body.length !== questions.length) {
    return null;
  }

  const answers = body.split("").map((char) => Number.parseInt(char, 10) - OFFSET);
  if (answers.some((value) => !isOptionValue(value))) {
    return null;
  }

  return answers;
};
