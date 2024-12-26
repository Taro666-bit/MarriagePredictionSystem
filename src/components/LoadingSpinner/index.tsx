export function LoadingSpinner() {
  return (
    <div className="relative w-6 h-6">
      <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      <div className="absolute inset-1 rounded-full border-2 border-primary/30 border-t-transparent animate-spin-slow" />
    </div>
  );
} 