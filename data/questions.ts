import type { Question, QuestionOption } from "@/lib/types";

export const DEFAULT_OPTIONS: QuestionOption[] = [
  { label: "まったく当てはまらない", value: -2 },
  { label: "あまり当てはまらない", value: -1 },
  { label: "どちらでもない", value: 0 },
  { label: "やや当てはまる", value: 1 },
  { label: "とても当てはまる", value: 2 }
];

type QuestionSeed = Omit<Question, "id" | "order" | "options">;

// MVPでは12問。seedを追加すれば48問へ段階的に拡張可能。
const questionSeeds: QuestionSeed[] = [
  { text: "レーン有利を取れそうなら、自分から先に仕掛けたい", reverse: false, weights: [{ axis: "initiative", weight: 1.2 }] },
  { text: "五分の状況では、まずデスしない選択を取りたい", reverse: true, weights: [{ axis: "riskTolerance", weight: 1.1 }] },
  { text: "事前プランより、その場の情報を見て判断を変える方だ", reverse: false, weights: [{ axis: "decisionStyle", weight: 1 }] },
  { text: "自分が育って勝ち切る展開にやりがいを感じる", reverse: false, weights: [{ axis: "winCondition", weight: 1.2 }] },
  { text: "接近戦でプレッシャーをかけるほうが得意だ", reverse: false, weights: [{ axis: "combatRange", weight: 1 }] },
  { text: "操作はシンプルな方が安定して力を出せる", reverse: true, weights: [{ axis: "processing", weight: 1 }] },
  { text: "序盤から試合を動かして早めに決着を狙いたい", reverse: true, weights: [{ axis: "tempo", weight: 1.1 }] },
  { text: "自分の担当レーンだけでなくマップ全体を見て動きたい", reverse: false, weights: [{ axis: "responsibility", weight: 1.2 }] },
  { text: "味方の合図を待ってから入る方が得意だ", reverse: true, weights: [{ axis: "initiative", weight: 1 }] },
  { text: "リターンが高ければ多少不利でも勝負してよい", reverse: false, weights: [{ axis: "riskTolerance", weight: 1 }] },
  { text: "味方を活かすためにリソースを譲る動きが好きだ", reverse: true, weights: [{ axis: "winCondition", weight: 1 }] },
  { text: "難しいコンボや細かい入力の多いチャンプも楽しめる", reverse: false, weights: [{ axis: "processing", weight: 1.1 }] }
];

export const questions: Question[] = questionSeeds.map((seed, index) => ({
  ...seed,
  id: `q${String(index + 1).padStart(2, "0")}`,
  order: index + 1,
  options: DEFAULT_OPTIONS
}));
