export default function StatCard({ label, value, icon: Icon, accent = "primary" }) {
  const accents = {
    primary: {
      icon: "text-primary dark:text-primary-400 bg-primary-light dark:bg-primary-500/10 border-primary-200 dark:border-primary-500/20",
      value: "text-heading dark:text-white",
    },
    success: {
      icon: "text-success dark:text-emerald-400 bg-success-light dark:bg-emerald-500/10 border-success-border dark:border-emerald-500/20",
      value: "text-success dark:text-emerald-400",
    },
    warning: {
      icon: "text-warning dark:text-amber-400 bg-warning-light dark:bg-amber-500/10 border-warning-border dark:border-amber-500/20",
      value: "text-warning dark:text-amber-400",
    },
    danger: {
      icon: "text-danger dark:text-red-400 bg-danger-light dark:bg-red-500/10 border-danger-border dark:border-red-500/20",
      value: "text-danger dark:text-red-400",
    },
  };

  const a = accents[accent] || accents.primary;

  return (
    <div className="card p-5 lg:p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-card-hover dark:hover:shadow-dark-card-hover hover:-translate-y-0.5">
      <div className={`inline-flex h-11 w-11 items-center justify-center rounded-card-sm border ${a.icon}`}>
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <div>
        <p className={`text-2xl lg:text-3xl font-bold tabular-nums tracking-tight font-display ${a.value}`}>
          {value}
        </p>
        <p className="text-body dark:text-slate-400 text-caption font-medium mt-1">{label}</p>
      </div>
    </div>
  );
}
