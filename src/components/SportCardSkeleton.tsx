export default function SportCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden animate-pulse">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-200 rounded-lg" />
            <div>
              <div className="h-5 w-24 bg-slate-200 rounded mb-1" />
              <div className="h-3 w-16 bg-slate-100 rounded" />
            </div>
          </div>
          <div className="text-right">
            <div className="h-8 w-12 bg-slate-200 rounded mb-1" />
            <div className="h-3 w-8 bg-slate-100 rounded ml-auto" />
          </div>
        </div>
      </div>

      {/* Score bars */}
      <div className="px-4 pb-3 space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-1">
              <div className="h-3 w-20 bg-slate-100 rounded" />
              <div className="h-3 w-6 bg-slate-100 rounded" />
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-200 rounded-full"
                style={{ width: `${40 + i * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Age badge */}
      <div className="px-4 pb-3">
        <div className="h-6 w-28 bg-slate-100 rounded-full" />
        <div className="h-3 w-40 bg-slate-100 rounded mt-2" />
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-slate-50 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div className="h-4 w-20 bg-slate-200 rounded" />
          <div className="h-6 w-20 bg-slate-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function SportGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SportCardSkeleton key={i} />
      ))}
    </div>
  );
}
