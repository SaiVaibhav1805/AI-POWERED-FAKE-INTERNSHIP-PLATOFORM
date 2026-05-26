import { Loader2 } from "lucide-react";

export default function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 animate-fade-in">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-surface-tertiary border-t-primary animate-spin" />
      </div>
      <p className="text-body text-body-md">{message}</p>
    </div>
  );
}
