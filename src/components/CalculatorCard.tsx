import { Link, useLocation } from 'react-router-dom'
import type { ToolConfig } from '../config/tools'
import { trackCalculatorClick } from '../utils/analytics'
import { useLocale } from '../contexts/LocaleContext'

interface CalculatorCardProps {
  tool: ToolConfig
}

const calcCta = { ko: '계산하기 →', en: 'Calculate →' } as const

export function CalculatorCard({ tool }: CalculatorCardProps) {
  const location = useLocation()
  const { locale } = useLocale()
  const fromPage = location.pathname === '/' ? 'home' : location.pathname.startsWith('/tools') ? 'tool_page' : 'other'
  const name = locale === 'en' ? tool.nameEn : tool.name
  const description = locale === 'en' ? tool.descriptionEn : tool.description

  return (
    <Link
      to={`/tools/${tool.slug}`}
      onClick={() => trackCalculatorClick(tool.id, tool.name, fromPage)}
      className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md"
    >
      <h3 className="font-semibold text-text">{name}</h3>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
      <span className="mt-2 inline-block text-sm font-medium text-primary">
        {calcCta[locale]}
      </span>
    </Link>
  )
}
