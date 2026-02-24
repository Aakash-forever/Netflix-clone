export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-4" aria-live="polite">
        <div
          className="h-12 w-12 animate-spin rounded-full border-2 border-red-600 border-t-transparent"
          aria-hidden="true"
        />
        <p className="text-sm text-gray-300">Loading the next screen...</p>
      </div>
    </div>
  );
}
