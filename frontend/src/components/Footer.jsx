import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-border bg-surface-secondary">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-card-sm bg-primary-light border border-primary-200 transition-colors group-hover:bg-primary-100">
                <Shield className="h-5 w-5 text-primary" strokeWidth={2} />
              </div>
              <span className="text-heading-md text-heading">
                Internship<span className="text-primary">Guard</span>
              </span>
            </Link>
            <p className="text-body-sm text-muted mt-4 leading-relaxed max-w-xs">
              AI-powered protection against fraudulent internship postings. Helping students make informed decisions.
            </p>
          </div>

          {/* Product column */}
          <div>
            <h4 className="text-body-sm font-semibold text-heading mb-4">Product</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="#features" className="text-body-sm text-body hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-body-sm text-body hover:text-primary transition-colors">
                  How it Works
                </a>
              </li>
              <li>
                <Link to="/analyze" className="text-body-sm text-body hover:text-primary transition-colors">
                  Analyze
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h4 className="text-body-sm font-semibold text-heading mb-4">Resources</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/dashboard" className="text-body-sm text-body hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/reports" className="text-body-sm text-body hover:text-primary transition-colors">
                  Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust column */}
          <div>
            <h4 className="text-body-sm font-semibold text-heading mb-4">Trust & Safety</h4>
            <ul className="flex flex-col gap-3">
              <li className="text-body-sm text-body">Privacy Policy</li>
              <li className="text-body-sm text-body">Terms of Service</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-surface-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-caption text-muted">
            © {currentYear} InternshipGuard. All rights reserved.
          </p>
          <p className="text-caption text-muted">
            Protecting students from fraudulent internship postings.
          </p>
        </div>
      </div>
    </footer>
  );
}
