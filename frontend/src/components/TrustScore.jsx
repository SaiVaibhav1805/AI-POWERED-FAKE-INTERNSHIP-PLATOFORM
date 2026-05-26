export default function TrustScore({ score }) {
  const getColor = () => {
    if (score >= 70) return { stroke: "#059669", darkStroke: "#34D399", text: "text-success dark:text-emerald-400", label: "Trusted" };
    if (score >= 40) return { stroke: "#D97706", darkStroke: "#FBBF24", text: "text-warning dark:text-amber-400", label: "Suspicious" };
    return { stroke: "#DC2626", darkStroke: "#F87171", text: "text-danger dark:text-red-400", label: "High Risk" };
  };

  const { stroke, text, label } = getColor();
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
          <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="8" className="text-surface-tertiary dark:text-dark-tertiary" />
          <circle
            cx="50" cy="50" r={radius} fill="none"
            stroke={stroke} strokeWidth="8"
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold tabular-nums font-display ${text}`}>{score}</span>
          <span className="text-muted dark:text-slate-500 text-caption">/ 100</span>
        </div>
      </div>
      <span className={`text-body-sm font-semibold ${text}`}>{label}</span>
      <span className="text-muted dark:text-slate-500 text-overline uppercase tracking-widest">Trust Score</span>
    </div>
  );
}
