import type { ResultType } from "@/lib/types";

export const resultTypes: ResultType[] = [
  {
    id: "vanguard-carry",
    name: "先導キャリー型",
    oneLiner: "自ら主導し、勝負所で試合を決めるタイプ。",
    description: "主導権を握って仕掛ける動きが得意。キャリー期待値の高い役割で強みが出ます。",
    conditions: { initiative: { min: 65 }, winCondition: { min: 60 }, riskTolerance: { min: 55 } }
  },
  {
    id: "calm-controller",
    name: "冷静コントロール型",
    oneLiner: "安全性と再現性で勝率を積み上げるタイプ。",
    description: "大崩れを避けながら有利を広げるのが得意。安定した判断で勝ち筋を通します。",
    conditions: { decisionStyle: { max: 45 }, riskTolerance: { max: 45 } }
  },
  {
    id: "late-game-scaler",
    name: "終盤スケール型",
    oneLiner: "時間を味方にして後半で勝負するタイプ。",
    description: "序盤の不利を許容しつつ、終盤のパワースパイクを活かす戦い方に向いています。",
    conditions: { tempo: { min: 60 }, winCondition: { min: 50 } }
  },
  {
    id: "map-support-shotcaller",
    name: "マップ支援設計型",
    oneLiner: "視界・ローム・連携でチームを勝たせるタイプ。",
    description: "チーム貢献と全体把握に優れ、戦況を整える役割で価値を発揮します。",
    conditions: { winCondition: { max: 45 }, responsibility: { min: 60 } }
  },
  {
    id: "adaptive-skirmisher",
    name: "適応スカーミッシュ型",
    oneLiner: "アドリブと局所戦で流れを変えるタイプ。",
    description: "状況変化に強く、少人数戦で有利交換を取る判断に強みがあります。",
    conditions: { decisionStyle: { min: 60 }, initiative: { min: 55 } }
  },
  {
    id: "steady-executor",
    name: "安定遂行型",
    oneLiner: "役割遂行で堅実に勝利へ貢献するタイプ。",
    description: "極端な賭けを避け、必要な仕事を積み重ねることでチームを支えます。",
    conditions: { initiative: { max: 55 }, riskTolerance: { max: 55 } }
  },
  {
    id: "balanced-generalist",
    name: "バランス型オールラウンダー",
    oneLiner: "編成や味方に合わせて柔軟に適応できるタイプ。",
    description: "軸の偏りが少なく、状況ごとに最適な選択へ寄せられる汎用性が武器です。",
    conditions: {}
  }
];

export const fallbackResultType = resultTypes[resultTypes.length - 1];
