"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";
import { ProgressBar } from "@/components/ProgressBar";
import { QuestionCard } from "@/components/QuestionCard";
import { encodeAnswers } from "@/lib/share";
import { isOptionValue } from "@/lib/validation";

const STORAGE_KEY = "lol-type-choice.answers.v1";

const initialAnswers = Array.from({ length: questions.length }, () => null as number | null);

const parseStoredAnswers = (raw: string | null): (number | null)[] | null => {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length !== questions.length) {
      return null;
    }

    return parsed.map((value) => (isOptionValue(value) ? value : null));
  } catch {
    return null;
  }
};

export default function DiagnosisPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<(number | null)[]>(initialAnswers);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const restored = parseStoredAnswers(window.sessionStorage.getItem(STORAGE_KEY));
    if (restored) {
      setAnswers(restored);
    }
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const question = questions[index];
  const answeredCount = useMemo(() => answers.filter((v) => v !== null).length, [answers]);
  const isCurrentAnswered = answers[index] !== null;
  const isComplete = answeredCount === questions.length;

  const onSelect = (value: -2 | -1 | 0 | 1 | 2) => {
    setError(null);
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const onNext = () => {
    if (!isCurrentAnswered) {
      setError("回答を選択してください。");
      return;
    }

    if (index === questions.length - 1) {
      if (!isComplete) {
        setError("未回答の設問があります。前の設問を確認してください。");
        return;
      }
      const finalized = answers.map((value) => value ?? 0);
      const encoded = encodeAnswers(finalized);
      if (!encoded) {
        setError("回答データが不正です。最初からやり直してください。");
        return;
      }
      window.sessionStorage.removeItem(STORAGE_KEY);
      router.push(`/result?r=${encoded}`);
      return;
    }

    setIndex((prev) => prev + 1);
  };

  return (
    <div className="space-y-4">
      <ProgressBar current={index + 1} total={questions.length} />
      <QuestionCard question={question} value={answers[index] ?? undefined} onSelect={onSelect} />

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      <div className="flex items-center justify-between gap-3">
        <button type="button" className="btn-secondary" onClick={() => setIndex((prev) => Math.max(0, prev - 1))} disabled={index === 0}>
          前へ
        </button>
        <p className="text-xs text-muted">回答済み: {answeredCount} / {questions.length}</p>
        <button type="button" className="btn-primary" onClick={onNext}>
          {index === questions.length - 1 ? "結果を見る" : "次へ"}
        </button>
      </div>
    </div>
  );
}
