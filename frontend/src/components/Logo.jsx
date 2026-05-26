import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Logo({ className = "" }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-card-sm bg-primary-light dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 transition-all duration-200 group-hover:bg-primary-100 dark:group-hover:bg-primary-500/20 group-hover:scale-105">
        <Shield className="h-5 w-5 text-primary dark:text-primary-400" strokeWidth={2} />
      </div>
      <span className="text-lg font-bold tracking-tight text-heading dark:text-white font-display">
        Internship<span className="text-primary dark:text-primary-400">Guard</span>
      </span>
    </Link>
  );
}
