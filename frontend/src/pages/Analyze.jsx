import { useState } from "react";
import {
  PenLine,
  Upload,
  Loader2,
  Sparkles,
  Flag,
  Cpu,
  Save,
  RotateCcw,
  ScanSearch,
  CheckCircle2,
} from "lucide-react";
import { analyzePosting, saveReport } from "../api/api";
import UploadForm from "../components/UploadForm";
import TrustScore from "../components/TrustScore";
import RiskCard from "../components/RiskCard";
import FlagList from "../components/FlagList";
import PageHeader from "../components/PageHeader";

const EMPTY_FORM = {
  title: "",
  company_profile: "",
  description: "",
  requirements: "",
  benefits: "",
  location: "",
  salary_range: "",
  employment_type: "",
  required_experience: "",
  required_education: "",
  industry: "",
  has_company_logo: 0,
  has_questions: 0,
  telecommuting: 0,
};

export default function Analyze() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("manual");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleExtracted = (extracted) => {
    setForm({ ...EMPTY_FORM, ...extracted });
    setActiveTab("manual");
  };

  const handleAnalyze = async () => {
    if (!form.title.trim()) {
      setError("Please provide at least a job title.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    setSaved(false);
    try {
      const res = await analyzePosting(form);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveReport = async () => {
    if (!result) return;
    try {
      await saveReport({
        posting_title: form.title,
        company_name: form.company_profile?.slice(0, 50) || "",
        trust_score: result.trust_score,
        risk_level: result.risk_level,
        is_fake: result.is_fake,
        gemini_analysis: result.gemini_analysis,
        red_flags: result.red_flags,
      });
      setSaved(true);
    } catch {
      setError("Failed to save report.");
    }
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    setResult(null);
    setError("");
    setSaved(false);
  };

  return (
    <div className="page-container max-w-5xl animate-fade-in">
      <PageHeader
        title="Analyze a Posting"
        subtitle="Paste internship details manually or upload a file for an instant AI-powered verdict."
      />

      {/* Tab switcher */}
      <div className="flex bg-surface-secondary dark:bg-dark-tertiary border border-surface-border dark:border-dark-border rounded-card-sm p-1 mb-8 w-fit gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("manual")}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-body-sm font-semibold transition-all duration-200 ${
            activeTab === "manual" ? "tab-active" : "tab-inactive"
          }`}
        >
          <PenLine className="h-4 w-4" />
          Manual Entry
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-body-sm font-semibold transition-all duration-200 ${
            activeTab === "upload" ? "tab-active" : "tab-inactive"
          }`}
        >
          <Upload className="h-4 w-4" />
          Upload File
        </button>
      </div>

      {activeTab === "upload" && (
        <div className="mb-8">
          <UploadForm onExtracted={handleExtracted} />
        </div>
      )}

      {activeTab === "manual" && (
        <div className="card p-6 lg:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className="label-field">
                Job / Internship Title <span className="text-danger dark:text-red-400">*</span>
              </label>
              <input id="title" type="text" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Marketing Intern — Acme Corp" className="input-field" />
            </div>
            <div>
              <label htmlFor="location" className="label-field">Location</label>
              <input id="location" type="text" name="location" value={form.location} onChange={handleChange} placeholder="Remote, Hyderabad, etc." className="input-field" />
            </div>
            <div>
              <label htmlFor="industry" className="label-field">Industry</label>
              <input id="industry" type="text" name="industry" value={form.industry} onChange={handleChange} placeholder="Information Technology" className="input-field" />
            </div>
            <div>
              <label htmlFor="employment_type" className="label-field">Employment Type</label>
              <select id="employment_type" name="employment_type" value={form.employment_type} onChange={handleChange} className="input-field">
                <option value="">Select type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="salary_range" className="label-field">Salary Range</label>
              <input id="salary_range" type="text" name="salary_range" value={form.salary_range} onChange={handleChange} placeholder="₹10,000–20,000 or Unpaid" className="input-field" />
            </div>
            <div>
              <label htmlFor="required_experience" className="label-field">Required Experience</label>
              <select id="required_experience" name="required_experience" value={form.required_experience} onChange={handleChange} className="input-field">
                <option value="">Select experience</option>
                <option value="Internship">Internship</option>
                <option value="Entry level">Entry level</option>
                <option value="Associate">Associate</option>
                <option value="Mid-Senior level">Mid-Senior level</option>
                <option value="Director">Director</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </div>
            <div>
              <label htmlFor="required_education" className="label-field">Required Education</label>
              <select id="required_education" name="required_education" value={form.required_education} onChange={handleChange} className="input-field">
                <option value="">Select education</option>
                <option value="High School or equivalent">High School or equivalent</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Unspecified">Unspecified</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="company_profile" className="label-field">Company Profile</label>
              <textarea id="company_profile" name="company_profile" value={form.company_profile} onChange={handleChange} placeholder="Company name, website, size, and any profile details from the posting..." rows={3} className="input-field resize-y min-h-[88px]" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="label-field">Full Job Description</label>
              <textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="Paste the complete job description, responsibilities, and role details..." rows={8} className="input-field resize-y min-h-[200px]" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="requirements" className="label-field">Requirements</label>
              <textarea id="requirements" name="requirements" value={form.requirements} onChange={handleChange} placeholder="Skills, qualifications, and application requirements..." rows={3} className="input-field resize-y" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="benefits" className="label-field">Benefits</label>
              <textarea id="benefits" name="benefits" value={form.benefits} onChange={handleChange} placeholder="Stipend, perks, certificates, or other benefits mentioned..." rows={2} className="input-field resize-y" />
            </div>
            <div className="md:col-span-2 flex flex-wrap gap-6 pt-2">
              {[
                { name: "has_company_logo", label: "Has company logo" },
                { name: "has_questions", label: "Has screening questions" },
                { name: "telecommuting", label: "Remote / telecommuting" },
              ].map((cb) => (
                <label key={cb.name} className="flex items-center gap-2.5 cursor-pointer group">
                  <input type="checkbox" name={cb.name} checked={form[cb.name] === 1} onChange={handleChange} className="h-4 w-4 rounded border-surface-border dark:border-dark-border bg-surface-secondary dark:bg-dark-tertiary text-primary focus:ring-primary/20" />
                  <span className="text-body-sm text-body dark:text-slate-400 group-hover:text-heading dark:group-hover:text-white transition-colors">{cb.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-card-sm border border-danger-border dark:border-red-500/25 bg-danger-light dark:bg-red-500/10 px-5 py-3.5 mb-6">
          <p className="text-danger dark:text-red-400 text-body-sm">{error}</p>
        </div>
      )}

      {!result && (
        <button type="button" onClick={handleAnalyze} disabled={loading} className="btn-primary w-full py-4 text-body-md mb-10">
          {loading ? (
            <><Loader2 className="h-5 w-5 animate-spin" /> Analyzing with AI...</>
          ) : (
            <><ScanSearch className="h-5 w-5" /> Analyze Posting</>
          )}
        </button>
      )}

      {result && (
        <div className="flex flex-col gap-6 animate-slide-up">
          <div className="border-t border-surface-border dark:border-dark-border pt-8">
            <h2 className="text-heading-lg text-heading dark:text-white mb-6 font-display">Analysis Results</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="card p-6 flex items-center justify-center">
                <TrustScore score={result.trust_score} />
              </div>
              <div className="md:col-span-2">
                <RiskCard riskLevel={result.risk_level} isFake={result.is_fake} recommendation={result.recommendation} />
              </div>
            </div>

            <div className="card p-6 mb-6">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary-light dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary dark:text-primary-400" strokeWidth={2} />
                </div>
                <h3 className="text-heading-md text-heading dark:text-white">Gemini AI Analysis</h3>
              </div>
              <p className="text-body-md text-body dark:text-slate-300 leading-relaxed">{result.gemini_analysis}</p>
            </div>

            <div className="card p-6 mb-6">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-8 w-8 rounded-lg bg-warning-light dark:bg-amber-500/10 border border-warning-border dark:border-amber-500/20 flex items-center justify-center">
                  <Flag className="h-4 w-4 text-warning dark:text-amber-400" strokeWidth={2} />
                </div>
                <h3 className="text-heading-md text-heading dark:text-white">Red Flags</h3>
              </div>
              <FlagList flags={result.red_flags} />
            </div>

            <div className="card p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-surface-tertiary dark:bg-dark-tertiary border border-surface-border dark:border-dark-border flex items-center justify-center">
                    <Cpu className="h-4 w-4 text-body dark:text-slate-400" strokeWidth={2} />
                  </div>
                  <h3 className="text-heading-md text-heading dark:text-white">ML Model Score</h3>
                </div>
                <span className="text-body-sm text-body dark:text-slate-400">
                  Fraud probability:{" "}
                  <span className={`font-semibold tabular-nums ${result.ml_score > 0.5 ? "text-danger dark:text-red-400" : "text-success dark:text-emerald-400"}`}>
                    {(result.ml_score * 100).toFixed(1)}%
                  </span>
                </span>
              </div>
              <div className="h-2 bg-surface-tertiary dark:bg-dark-tertiary rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-1000 ${result.ml_score > 0.5 ? "bg-danger" : "bg-success"}`} style={{ width: `${result.ml_score * 100}%` }} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handleSaveReport}
                disabled={saved}
                className={`flex-1 py-3 inline-flex items-center justify-center gap-2 rounded-button font-semibold text-body-sm transition-all duration-200 ${
                  saved
                    ? "bg-success-light dark:bg-emerald-500/10 text-success dark:text-emerald-400 border border-success-border dark:border-emerald-500/25"
                    : "btn-primary"
                }`}
              >
                {saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                {saved ? "Report Saved" : "Save Report"}
              </button>
              <button type="button" onClick={handleReset} className="btn-secondary flex-1 py-3">
                <RotateCcw className="h-4 w-4" />
                Analyze Another
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
