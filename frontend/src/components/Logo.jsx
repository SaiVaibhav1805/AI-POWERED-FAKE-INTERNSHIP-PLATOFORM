import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Logo({ className = "" }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-card-sm bg-primary-light border border-primary-200 transition-all duration-200 group-hover:bg-primary-100 group-hover:scale-105">
        <Shield className="h-5 w-5 text-primary" strokeWidth={2} />
      </div>
      <span className="text-lg font-bold tracking-tight text-heading font-display">
        Internship<span className="text-primary">Guard</span>
      </span>
    </Link>
  );
}
