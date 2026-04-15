import type { AxisKey, Question, QuestionOption } from "@/lib/types";

export const DEFAULT_OPTIONS: QuestionOption[] = [
  { label: "まったく当てはまらない", value: -2 },
  { label: "あまり当てはまらない", value: -1 },
  { label: "どちらでもない", value: 0 },
  { label: "やや当てはまる", value: 1 },
  { label: "とても当てはまる", value: 2 }
];

type QuestionSeed = {
  text: string;
  axis: AxisKey;
  weight: number;
  reverse: boolean;
  intent: string;
};

const questionSeeds: QuestionSeed[] = [
  // initiative
  { text: "レーン有利を取れそうなら、自分から先に仕掛けたい", axis: "initiative", weight: 1.2, reverse: false, intent: "主導的にアクションを起こす傾向" },
  { text: "味方の合図を待ってから戦闘を始めることが多い", axis: "initiative", weight: 1, reverse: true, intent: "受動的な戦闘開始傾向の逆転確認" },
  { text: "オブジェクト前はピンで先に集合を促す", axis: "initiative", weight: 1, reverse: false, intent: "戦術主導の姿勢" },
  { text: "少人数戦でチャンスを見たら即座に寄る", axis: "initiative", weight: 1.1, reverse: false, intent: "瞬発的エンゲージ傾向" },
  { text: "勝っている場面でも無理に先手は取らない", axis: "initiative", weight: 0.9, reverse: true, intent: "先手回避志向の確認" },
  { text: "集団戦の開戦役になることに抵抗が少ない", axis: "initiative", weight: 1, reverse: false, intent: "開戦担当への適性" },

  // riskTolerance
  { text: "リターンが大きいなら多少不利でも勝負する", axis: "riskTolerance", weight: 1.2, reverse: false, intent: "期待値重視でリスクを取るか" },
  { text: "五分の場面はまずデスしない選択を優先する", axis: "riskTolerance", weight: 1.1, reverse: true, intent: "安全志向の確認" },
  { text: "サモナースペル差があればタワーダイブも検討する", axis: "riskTolerance", weight: 1, reverse: false, intent: "高リスク判断許容" },
  { text: "視界がない場所には有利でも入りたくない", axis: "riskTolerance", weight: 1, reverse: true, intent: "不確実性回避の確認" },
  { text: "逆転のために1回の読み合いへ賭ける判断をする", axis: "riskTolerance", weight: 0.9, reverse: false, intent: "逆転狙いの賭け傾向" },
  { text: "有利時は危険行動を減らして確実に締めたい", axis: "riskTolerance", weight: 0.9, reverse: true, intent: "クローズ時の安定志向" },

  // decisionStyle
  { text: "事前プランより、その場の情報で判断を変えることが多い", axis: "decisionStyle", weight: 1.2, reverse: false, intent: "アドリブ志向" },
  { text: "試合前に決めた勝ち筋を最後まで重視したい", axis: "decisionStyle", weight: 1, reverse: true, intent: "計画遂行志向の確認" },
  { text: "予想外の展開でも役割を柔軟に切り替えられる", axis: "decisionStyle", weight: 1, reverse: false, intent: "役割転換の柔軟性" },
  { text: "ミニマップ情報より自分のレーンプランを優先する", axis: "decisionStyle", weight: 1, reverse: true, intent: "固定思考の逆転確認" },
  { text: "味方のミスに合わせてプランを即修正できる", axis: "decisionStyle", weight: 0.9, reverse: false, intent: "状況適応力" },
  { text: "毎試合ほぼ同じビルド進行のほうが安心する", axis: "decisionStyle", weight: 0.9, reverse: true, intent: "定型志向の確認" },

  // winCondition
  { text: "自分が育って試合を決める展開にやりがいを感じる", axis: "winCondition", weight: 1.2, reverse: false, intent: "自己キャリー志向" },
  { text: "キルより味方キャリーの生存を優先して動く", axis: "winCondition", weight: 1, reverse: true, intent: "支援勝利志向の確認" },
  { text: "ゴールドは自分に集めた方が勝ちやすいと思う", axis: "winCondition", weight: 1, reverse: false, intent: "リソース集中志向" },
  { text: "アシスト中心でもチームが勝てれば満足できる", axis: "winCondition", weight: 1, reverse: true, intent: "自己火力以外の勝利価値" },
  { text: "終盤の主火力担当としてプレッシャーを受けたい", axis: "winCondition", weight: 1, reverse: false, intent: "責任キャリー適性" },
  { text: "勝ち筋を作るために自分のリソースを譲ることが多い", axis: "winCondition", weight: 0.9, reverse: true, intent: "自己犠牲支援傾向" },

  // combatRange
  { text: "接近戦でプレッシャーをかけるほうが得意だ", axis: "combatRange", weight: 1.2, reverse: false, intent: "近接戦志向" },
  { text: "距離を保ちながら継続火力を出すのが好きだ", axis: "combatRange", weight: 1.1, reverse: true, intent: "遠隔戦志向の逆転確認" },
  { text: "前線で耐えながら戦う役割がしっくりくる", axis: "combatRange", weight: 1, reverse: false, intent: "前衛適性" },
  { text: "スキルショット中心の後衛運用が得意だ", axis: "combatRange", weight: 1, reverse: true, intent: "後衛適性確認" },
  { text: "乱戦で密着して判断する戦闘が好きだ", axis: "combatRange", weight: 1, reverse: false, intent: "近接乱戦耐性" },
  { text: "敵に触られない位置取りを常に優先したい", axis: "combatRange", weight: 0.9, reverse: true, intent: "安全距離維持志向" },

  // processing
  { text: "複数のクールダウン管理を同時に行うのが苦ではない", axis: "processing", weight: 1.2, reverse: false, intent: "高処理負荷耐性" },
  { text: "操作はシンプルなほうが安定して勝ちやすい", axis: "processing", weight: 1.1, reverse: true, intent: "低処理負荷志向" },
  { text: "入力難度が高いチャンプでも練習して使いたい", axis: "processing", weight: 1, reverse: false, intent: "高難度受容" },
  { text: "集団戦では使うスキルを絞ったほうが良い結果になる", axis: "processing", weight: 1, reverse: true, intent: "簡素化志向確認" },
  { text: "細かいトレード計算をしながら戦うのが好きだ", axis: "processing", weight: 1, reverse: false, intent: "情報処理好み" },
  { text: "判断量が多いとミスが増えるので定型化したい", axis: "processing", weight: 0.9, reverse: true, intent: "負荷回避傾向" },

  // tempo
  { text: "序盤から主導権を握って早めに試合を動かしたい", axis: "tempo", weight: 1.2, reverse: true, intent: "早期決着志向の逆転確認" },
  { text: "序盤は耐えて中盤以降の伸びで勝つほうが得意だ", axis: "tempo", weight: 1.2, reverse: false, intent: "後半スケール志向" },
  { text: "レベル6前の小競り合いに価値を感じる", axis: "tempo", weight: 1, reverse: true, intent: "序盤加速志向確認" },
  { text: "序盤不利でも焦らず装備完成を待てる", axis: "tempo", weight: 1, reverse: false, intent: "遅延耐性" },
  { text: "20分前後で勝敗を決める展開が好きだ", axis: "tempo", weight: 0.9, reverse: true, intent: "高速ゲーム志向" },
  { text: "試合が長引くほど自分の強みが出ると感じる", axis: "tempo", weight: 0.9, reverse: false, intent: "ロングゲーム適性" },

  // responsibility
  { text: "自レーンだけでなくマップ全体を見て動きたい", axis: "responsibility", weight: 1.2, reverse: false, intent: "全体責任志向" },
  { text: "ピンやコールを積極的に出すほうだ", axis: "responsibility", weight: 1.1, reverse: false, intent: "チーム誘導姿勢" },
  { text: "味方の視界づくりやウェーブ調整まで意識する", axis: "responsibility", weight: 1, reverse: false, intent: "周辺業務への責任感" },
  { text: "まずは自分のレーン結果だけに集中したい", axis: "responsibility", weight: 1, reverse: true, intent: "局所責任の確認" },
  { text: "集団戦前に味方の立ち位置を気にして声をかける", axis: "responsibility", weight: 1, reverse: false, intent: "チーム調整役適性" },
  { text: "他レーン状況を追うより自分のCSを優先しがちだ", axis: "responsibility", weight: 0.9, reverse: true, intent: "自己完結志向の逆転確認" }
];

export const questions: Question[] = questionSeeds.map((seed, index) => ({
  text: seed.text,
  reverse: seed.reverse,
  weights: [{ axis: seed.axis, weight: seed.weight }],
  intent: seed.intent,
  id: `q${String(index + 1).padStart(2, "0")}`,
  order: index + 1,
  options: DEFAULT_OPTIONS
}));
