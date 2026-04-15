import { AXIS_KEYS, type AxisScores } from "@/lib/types";

const axisLabel: Record<(typeof AXIS_KEYS)[number], string> = {
  initiative: "主導性",
  riskTolerance: "リスク許容度",
  decisionStyle: "判断様式",
  winCondition: "勝ち筋志向",
  combatRange: "戦闘距離嗜好",
  processing: "情報処理傾向",
  tempo: "ゲームテンポ嗜好",
  responsibility: "責任領域"
};

export function AxisBars({ scores }: { scores: AxisScores }) {
  return (
    <div className="grid gap-3">
      {AXIS_KEYS.map((axis) => (
        <div key={axis} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{axisLabel[axis]}</span>
            <span className="text-muted">{scores[axis]}</span>
          </div>
          <div className="h-2 overflow-hidden rounded bg-slate-700">
            <div className="h-full bg-accent" style={{ width: `${scores[axis]}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
