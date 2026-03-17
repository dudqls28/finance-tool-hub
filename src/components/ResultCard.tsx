import { useLocale } from '../contexts/LocaleContext'

interface ResultItem {
  label: string
  value: string | number
  highlight?: boolean
}

interface ResultCardProps {
  title?: string
  items: ResultItem[]
}

const resultCardLabels = {
  title: { ko: '계산 결과', en: 'Result' },
  empty: { ko: '값을 입력하면 결과가 표시됩니다.', en: 'Enter values to see results.' },
} as const

export function ResultCard({ title, items }: ResultCardProps) {
  const { locale } = useLocale()
  const defaultTitle = resultCardLabels.title[locale]
  const displayTitle = title ?? defaultTitle

  return (
    <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-5">
      <h3 className="text-sm font-semibold text-secondary">{displayTitle}</h3>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">{resultCardLabels.empty[locale]}</p>
      ) : (
        <dl className="mt-3 space-y-2">
          {items.map((item, i) => (
            <div key={`${item.label}-${i}`} className="flex justify-between gap-4">
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
      )}
    </div>
  )
}
