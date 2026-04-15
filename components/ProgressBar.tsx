export function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = Math.round((current / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          {current} / {total} 問
        </span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded bg-slate-700">
        <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
