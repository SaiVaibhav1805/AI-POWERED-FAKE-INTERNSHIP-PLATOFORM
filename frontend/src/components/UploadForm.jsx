import { useState } from "react";
import { FileUp, Loader2, CheckCircle2 } from "lucide-react";
import { uploadFile } from "../api/api";

export default function UploadForm({ onExtracted }) {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file) => {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const res = await uploadFile(file);
      onExtracted(res.data);
    } catch {
      setError("Failed to parse file. Please try PDF, DOCX, or TXT.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`card border-dashed border-2 p-10 lg:p-14 text-center transition-all duration-200 cursor-pointer ${
        dragging
          ? "border-primary dark:border-primary-400 bg-primary-light dark:bg-primary-950/20 shadow-card dark:shadow-dark-card"
          : "border-surface-border-hover dark:border-dark-border hover:border-primary/40 dark:hover:border-primary-400/40 hover:bg-surface-secondary dark:hover:bg-dark-secondary"
      }`}
    >
      <input
        type="file"
        accept=".pdf,.docx,.txt"
        className="hidden"
        id="file-upload"
        onChange={(e) => handleFile(e.target.files[0])}
      />
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
        <div
          className={`h-16 w-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-200 ${
            dragging
              ? "border-primary/40 dark:border-primary-400/40 bg-primary-100 dark:bg-primary-900/30"
              : "border-surface-border dark:border-dark-border bg-surface-tertiary dark:bg-dark-tertiary"
          }`}
        >
          {loading ? (
            <Loader2 className="h-7 w-7 text-primary dark:text-primary-400 animate-spin" />
          ) : (
            <FileUp className="h-7 w-7 text-muted dark:text-slate-500" strokeWidth={1.8} />
          )}
        </div>
        <div>
          <p className="text-heading dark:text-white font-semibold text-body-lg">
            {loading ? "Extracting text from file..." : "Drop your file here or click to upload"}
          </p>
          <p className="text-body dark:text-slate-400 text-body-sm mt-2">
            Supports PDF, DOCX, and TXT files
          </p>
        </div>
      </label>
      {error && (
        <div className="mt-4 inline-flex items-center gap-2 text-danger dark:text-red-400 text-body-sm">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
