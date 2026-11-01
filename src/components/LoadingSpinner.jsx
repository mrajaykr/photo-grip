export default function LoadingSpinner() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-4 text-slate-500">
      <div className="h-11 w-11 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600" />
      <p className="text-sm font-medium">Loading photos...</p>
    </div>
  );
}
