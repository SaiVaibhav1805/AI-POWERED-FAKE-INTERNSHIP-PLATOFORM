import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-border dark:border-dark-border bg-surface-secondary dark:bg-dark-secondary transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-card-sm bg-primary-light dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 transition-colors group-hover:bg-primary-100 dark:group-hover:bg-primary-500/20">
                <Shield className="h-5 w-5 text-primary dark:text-primary-400" strokeWidth={2} />
              </div>
              <span className="text-heading-md text-heading dark:text-white font-display">
                Internship<span className="text-primary dark:text-primary-400">Guard</span>
              </span>
            </Link>
            <p className="text-body-sm text-muted dark:text-slate-500 mt-4 leading-relaxed max-w-xs">
              AI-powered protection against fraudulent internship postings. Helping students make informed decisions.
            </p>
          </div>

          {/* Product column */}
          <div>
            <h4 className="text-body-sm font-semibold text-heading dark:text-white mb-4">Product</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="#features" className="text-body-sm text-body dark:text-slate-400 hover:text-primary dark:hover:text-primary-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-body-sm text-body dark:text-slate-400 hover:text-primary dark:hover:text-primary-400 transition-colors">
                  How it Works
                </a>
              </li>
              <li>
                <Link to="/analyze" className="text-body-sm text-body dark:text-slate-400 hover:text-primary dark:hover:text-primary-400 transition-colors">
                  Analyze a Posting
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h4 className="text-body-sm font-semibold text-heading dark:text-white mb-4">Resources</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/dashboard" className="text-body-sm text-body dark:text-slate-400 hover:text-primary dark:hover:text-primary-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/reports" className="text-body-sm text-body dark:text-slate-400 hover:text-primary dark:hover:text-primary-400 transition-colors">
                  Saved Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Docs column */}
          <div>
            <h4 className="text-body-sm font-semibold text-heading dark:text-white mb-4">Docs</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://github.com/SaiVaibhav1805/AI-POWERED-FAKE-INTERNSHIP-PLATOFORM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-body-sm text-body dark:text-slate-400 hover:text-primary dark:hover:text-primary-400 transition-colors"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-surface-border dark:border-dark-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-caption text-muted dark:text-slate-600">
            © {currentYear} InternshipGuard. All rights reserved.
          </p>
          <p className="text-caption text-muted dark:text-slate-600">
            Built with AI to protect students worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
