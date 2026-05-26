import { CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function FlagList({ flags }) {
  if (!flags || flags.length === 0) {
    return (
      <div className="flex items-center gap-3 rounded-card-sm border border-success-border bg-success-light px-4 py-3">
        <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
        <p className="text-success text-body-sm">No red flags detected in this posting.</p>
      </div>
    );
  }

  const severityConfig = {
    high: {
      color: "text-danger",
      bg: "bg-danger-light",
      border: "border-danger-border",
      icon: AlertCircle,
    },
    medium: {
      color: "text-warning",
      bg: "bg-warning-light",
      border: "border-warning-border",
      icon: AlertCircle,
    },
    low: {
      color: "text-body",
      bg: "bg-surface-secondary",
      border: "border-surface-border",
      icon: Info,
    },
  };

  const sorted = [...flags].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.severity] - order[b.severity];
  });

  return (
    <div className="flex flex-col gap-2">
      <p className="text-body text-caption mb-1">
        {flags.length} red flag{flags.length > 1 ? "s" : ""} detected
      </p>
      {sorted.map((flag, i) => {
        const c = severityConfig[flag.severity] || severityConfig.low;
        const Icon = c.icon;
        return (
          <div
            key={i}
            className={`flex items-center gap-3 px-4 py-3 rounded-card-sm border ${c.border} ${c.bg}`}
          >
            <Icon className={`h-4 w-4 flex-shrink-0 ${c.color}`} strokeWidth={2} />
            <span className={`text-body-sm flex-1 ${c.color} capitalize`}>{flag.flag}</span>
            <span className={`text-overline uppercase font-semibold tracking-wide ${c.color}`}>
              {flag.severity}
            </span>
          </div>
        );
      })}
    </div>
  );
}
