import type { ResultType } from "@/lib/types";

export const resultTypes: ResultType[] = [
  {
    id: "vanguard-carry",
    name: "先導キャリー型",
    oneLiner: "自ら開戦を作り、主導権で勝ち切るタイプ。",
    description: "先手を取る意思が強く、試合の流れを自分で作るほどパフォーマンスが上がります。",
    strengths: ["開戦判断が速い", "勝負所でリスクを取れる", "テンポを作りやすい"],
    caution: "先行しすぎると孤立しやすいため、味方追従の確認を忘れないのが安定します。",
    conditions: { initiative: { min: 68 }, winCondition: { min: 62 }, riskTolerance: { min: 58 } }
  },
  {
    id: "map-director",
    name: "マップ設計型",
    oneLiner: "視界・寄り・オブジェクト管理で勝率を底上げするタイプ。",
    description: "全体最適で試合を見る力が高く、派手さより再現性ある勝ち筋づくりが得意です。",
    strengths: ["全体把握が得意", "コールの価値が高い", "安定した試合運び"],
    caution: "自分のリソース不足で失速しないよう、最低限の経験値確保を意識しましょう。",
    conditions: { responsibility: { min: 66 }, winCondition: { max: 48 } }
  },
  {
    id: "adaptive-skirmisher",
    name: "適応スカーミッシュ型",
    oneLiner: "状況変化に強く、小競り合いで差を作るタイプ。",
    description: "固定プランに縛られず、局所戦で有利交換を取り続ける柔軟性が武器です。",
    strengths: ["判断切り替えが速い", "少人数戦が得意", "不利展開でも再起しやすい"],
    caution: "毎回違う判断になりすぎると味方とズレるため、重要局面だけは方針共有が有効です。",
    conditions: { decisionStyle: { min: 64 }, initiative: { min: 56 } }
  },
  {
    id: "late-game-specialist",
    name: "終盤スケール型",
    oneLiner: "時間を味方にして終盤の高出力で勝つタイプ。",
    description: "序盤の小さな損失を受け流し、装備完成後に確実に勝ち切るプレイが得意です。",
    strengths: ["終盤火力の活用が上手い", "焦らず判断できる", "再現性の高い勝ち筋"],
    caution: "序盤の受け身が過剰だと主導権を失うため、最低限のオブジェクト関与は確保しましょう。",
    conditions: { tempo: { min: 62 }, winCondition: { min: 52 } }
  },
  {
    id: "frontline-anchor",
    name: "前線アンカー型",
    oneLiner: "近接戦で前線を維持し、味方の出力を支えるタイプ。",
    description: "前衛としての役割遂行力が高く、集団戦で陣形を整える力が勝敗に直結します。",
    strengths: ["前線維持が安定", "エンゲージ耐性が高い", "味方保護が得意"],
    caution: "前に立つだけでなく、味方キャリーとの距離管理を意識すると勝率が伸びます。",
    conditions: { combatRange: { min: 60 }, responsibility: { min: 52 }, winCondition: { max: 58 } }
  },
  {
    id: "precision-backliner",
    name: "精密バックライン型",
    oneLiner: "安全距離と継続火力で勝負するタイプ。",
    description: "被弾を抑えながらダメージ期待値を伸ばすのが得意で、後衛運用の安定感が高いです。",
    strengths: ["位置取りが丁寧", "継続火力を出しやすい", "被弾管理が上手い"],
    caution: "前線任せになりすぎると主導権を失うため、射程優位を使った先削りを意識しましょう。",
    conditions: { combatRange: { max: 44 }, riskTolerance: { max: 56 } }
  },
  {
    id: "steady-executor",
    name: "安定遂行型",
    oneLiner: "役割を確実に遂行して勝率を積むタイプ。",
    description: "過度な博打を避け、ミスを減らしながら勝ち筋を積み上げる堅実さが強みです。",
    strengths: ["判断の再現性が高い", "事故が少ない", "チームとの整合性が高い"],
    caution: "受け身になりすぎると逆転機会を逃すため、明確な有利時は強気に行くのが効果的です。",
    conditions: { initiative: { max: 56 }, riskTolerance: { max: 48 }, decisionStyle: { max: 54 } }
  },
  {
    id: "balanced-generalist",
    name: "バランス型オールラウンダー",
    oneLiner: "編成と相手に合わせて柔軟に最適化できるタイプ。",
    description: "軸の偏りが少なく、ピックや役割を状況に合わせて調整することで価値を出せます。",
    strengths: ["対応幅が広い", "編成相性を埋めやすい", "苦手が少ない"],
    caution: "器用貧乏を避けるため、毎試合1つの勝ち筋を明確に決めると強みが出やすいです。",
    conditions: {}
  }
];

export const fallbackResultType = resultTypes[resultTypes.length - 1];
