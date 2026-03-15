interface ResultItem {
  label: string
  value: string | number
  highlight?: boolean
}

interface ResultCardProps {
  title?: string
  items: ResultItem[]
}

export function ResultCard({ title = '계산 결과', items }: ResultCardProps) {
  return (
    <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-5">
      <h3 className="text-sm font-semibold text-secondary">{title}</h3>
      <dl className="mt-3 space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between gap-4">
            <dt className="text-sm text-slate-600">{item.label}</dt>
            <dd
              className={
                item.highlight
                  ? 'text-lg font-bold text-primary'
                  : 'text-sm font-medium text-text'
              }
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
