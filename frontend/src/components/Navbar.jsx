import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Search,
  FileText,
  LogOut,
} from "lucide-react";
import Logo from "./Logo";
import { useAuthModal } from "../context/AuthModalContext";

const navLinkClass = (active) =>
  `text-body-sm font-medium transition-all duration-200 relative ${
    active
      ? "text-primary"
      : "text-body hover:text-heading"
  }`;

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openAuth } = useAuthModal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setMobileOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const appLinks = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/analyze", label: "Analyze", icon: Search },
    { to: "/reports", label: "Reports", icon: FileText },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-card-sm border-b border-surface-border"
          : "bg-white border-b border-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {!token ? (
            <>
              <a href="#features" className={navLinkClass(false)}>
                Features
              </a>
              <a href="#how-it-works" className={navLinkClass(false)}>
                How it works
              </a>
            </>
          ) : (
            appLinks.map(({ to, label }) => (
              <Link key={to} to={to} className={navLinkClass(isActive(to))}>
                {label}
                {isActive(to) && (
                  <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))
          )}
        </div>

        {/* Desktop CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          {token ? (
            <button type="button" onClick={handleLogout} className="btn-secondary !py-2">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          ) : (
            <>
              <button type="button" onClick={() => openAuth("login")} className="btn-ghost">
                Log in
              </button>
              <button type="button" onClick={() => openAuth("register")} className="btn-primary">
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden btn-ghost !p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-surface-border bg-white px-5 py-4 flex flex-col gap-1 animate-fade-in-down shadow-card">
          {!token ? (
            <>
              <a href="#features" className="btn-ghost justify-start" onClick={() => setMobileOpen(false)}>
                Features
              </a>
              <a href="#how-it-works" className="btn-ghost justify-start" onClick={() => setMobileOpen(false)}>
                How it works
              </a>
              <div className="border-t border-surface-border my-2" />
              <button type="button" className="btn-ghost justify-start" onClick={() => { openAuth("login"); setMobileOpen(false); }}>
                Log in
              </button>
              <button type="button" className="btn-primary w-full mt-1" onClick={() => { openAuth("register"); setMobileOpen(false); }}>
                Get Started
              </button>
            </>
          ) : (
            <>
              {appLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={`btn-ghost justify-start gap-3 ${
                    isActive(to) ? "!text-primary !bg-primary-light" : ""
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
              <div className="border-t border-surface-border my-2" />
              <button type="button" className="btn-ghost justify-start text-danger" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
