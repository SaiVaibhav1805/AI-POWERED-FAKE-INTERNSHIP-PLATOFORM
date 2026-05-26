import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  BarChart3,
  AlertTriangle,
  ShieldCheck,
  Gauge,
  Plus,
  ChevronRight,
  FileText,
} from "lucide-react";
import { getMe, getReports } from "../api/api";
import LoadingScreen from "../components/LoadingScreen";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

const riskBadge = {
  low: "badge-success",
  medium: "badge-warning",
  high: "badge-danger",
};

function scoreColor(score) {
  if (score >= 70) return "text-success";
  if (score >= 40) return "text-warning";
  return "text-danger";
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reportsRes] = await Promise.all([getMe(), getReports()]);
        setUser(userRes.data);
        setReports(reportsRes.data);
      } catch {
        localStorage.removeItem("token");
        navigate("/?auth=login", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) {
    return <LoadingScreen message="Loading your dashboard..." />;
  }

  const total = reports.length;
  const fakeCount = reports.filter((r) => r.is_fake).length;
  const safeCount = total - fakeCount;
  const avgScore = total
    ? Math.round(reports.reduce((sum, r) => sum + r.trust_score, 0) / total)
    : 0;

  return (
    <div className="page-container animate-fade-in">
      <PageHeader
        title={
          <>
            Welcome back,{" "}
            <span className="text-primary">{user?.name || "there"}</span>
          </>
        }
        subtitle={user?.email}
        action={
          <Link to="/analyze" className="btn-primary">
            <Plus className="h-4 w-4" />
            New Analysis
          </Link>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-8 lg:mb-10">
        <StatCard label="Total Analyzed" value={total} icon={BarChart3} accent="primary" />
        <StatCard label="Fake Detected" value={fakeCount} icon={AlertTriangle} accent="danger" />
        <StatCard label="Safe Postings" value={safeCount} icon={ShieldCheck} accent="success" />
        <StatCard label="Avg Trust Score" value={avgScore} icon={Gauge} accent="warning" />
      </div>

      {/* Recent analyses */}
      <div className="card p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-heading-md text-heading font-display">Recent Analyses</h2>
            <p className="text-body-sm text-body mt-1">Your latest saved posting reviews</p>
          </div>
          {reports.length > 0 && (
            <Link
              to="/reports"
              className="inline-flex items-center gap-1 text-primary text-body-sm font-medium hover:text-primary-hover transition-colors"
            >
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 lg:py-20 gap-5">
            <div className="h-16 w-16 rounded-2xl bg-surface-tertiary border border-surface-border flex items-center justify-center">
              <FileText className="h-8 w-8 text-muted" />
            </div>
            <div className="text-center max-w-sm">
              <p className="text-heading font-semibold text-body-lg">No analyses yet</p>
              <p className="text-body text-body-sm mt-2 leading-relaxed">
                Paste an internship posting or upload a file to get your first AI-powered verdict.
              </p>
            </div>
            <Link to="/analyze" className="btn-primary mt-2">
              <Plus className="h-4 w-4" />
              Analyze your first posting
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {reports.slice(0, 5).map((r) => (
              <div
                key={r.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-card-sm border border-surface-border bg-surface-secondary px-5 py-4 transition-all duration-200 hover:border-surface-border-hover hover:shadow-card-sm"
              >
                <div>
                  <p className="text-heading text-body-md font-medium">{r.posting_title}</p>
                  <p className="text-muted text-caption mt-0.5">
                    {new Date(r.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <div className="text-right">
                    <p className="text-overline uppercase tracking-wider text-muted">Trust</p>
                    <p className={`font-semibold text-body-sm tabular-nums ${scoreColor(r.trust_score)}`}>
                      {r.trust_score}/100
                    </p>
                  </div>
                  <span className={riskBadge[r.risk_level] || riskBadge.medium}>
                    {r.risk_level}
                  </span>
                  <span className={r.is_fake ? "badge-danger" : "badge-success"}>
                    {r.is_fake ? "Fake" : "Safe"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
