import { questions } from "@/data/questions";
import type { OptionValue } from "@/lib/types";

export const ANSWER_MIN = -2;
export const ANSWER_MAX = 2;

export const isOptionValue = (value: number): value is OptionValue =>
  Number.isInteger(value) && value >= ANSWER_MIN && value <= ANSWER_MAX;

export const validateAnswers = (answers: number[]): { valid: boolean; message?: string } => {
  if (answers.length !== questions.length) {
    return { valid: false, message: `回答数が不正です: ${answers.length}/${questions.length}` };
  }

  for (let i = 0; i < answers.length; i += 1) {
    if (!isOptionValue(answers[i])) {
      return { valid: false, message: `設問${i + 1}の回答値が不正です` };
    }
  }

  return { valid: true };
};
