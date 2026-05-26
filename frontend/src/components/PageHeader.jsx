export default function PageHeader({ title, subtitle, action }) {
  const TitleTag = typeof title === "string" ? "h1" : "div";
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 lg:mb-10">
      <div>
        <TitleTag className="font-display text-display-sm lg:text-display-md text-heading">
          {title}
        </TitleTag>
        {subtitle && (
          <p className="text-body text-body-md mt-2 max-w-xl">{subtitle}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
