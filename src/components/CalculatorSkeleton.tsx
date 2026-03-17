/** 툴 페이지 로딩 시 표시할 스켈레톤 */
export function CalculatorSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="h-6 w-24 rounded bg-slate-200" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="mb-2 h-4 w-20 rounded bg-slate-200" />
              <div className="h-10 w-full rounded-lg bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-5">
        <div className="h-4 w-28 rounded bg-slate-200" />
        <div className="mt-3 space-y-2">
          <div className="flex justify-between gap-4">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-4 w-20 rounded bg-slate-200" />
          </div>
          <div className="flex justify-between gap-4">
            <div className="h-4 w-20 rounded bg-slate-200" />
            <div className="h-4 w-24 rounded bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  )
}
