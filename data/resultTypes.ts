import type { TypeRule } from "@/lib/types";

export const resultTypeRules: TypeRule[] = [
  {
    id: "vanguard-carry",
    name: "先導キャリー型",
    oneLiner: "自ら主導し、勝負どころで試合を決めるタイプ。",
    description: "積極的な主導と高いキャリー志向が特徴。主導権を握ってテンポを作る役割が噛み合います。",
    conditions: {
      initiative: { min: 65 },
      winCondition: { min: 60 },
      riskTolerance: { min: 55 }
    }
  },
  {
    id: "calm-control",
    name: "冷静コントロール型",
    oneLiner: "安全性と再現性を重視して勝率を積み上げるタイプ。",
    description: "計画性と安定志向に優れ、ミスを減らしながら確実に勝ち筋を通します。",
    conditions: {
      decisionStyle: { max: 45 },
      riskTolerance: { max: 45 },
      initiative: { min: 40, max: 65 }
    }
  },
  {
    id: "scaling-grower",
    name: "成長重視スケーリング型",
    oneLiner: "序盤を耐えて、終盤の爆発力で勝ち切るタイプ。",
    description: "テンポ軸が終盤寄りで、安定してリソースを積み重ねるプレイに向いています。",
    conditions: {
      tempo: { min: 60 },
      riskTolerance: { min: 35, max: 65 }
    }
  },
  {
    id: "ally-tactician",
    name: "仲間支援戦術型",
    oneLiner: "味方を活かし、マップ全体の勝ち筋を設計するタイプ。",
    description: "チーム貢献とマップ関与が高く、連携を軸に価値を出せます。",
    conditions: {
      winCondition: { max: 40 },
      responsibility: { min: 60 }
    }
  },
  {
    id: "ambush-shotcaller",
    name: "奇襲主導型",
    oneLiner: "アドリブ力と勝負勘で局面を切り開くタイプ。",
    description: "判断の速さと仕掛けの大胆さが強み。テンポを崩す奇襲プレイで差を作れます。",
    conditions: {
      decisionStyle: { min: 60 },
      riskTolerance: { min: 60 },
      responsibility: { min: 50 }
    }
  },
  {
    id: "steady-executor",
    name: "安定遂行型",
    oneLiner: "役割遂行に徹し、堅実に勝ちへ寄与するタイプ。",
    description: "極端な賭けを避け、必要な仕事を正確にこなすことでチームの土台になります。",
    conditions: {
      riskTolerance: { max: 55 },
      initiative: { max: 55 }
    }
  }
];

export const fallbackResultType = {
  id: "adaptive-generalist",
  name: "適応型オールラウンダー",
  oneLiner: "状況に合わせて役割を切り替えられる柔軟タイプ。",
  description: "軸の偏りが少なく、編成や味方に合わせて最適化する立ち回りが得意です。"
};
