import Link from "next/link";
import type { Metadata } from "next";
import { AxisBars } from "@/components/AxisBars";
import { questions } from "@/data/questions";
import { buildDiagnosisResult } from "@/lib/scoring";
import { decodeAnswers } from "@/lib/share";
import type { AnswerMap } from "@/lib/types";

const toAnswerMap = (answers: number[]): AnswerMap =>
  Object.fromEntries(questions.map((question, index) => [question.id, answers[index]]));

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const getResult = async (searchParams: Props["searchParams"]) => {
  const params = await searchParams;
  const raw = params.r;
  const encoded = Array.isArray(raw) ? raw[0] : raw;
  const answers = decodeAnswers(encoded);
  if (!answers) return null;

  try {
    return buildDiagnosisResult(questions, toAnswerMap(answers));
  } catch {
    return null;
  }
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const result = await getResult(searchParams);
  const title = result ? `${result.type.name} | LoL診断結果` : "診断結果 | LoL Playstyle Type Finder";
  const description = result ? result.type.oneLiner : "LoL向けプレイスタイル診断結果";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article"
    },
    twitter: {
      card: "summary",
      title,
      description
    }
  };
}

export default async function ResultPage({ searchParams }: Props) {
  const params = await searchParams;
  const raw = params.r;
  const encoded = Array.isArray(raw) ? raw[0] : raw;
  const result = await getResult(searchParams);

  if (!result || !encoded) {
    return (
      <div className="card space-y-4">
        <h1 className="text-2xl font-bold">結果を表示できませんでした</h1>
        <p className="text-muted">URLが不正、または古い可能性があります。診断をやり直してください。</p>
        <Link href="/diagnosis" className="btn-primary w-fit">
          診断をやり直す
        </Link>
      </div>
    );
  }

  const shareText = encodeURIComponent(`LoL診断結果: ${result.type.name} - ${result.type.oneLiner}`);
  const shareUrl = encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/result?r=${encoded}`);

  return (
    <div className="space-y-4">
      <section className="card space-y-3">
        <p className="text-sm text-accent">診断結果</p>
        <h1 className="text-3xl font-bold">{result.type.name}</h1>
        <p className="text-lg text-cyan-100">{result.type.oneLiner}</p>
        <p className="text-muted">{result.type.description}</p>
      </section>

      <section className="card space-y-4">
        <h2 className="text-xl font-semibold">8軸スコア</h2>
        <AxisBars scores={result.axisScore} />
      </section>

      <section className="card space-y-3">
        <h2 className="text-xl font-semibold">おすすめロール</h2>
        <div className="flex gap-2">
          {result.recommendedRoles.map((role) => (
            <span key={role} className="rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-1 text-sm">
              {role}
            </span>
          ))}
        </div>
      </section>

      <section className="card space-y-3">
        <h2 className="text-xl font-semibold">おすすめチャンピオン</h2>
        <ul className="space-y-2">
          {result.recommendedChampions.map(({ champion, score, reason }) => (
            <li key={champion.slug} className="rounded-lg border border-slate-700 p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {champion.name} <span className="text-xs text-muted">({champion.primaryRole})</span>
                </p>
                <span className="text-sm text-cyan-200">相性 {Math.round(score)}</span>
              </div>
              <p className="mt-1 text-sm text-cyan-100">{reason.title}</p>
              <p className="mt-1 text-sm text-muted">{reason.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="card flex flex-wrap gap-2">
        <Link href="/diagnosis" className="btn-secondary">
          再診断する
        </Link>
        <a
          href={`https://x.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
        >
          Xで共有
        </a>
      </section>
    </div>
  );
}
