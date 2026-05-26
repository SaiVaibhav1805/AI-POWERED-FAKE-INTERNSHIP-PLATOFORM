import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Shield } from "lucide-react";
import { loginUser, registerUser } from "../api/api";

export default function AuthModal({ isOpen, onClose, initialMode = "login" }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    setIsLogin(initialMode === "login");
    setError("");
  }, [initialMode, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let res;
      if (isLogin) {
        const formData = new URLSearchParams();
        formData.append("username", form.email);
        formData.append("password", form.password);
        res = await loginUser(formData);
      } else {
        res = await registerUser({
          name: form.name,
          email: form.email,
          password: form.password,
        });
      }
      localStorage.setItem("token", res.data.access_token);
      onClose();
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-heading/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-surface-border shadow-modal p-8 animate-scale-in">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 h-8 w-8 rounded-lg flex items-center justify-center text-muted hover:text-heading hover:bg-surface-tertiary transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light border border-primary-200">
            <Shield className="h-4 w-4 text-primary" strokeWidth={2} />
          </div>
          <span className="text-body-md font-bold text-heading font-display">
            Internship<span className="text-primary">Guard</span>
          </span>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-surface-secondary rounded-card-sm p-1 mb-8 border border-surface-border">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(""); }}
            className={`flex-1 py-2.5 rounded-lg text-body-sm font-semibold transition-all duration-200 ${
              isLogin ? "tab-active" : "tab-inactive"
            }`}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(""); }}
            className={`flex-1 py-2.5 rounded-lg text-body-sm font-semibold transition-all duration-200 ${
              !isLogin ? "tab-active" : "tab-inactive"
            }`}
          >
            Register
          </button>
        </div>

        {/* Heading */}
        <h2 id="auth-modal-title" className="font-display text-heading-lg text-heading">
          {isLogin ? "Welcome back" : "Create your account"}
        </h2>
        <p className="text-body text-body-sm mt-2 mb-6">
          {isLogin
            ? "Sign in to access your analysis dashboard and saved reports."
            : "Start protecting yourself from fraudulent internship postings."}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label htmlFor="auth-name" className="label-field">
                Full name
              </label>
              <input
                id="auth-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="input-field"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="label-field">
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@university.edu"
              className="input-field"
              required
            />
          </div>

          <div>
            <label htmlFor="auth-password" className="label-field">
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="input-field"
              required
            />
          </div>

          {error && (
            <div className="rounded-card-sm border border-danger-border bg-danger-light px-4 py-3">
              <p className="text-danger text-body-sm">{error}</p>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-2">
            {loading
              ? isLogin
                ? "Signing in..."
                : "Creating account..."
              : isLogin
              ? "Sign in"
              : "Create account"}
          </button>
        </form>

        <p className="text-muted text-overline text-center mt-6 leading-relaxed">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
