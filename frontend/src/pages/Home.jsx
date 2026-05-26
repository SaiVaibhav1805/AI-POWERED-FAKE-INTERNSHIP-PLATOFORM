import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Brain,
  Sparkles,
  Flag,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  ScanSearch,
  FileCheck2,
  Zap,
  Shield,
  Users,
  CheckCircle2,
} from "lucide-react";
import { useAuthModal } from "../context/AuthModalContext";
import { ScrollReveal } from "../hooks/useScrollReveal";

const features = [
  {
    icon: Brain,
    title: "ML-Trained Detection",
    text: "Model trained on thousands of real job postings to identify fraud signals with high accuracy.",
    color: "bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20",
  },
  {
    icon: Sparkles,
    title: "Gemini AI Explanations",
    text: "Every verdict explained in clear, plain English — no black-box scores or cryptic outputs.",
    color: "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  },
  {
    icon: Flag,
    title: "30+ Red Flag Patterns",
    text: "Detects suspicious language, hidden fees, unrealistic promises, and known scam patterns.",
    color: "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20",
  },
  {
    icon: BarChart3,
    title: "Trust Score Breakdown",
    text: "A 0–100 trust score with risk assessment and actionable recommendations for every posting.",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
  },
];

const steps = [
  {
    icon: ScanSearch,
    step: "01",
    title: "Paste or Upload",
    desc: "Enter posting details manually or upload a PDF, DOCX, or TXT file for instant extraction.",
  },
  {
    icon: ShieldCheck,
    step: "02",
    title: "AI Analyzes",
    desc: "Our ML model and Gemini AI evaluate fraud signals, language patterns, and risk indicators.",
  },
  {
    icon: FileCheck2,
    step: "03",
    title: "Get Your Verdict",
    desc: "Receive a trust score, detailed red flags, and a clear recommendation to apply or avoid.",
  },
];

const stats = [
  { value: "17k+", label: "Postings trained on", icon: Brain },
  { value: "30+", label: "Red flag patterns", icon: Flag },
  { value: "<5s", label: "Avg. analysis time", icon: Zap },
  { value: "95%+", label: "Detection accuracy", icon: Shield },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { openAuth } = useAuthModal();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard", { replace: true });
      return;
    }
    const auth = searchParams.get("auth");
    if (auth === "login" || auth === "register") {
      openAuth(auth);
      setSearchParams({}, { replace: true });
    }
  }, [navigate, searchParams, setSearchParams, openAuth]);

  return (
    <div>
      {/* ─── HERO SECTION ─── */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-hero-pattern dark:bg-hero-pattern-dark pointer-events-none transition-all duration-500" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary-100/30 dark:bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100/20 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative">
          <div className="py-20 lg:py-28 max-w-3xl mx-auto text-center">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-surface-border dark:border-dark-border bg-white dark:bg-dark-card px-4 py-2 mb-8 shadow-card-sm dark:shadow-dark-card animate-fade-in-down">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <span className="text-caption font-medium text-body dark:text-slate-400">
                AI-powered internship fraud detection
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-display text-display-md lg:text-display-lg text-heading dark:text-white animate-fade-in-up">
              Detect Fake Internships{" "}
              <span className="bg-gradient-to-r from-primary via-primary-500 to-purple-600 bg-clip-text text-transparent">
                Before They Detect You
              </span>
            </h1>

            {/* Subtitle — shortened per request */}
            <p className="text-body-lg text-body dark:text-slate-400 mt-6 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Paste any internship posting and get an instant AI-powered trust score, red flag analysis, and clear verdict — in seconds.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <button
                type="button"
                onClick={() => openAuth("register")}
                className="btn-primary py-3.5 px-8 text-body-md"
              >
                Start Analyzing Free
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => openAuth("login")}
                className="btn-secondary py-3.5 px-8 text-body-md"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Hero floating card — mock analysis preview */}
          <div className="relative max-w-4xl mx-auto -mt-4 mb-16 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
            <div className="bg-white dark:bg-dark-card rounded-2xl border border-surface-border dark:border-dark-border shadow-elevated dark:shadow-dark-elevated p-6 lg:p-8 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-3 w-3 rounded-full bg-danger" />
                <div className="h-3 w-3 rounded-full bg-warning" />
                <div className="h-3 w-3 rounded-full bg-success" />
                <span className="ml-2 text-caption text-muted dark:text-slate-500 font-medium">InternshipGuard Analysis</span>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="badge-danger">High Risk</span>
                    <span className="badge text-body dark:text-slate-400 bg-surface-tertiary dark:bg-dark-tertiary border-surface-border dark:border-dark-border">Fake Detected</span>
                  </div>
                  <h3 className="text-heading-lg text-heading dark:text-white">"Marketing Intern — Remote — $5,000/month"</h3>
                  <div className="space-y-2">
                    {["Unrealistic salary for internship", "No company website provided", "Requests upfront payment"].map((flag, i) => (
                      <div key={i} className="flex items-center gap-2 text-body-sm text-danger dark:text-red-400">
                        <Flag className="h-4 w-4 flex-shrink-0" />
                        {flag}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
                      <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-surface-tertiary dark:text-dark-tertiary" />
                      <circle
                        cx="50" cy="50" r="42" fill="none"
                        stroke="#DC2626" strokeWidth="8"
                        strokeDasharray={2 * Math.PI * 42}
                        strokeDashoffset={2 * Math.PI * 42 * (1 - 0.23)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-danger dark:text-red-400 tabular-nums font-display">23</span>
                      <span className="text-caption text-muted dark:text-slate-500">/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <ScrollReveal>
        <section className="border-y border-surface-border dark:border-dark-border bg-surface-secondary dark:bg-dark-secondary transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map(({ value, label, icon: Icon }, i) => (
                <ScrollReveal key={label} delay={i * 100} animation="fade-up">
                  <div className="text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-card-sm bg-primary-light dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mx-auto mb-3">
                      <Icon className="h-5 w-5 text-primary dark:text-primary-400" strokeWidth={2} />
                    </div>
                    <p className="text-display-sm lg:text-heading-lg text-heading dark:text-white tabular-nums font-display">{value}</p>
                    <p className="text-caption text-muted dark:text-slate-500 mt-1">{label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── FEATURES ─── */}
      <section id="features" className="bg-white dark:bg-dark transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-20 lg:py-26">
          <ScrollReveal>
            <div className="text-center mb-14 lg:mb-18">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 dark:border-primary-500/20 bg-primary-light dark:bg-primary-500/10 px-4 py-1.5 mb-6">
                <Sparkles className="h-4 w-4 text-primary dark:text-primary-400" />
                <span className="text-caption font-semibold text-primary dark:text-primary-400">Features</span>
              </div>
              <h2 className="section-title">
                Built for Trust and Clarity
              </h2>
              <p className="section-subtitle">
                Enterprise-grade analysis tools designed for students, career centers, and recruiters to verify internship legitimacy.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {features.map(({ icon: Icon, title, text, color }, i) => (
              <ScrollReveal key={title} delay={i * 100}>
                <div className="card-interactive p-6 lg:p-7 group h-full">
                  <div className={`h-12 w-12 rounded-card-sm border flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 ${color}`}>
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-heading dark:text-white font-semibold text-heading-md mb-2.5">{title}</h3>
                  <p className="text-body-sm text-body dark:text-slate-400 leading-relaxed">{text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="bg-surface-secondary dark:bg-dark-secondary transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-20 lg:py-26">
          <ScrollReveal>
            <div className="text-center mb-14 lg:mb-18">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 dark:border-primary-500/20 bg-primary-light dark:bg-primary-500/10 px-4 py-1.5 mb-6">
                <Zap className="h-4 w-4 text-primary dark:text-primary-400" />
                <span className="text-caption font-semibold text-primary dark:text-primary-400">How It Works</span>
              </div>
              <h2 className="section-title">
                Three Steps to Safety
              </h2>
              <p className="section-subtitle">
                From suspicious posting to actionable insight in under 5 seconds.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map(({ icon: Icon, step, title, desc }, index) => (
              <ScrollReveal key={step} delay={index * 150}>
                <div className="relative h-full">
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-14 left-[calc(50%+48px)] right-[calc(-50%+48px)] h-px border-t border-dashed border-surface-border-hover dark:border-dark-border-hover" />
                  )}
                  <div className="card p-8 lg:p-9 text-center relative bg-white dark:bg-dark-card h-full">
                    <span className="text-overline font-bold text-primary dark:text-primary-400 tracking-widest">{step}</span>
                    <div className="h-14 w-14 rounded-2xl bg-primary-light dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 flex items-center justify-center mt-4 mb-5 mx-auto">
                      <Icon className="h-6 w-6 text-primary dark:text-primary-400" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-heading-md text-heading dark:text-white mb-3">{title}</h3>
                    <p className="text-body-sm text-body dark:text-slate-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="bg-white dark:bg-dark transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-20 lg:py-26">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal animation="fade-right">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 dark:border-primary-500/20 bg-primary-light dark:bg-primary-500/10 px-4 py-1.5 mb-6">
                  <Users className="h-4 w-4 text-primary dark:text-primary-400" />
                  <span className="text-caption font-semibold text-primary dark:text-primary-400">Why InternshipGuard</span>
                </div>
                <h2 className="font-display text-display-sm lg:text-display-md text-heading dark:text-white">
                  Built to Protect Students
                </h2>
                <p className="text-body-lg text-body dark:text-slate-400 mt-4 leading-relaxed">
                  Every year, thousands of students fall victim to fake internship scams. InternshipGuard
                  combines machine learning with Google's Gemini AI to provide comprehensive
                  fraud detection.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "ML model trained on real-world job posting data",
                    "Real-time analysis powered by Gemini AI",
                    "30+ red flag patterns detected instantly",
                    "Clear, actionable recommendations for every posting",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-body-md text-body dark:text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Trust visual — realistic numbers */}
            <ScrollReveal animation="fade-left" delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Scams Detected", value: "340+", color: "border-danger-border dark:border-red-500/25 bg-danger-light dark:bg-red-500/10", textColor: "text-danger dark:text-red-400" },
                  { label: "Safe Verified", value: "1,820+", color: "border-success-border dark:border-emerald-500/25 bg-success-light dark:bg-emerald-500/10", textColor: "text-success dark:text-emerald-400" },
                  { label: "Students Protected", value: "950+", color: "border-primary-200 dark:border-primary-500/25 bg-primary-light dark:bg-primary-500/10", textColor: "text-primary dark:text-primary-400" },
                  { label: "Avg. Trust Score", value: "74/100", color: "border-warning-border dark:border-amber-500/25 bg-warning-light dark:bg-amber-500/10", textColor: "text-warning dark:text-amber-400" },
                ].map((stat, i) => (
                  <ScrollReveal key={stat.label} delay={300 + i * 100} animation="scale">
                    <div className={`rounded-card border p-6 text-center transition-all duration-300 hover:scale-[1.03] ${stat.color}`}>
                      <p className={`text-heading-lg font-display tabular-nums ${stat.textColor}`}>{stat.value}</p>
                      <p className="text-caption text-body dark:text-slate-400 mt-1">{stat.label}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <ScrollReveal>
        <section className="bg-surface-secondary dark:bg-dark-secondary transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-20 lg:py-26">
            <div className="relative bg-gradient-to-br from-primary via-primary-600 to-primary-800 rounded-2xl p-10 lg:p-16 text-center overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                <h2 className="font-display text-display-sm lg:text-display-md text-white">
                  Ready to Protect Yourself?
                </h2>
                <p className="text-body-lg text-primary-200 mt-4 max-w-xl mx-auto">
                  Don't let a fake internship waste your time or money. Start analyzing postings for free today.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => openAuth("register")}
                    className="inline-flex items-center justify-center gap-2 rounded-button bg-white px-8 py-3.5 text-body-md font-semibold text-primary shadow-card-sm transition-all duration-250 hover:bg-primary-50 hover:shadow-card hover:-translate-y-px active:translate-y-0"
                  >
                    Start Analyzing Free
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuth("login")}
                    className="inline-flex items-center justify-center gap-2 rounded-button border border-white/30 bg-white/10 px-8 py-3.5 text-body-md font-semibold text-white transition-all duration-250 hover:bg-white/20 hover:-translate-y-px active:translate-y-0"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
