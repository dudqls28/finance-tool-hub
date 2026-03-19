import { Link, useLocation } from 'react-router-dom'
import type { ToolConfig } from '../config/tools'
import { trackCalculatorClick } from '../utils/analytics'
import { useLocale } from '../contexts/LocaleContext'
import { CategoryIcon } from './CategoryIcon'

interface CalculatorCardProps {
  tool: ToolConfig
}

const calcCta = { ko: '계산하기 →', en: 'Calculate →' } as const

const CATEGORY_LABELS: Record<ToolConfig['category'], { ko: string; en: string }> = {
  investment: { ko: '투자', en: 'Investment' },
  retirement: { ko: '은퇴·FIRE', en: 'Retirement' },
  loan: { ko: '대출', en: 'Loan' },
  salary: { ko: '연봉', en: 'Salary' },
  savings: { ko: '저축', en: 'Savings' },
  inflation: { ko: '인플레이션', en: 'Inflation' },
}

export function CalculatorCard({ tool }: CalculatorCardProps) {
  const location = useLocation()
  const { locale } = useLocale()
  const fromPage = location.pathname === '/' ? 'home' : location.pathname.startsWith('/tools') ? 'tool_page' : 'other'
  const name = locale === 'en' ? tool.nameEn : tool.name
  const description = locale === 'en' ? tool.descriptionEn : tool.description
  const categoryLabel = CATEGORY_LABELS[tool.category][locale]

  return (
    <Link
      to={`/tools/${tool.slug}`}
      onClick={() => trackCalculatorClick(tool.id, tool.name, fromPage)}
      className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md"
    >
      <div className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1.5">
        <CategoryIcon category={tool.category} variant="card" />
        <span className="text-xs font-medium leading-none text-primary">
          {categoryLabel}
        </span>
      </div>
      <h3 className="mt-3 font-semibold text-text">{name}</h3>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
      <span className="mt-2 inline-block text-sm font-medium text-primary">
        {calcCta[locale]}
      </span>
    </Link>
  )
}
