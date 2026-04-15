export function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = Math.round((current / total) * 100);
  const remaining = total - current;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          {current} / {total} 問
        </span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded bg-slate-700" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
        <div className="h-full bg-accent transition-all" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-xs text-muted">残り {Math.max(0, remaining)} 問</p>
    </div>
  );
}
