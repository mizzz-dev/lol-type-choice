import type { AxisKey, Question } from "@/lib/types";

type QuestionTemplate = {
  axis: AxisKey;
  text: string;
  reverseScored?: boolean;
  weight?: number;
};

const templates: QuestionTemplate[] = [
  { axis: "initiative", text: "試合の流れは自分から作りたい", weight: 1.2 },
  { axis: "initiative", text: "味方の合図を待ってから動く方が安心だ", reverseScored: true },
  { axis: "initiative", text: "有利が見えたら即座にコールしたくなる" },
  { axis: "initiative", text: "主導権を握るより、安定して追従する方が得意", reverseScored: true, weight: 1.1 },
  { axis: "initiative", text: "レーン戦でも主導権を意識してプレイする" },
  { axis: "initiative", text: "判断役より実行役に回ることが多い", reverseScored: true },

  { axis: "riskTolerance", text: "五分の場面では、やや安全寄りの選択をしたい", reverseScored: true, weight: 1.1 },
  { axis: "riskTolerance", text: "リターンが高いならリスクを取ってもよい" },
  { axis: "riskTolerance", text: "不確定なファイトは避ける傾向がある", reverseScored: true },
  { axis: "riskTolerance", text: "試合を動かすためならフラッシュインも選べる" },
  { axis: "riskTolerance", text: "勝てる確率が高い時しか大きく仕掛けたくない", reverseScored: true },
  { axis: "riskTolerance", text: "デスの可能性より獲得できる主導権を重視する" },

  { axis: "decisionStyle", text: "事前に決めたプラン通りに進めるのが得意", reverseScored: true },
  { axis: "decisionStyle", text: "その場の情報から即興で最適解を選ぶ" },
  { axis: "decisionStyle", text: "ルーチンが崩れると判断が遅れやすい", reverseScored: true },
  { axis: "decisionStyle", text: "突発的な展開でもアドリブ対応しやすい" },
  { axis: "decisionStyle", text: "毎試合同じ勝ち筋を再現したい", reverseScored: true },
  { axis: "decisionStyle", text: "細かいプランより直感のテンポを重視する" },

  { axis: "winCondition", text: "自分がリソースを受けてキャリーする展開が好き" },
  { axis: "winCondition", text: "味方の強みを通す動きにやりがいを感じる", reverseScored: true },
  { axis: "winCondition", text: "勝つためなら自分が目立たなくても良い", reverseScored: true },
  { axis: "winCondition", text: "自分のプレイで試合を決めたい気持ちが強い" },
  { axis: "winCondition", text: "ダメージよりもセットアップや視界に価値を感じる", reverseScored: true },
  { axis: "winCondition", text: "最終的にキルを取って勝負を決める役割が好き" },

  { axis: "combatRange", text: "接近戦で圧をかけるのが得意" },
  { axis: "combatRange", text: "距離を取って一方的に削るのが好み", reverseScored: true },
  { axis: "combatRange", text: "インファイトの読み合いに楽しさを感じる" },
  { axis: "combatRange", text: "ポジショニングで被弾を避ける戦い方が好き", reverseScored: true },
  { axis: "combatRange", text: "敵の懐に入る瞬間に勝負を感じる" },
  { axis: "combatRange", text: "近づかれる前に処理する戦い方が得意", reverseScored: true },

  { axis: "processing", text: "操作はシンプルな方がパフォーマンスを出しやすい", reverseScored: true },
  { axis: "processing", text: "複数のスキル回しや管理要素が多い方が燃える" },
  { axis: "processing", text: "操作難度より状況判断のみに集中したい", reverseScored: true },
  { axis: "processing", text: "高難度コンボや繊細な入力も楽しめる" },
  { axis: "processing", text: "覚えることが多いチャンプは避けたい", reverseScored: true },
  { axis: "processing", text: "多少忙しくても高い上限を目指したい" },

  { axis: "tempo", text: "序盤で有利を作って試合を畳みたい", reverseScored: true },
  { axis: "tempo", text: "終盤のパワースパイクを見据えて戦うのが好き" },
  { axis: "tempo", text: "レベル6前の主導権を重く見る", reverseScored: true },
  { axis: "tempo", text: "多少押されても終盤で巻き返せるなら問題ない" },
  { axis: "tempo", text: "早めにオブジェクトを取り切って終わらせたい", reverseScored: true },
  { axis: "tempo", text: "時間がかかっても強くなる構成を選びやすい" },

  { axis: "responsibility", text: "自分のレーンだけでなく全体状況を常に見たい" },
  { axis: "responsibility", text: "担当範囲を明確にして、まずは自分の仕事を完遂したい", reverseScored: true },
  { axis: "responsibility", text: "ロームやカバーで他レーンに関与するのが好き" },
  { axis: "responsibility", text: "マップ全体より個人のレーン戦に集中したい", reverseScored: true },
  { axis: "responsibility", text: "視界やオブジェクト管理にも積極的に関わりたい" },
  { axis: "responsibility", text: "役割外の判断までは背負いすぎたくない", reverseScored: true }
];

export const questions: Question[] = templates.map((template, index) => ({
  id: `q${(index + 1).toString().padStart(2, "0")}`,
  order: index + 1,
  text: template.text,
  reverseScored: template.reverseScored ?? false,
  weights: [
    {
      axis: template.axis,
      weight: template.weight ?? 1
    }
  ]
}));
