export default function TrustScore({ score }) {
  const getColor = () => {
    if (score >= 70) return { stroke: "#059669", text: "text-success", label: "Trusted" };
    if (score >= 40) return { stroke: "#D97706", text: "text-warning", label: "Suspicious" };
    return { stroke: "#DC2626", text: "text-danger", label: "High Risk" };
  };

  const { stroke, text, label } = getColor();
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#F1F5F9" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold tabular-nums font-display ${text}`}>{score}</span>
          <span className="text-muted text-caption">/ 100</span>
        </div>
      </div>
      <span className={`text-body-sm font-semibold ${text}`}>{label}</span>
      <span className="text-muted text-overline uppercase tracking-widest">Trust Score</span>
    </div>
  );
}
