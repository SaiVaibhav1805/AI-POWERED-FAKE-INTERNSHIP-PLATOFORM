import { useTheme } from "../context/ThemeContext";

/**
 * Minimal, elegant theme toggle with smooth animated icon transition.
 * Uses a custom SVG that morphs between a sun and moon shape.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle group"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <div className="relative h-[18px] w-[18px]">
        {/* Sun icon — visible in dark mode */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute inset-0 h-full w-full transition-all duration-500 ease-out ${
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-50"
          }`}
        >
          <circle
            cx="12" cy="12" r="4"
            className="stroke-amber-400"
            fill="none"
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 12 + 6.5 * Math.cos(rad);
            const y1 = 12 + 6.5 * Math.sin(rad);
            const x2 = 12 + 8.5 * Math.cos(rad);
            const y2 = 12 + 8.5 * Math.sin(rad);
            return (
              <line
                key={angle}
                x1={x1} y1={y1} x2={x2} y2={y2}
                className="stroke-amber-400"
              />
            );
          })}
        </svg>

        {/* Moon icon — visible in light mode */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute inset-0 h-full w-full transition-all duration-500 ease-out ${
            isDark
              ? "opacity-0 rotate-90 scale-50"
              : "opacity-100 rotate-0 scale-100"
          }`}
        >
          <path
            d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
            className="stroke-slate-500 dark:stroke-slate-400"
            fill="none"
          />
        </svg>
      </div>
    </button>
  );
}
