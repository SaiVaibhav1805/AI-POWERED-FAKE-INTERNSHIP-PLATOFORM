import { ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";

export default function RiskCard({ riskLevel, isFake, recommendation }) {
  const config = {
    low: {
      border: "border-success-border dark:border-emerald-500/25",
      bg: "bg-success-light dark:bg-emerald-500/5",
      text: "text-success dark:text-emerald-400",
      icon: ShieldCheck,
      label: "Low Risk",
    },
    medium: {
      border: "border-warning-border dark:border-amber-500/25",
      bg: "bg-warning-light dark:bg-amber-500/5",
      text: "text-warning dark:text-amber-400",
      icon: AlertTriangle,
      label: "Medium Risk",
    },
    high: {
      border: "border-danger-border dark:border-red-500/25",
      bg: "bg-danger-light dark:bg-red-500/5",
      text: "text-danger dark:text-red-400",
      icon: ShieldAlert,
      label: "High Risk",
    },
  };

  const c = config[riskLevel] || config.medium;
  const Icon = c.icon;

  return (
    <div className={`rounded-card border ${c.border} ${c.bg} p-6 flex flex-col gap-4 h-full`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-card-sm border ${c.border} bg-white/60 dark:bg-white/5 flex items-center justify-center`}>
            <Icon className={`h-5 w-5 ${c.text}`} strokeWidth={2} />
          </div>
          <span className={`font-bold text-heading-md font-display ${c.text}`}>{c.label}</span>
        </div>
        <span className={isFake ? "badge-danger" : "badge-success"}>
          {isFake ? "Fake" : "Legitimate"}
        </span>
      </div>

      <div className="border-t border-current/10 pt-4">
        <p className="text-overline uppercase tracking-widest font-semibold text-body dark:text-slate-400 mb-2">
          Recommendation
        </p>
        <p className="text-body-md text-heading dark:text-white leading-relaxed">{recommendation}</p>
      </div>
    </div>
  );
}
