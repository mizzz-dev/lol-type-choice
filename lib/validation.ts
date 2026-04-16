import { questions } from "@/data/questions";
import type { AnswerMap, OptionValue } from "@/lib/types";

export const ANSWER_MIN = -2;
export const ANSWER_MAX = 2;

export const isOptionValue = (value: number): value is OptionValue =>
  Number.isInteger(value) && value >= ANSWER_MIN && value <= ANSWER_MAX;

export const validateAnswerMap = (answers: AnswerMap): { valid: boolean; message?: string } => {
  const validQuestionIds = new Set(questions.map((question) => question.id));

  for (const answerKey of Object.keys(answers)) {
    if (!validQuestionIds.has(answerKey)) {
      return { valid: false, message: "不明な設問IDが含まれています" };
    }
  }

  for (const question of questions) {
    if (!(question.id in answers)) {
      return { valid: false, message: `設問 ${question.order} の回答が未入力です` };
    }

    if (!isOptionValue(answers[question.id])) {
      return { valid: false, message: `設問 ${question.order} の回答値が不正です` };
    }
  }

  return { valid: true };
};
