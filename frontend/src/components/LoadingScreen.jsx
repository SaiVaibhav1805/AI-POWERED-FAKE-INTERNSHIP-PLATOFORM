import { Loader2 } from "lucide-react";

export default function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 animate-fade-in">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-surface-tertiary dark:border-dark-tertiary border-t-primary dark:border-t-primary-400 animate-spin" />
      </div>
      <p className="text-body dark:text-slate-400 text-body-md">{message}</p>
    </div>
  );
}
