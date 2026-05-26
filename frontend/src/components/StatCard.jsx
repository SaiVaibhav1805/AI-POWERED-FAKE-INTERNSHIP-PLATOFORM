export default function StatCard({ label, value, icon: Icon, accent = "primary" }) {
  const accents = {
    primary: {
      icon: "text-primary bg-primary-light border-primary-200",
      value: "text-heading",
    },
    success: {
      icon: "text-success bg-success-light border-success-border",
      value: "text-success",
    },
    warning: {
      icon: "text-warning bg-warning-light border-warning-border",
      value: "text-warning",
    },
    danger: {
      icon: "text-danger bg-danger-light border-danger-border",
      value: "text-danger",
    },
  };

  const a = accents[accent] || accents.primary;

  return (
    <div className="card p-5 lg:p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
      <div
        className={`inline-flex h-11 w-11 items-center justify-center rounded-card-sm border ${a.icon}`}
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <div>
        <p className={`text-2xl lg:text-3xl font-bold tabular-nums tracking-tight font-display ${a.value}`}>
          {value}
        </p>
        <p className="text-body text-caption font-medium mt-1">{label}</p>
      </div>
    </div>
  );
}
