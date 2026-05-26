import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Trash2, Plus, FileText, Loader2 } from "lucide-react";
import { getReports, deleteReport } from "../api/api";
import LoadingScreen from "../components/LoadingScreen";
import PageHeader from "../components/PageHeader";

const riskBadge = {
  low: "badge-success",
  medium: "badge-warning",
  high: "badge-danger",
};

function scoreColor(score) {
  if (score >= 70) return "bg-success";
  if (score >= 40) return "bg-warning";
  return "bg-danger";
}

function scoreTextColor(score) {
  if (score >= 70) return "text-success";
  if (score >= 40) return "text-warning";
  return "text-danger";
}

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await getReports();
      setReports(res.data);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reportId) => {
    setDeleting(reportId);
    try {
      await deleteReport(reportId);
      setReports(reports.filter((r) => r.id !== reportId));
    } catch (err) {
      console.error("Failed to delete report:", err);
    } finally {
      setDeleting(null);
    }
  };

  const filtered = reports.filter((r) => {
    const matchSearch = r.posting_title.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ? true : filter === "fake" ? r.is_fake : !r.is_fake;
    return matchSearch && matchFilter;
  });

  const filterLabels = { all: "All", fake: "Fake", safe: "Safe" };

  if (loading) {
    return <LoadingScreen message="Loading your reports..." />;
  }

  return (
    <div className="page-container animate-fade-in">
      <PageHeader
        title="Reports"
        subtitle="All your saved internship analyses in one searchable place."
        action={
          <Link to="/analyze" className="btn-primary">
            <Plus className="h-4 w-4" />
            New Analysis
          </Link>
        }
      />

      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search by job title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field !pl-11"
          />
        </div>
        <div className="flex bg-surface-secondary border border-surface-border rounded-card-sm p-1 gap-1">
          {["all", "fake", "safe"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-lg text-body-sm font-medium capitalize transition-all duration-200 ${
                filter === f ? "tab-active" : "tab-inactive"
              }`}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-20 lg:py-24 gap-5">
          <div className="h-16 w-16 rounded-2xl bg-surface-tertiary border border-surface-border flex items-center justify-center">
            <FileText className="h-8 w-8 text-muted" />
          </div>
          <div className="text-center max-w-sm">
            <p className="text-heading font-semibold text-body-lg">
              {search || filter !== "all"
                ? "No reports match your filters"
                : "No reports saved yet"}
            </p>
            <p className="text-body text-body-sm mt-2 leading-relaxed">
              {search || filter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Run an analysis and save the report to see it here."}
            </p>
          </div>
          {!search && filter === "all" && (
            <Link to="/analyze" className="btn-primary mt-2">
              <Plus className="h-4 w-4" />
              Start your first analysis
            </Link>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((r) => (
            <article key={r.id} className="card-interactive p-6 lg:p-7">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-heading font-semibold text-heading-md">
                    {r.posting_title}
                  </h3>
                  {r.company_name && (
                    <p className="text-body text-body-sm mt-1">{r.company_name}</p>
                  )}
                  <p className="text-muted text-caption mt-2">
                    {new Date(r.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={riskBadge[r.risk_level] || riskBadge.medium}>
                    {r.risk_level}
                  </span>
                  <span className={r.is_fake ? "badge-danger" : "badge-success"}>
                    {r.is_fake ? "Fake" : "Safe"}
                  </span>
                </div>
              </div>

              {/* Trust score bar */}
              <div className="mb-5">
                <div className="flex justify-between text-caption mb-2">
                  <span className="text-body">Trust score</span>
                  <span className={`font-semibold tabular-nums ${scoreTextColor(r.trust_score)}`}>
                    {r.trust_score}/100
                  </span>
                </div>
                <div className="h-2 bg-surface-tertiary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${scoreColor(r.trust_score)}`}
                    style={{ width: `${r.trust_score}%` }}
                  />
                </div>
              </div>

              {/* Delete action */}
              <div className="flex justify-end pt-4 border-t border-surface-border">
                <button
                  type="button"
                  onClick={() => handleDelete(r.id)}
                  disabled={deleting === r.id}
                  className="inline-flex items-center gap-1.5 text-caption text-muted hover:text-danger transition-colors disabled:opacity-50"
                >
                  {deleting === r.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                  {deleting === r.id ? "Deleting..." : "Delete report"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
