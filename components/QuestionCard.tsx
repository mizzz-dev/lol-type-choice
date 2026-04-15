import type { Question } from "@/lib/types";

const options = [
  { label: "まったく当てはまらない", value: -2 },
  { label: "あまり当てはまらない", value: -1 },
  { label: "どちらでもない", value: 0 },
  { label: "やや当てはまる", value: 1 },
  { label: "とても当てはまる", value: 2 }
] as const;

export function QuestionCard({
  question,
  value,
  onSelect
}: {
  question: Question;
  value?: number;
  onSelect: (value: -2 | -1 | 0 | 1 | 2) => void;
}) {
  return (
    <div className="card space-y-4">
      <p className="text-sm text-muted">Q{question.order}</p>
      <h2 className="text-xl font-semibold">{question.text}</h2>
      <div className="grid gap-2">
        {options.map((option) => {
          const isActive = option.value === value;

          return (
            <button
              type="button"
              key={option.label}
              className={`rounded-lg border px-4 py-3 text-left text-sm transition ${
                isActive
                  ? "border-accent bg-cyan-300/10 text-cyan-200"
                  : "border-slate-700 hover:border-slate-500 hover:bg-slate-800"
              }`}
              onClick={() => onSelect(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
