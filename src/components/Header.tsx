import { Link } from 'react-router-dom'
import { useLocale } from '../contexts/LocaleContext'

const labels = {
  home: { ko: '홈', en: 'Home' },
  tools: { ko: '계산기', en: 'Calculators' },
  lang: { ko: '한국어', en: 'English' },
  currency: { krw: '원', usd: 'USD' },
} as const

export function Header() {
  const { locale, currency, setLocale, setCurrency } = useLocale()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="shrink-0 text-lg font-semibold text-primary">
          Finance Tool Hub
        </Link>
        <nav className="flex flex-wrap items-center gap-3 sm:gap-6">
          <Link to="/" className="text-sm text-text hover:text-primary">
            {labels.home[locale]}
          </Link>
          <Link to="/tools" className="text-sm text-text hover:text-primary">
            {labels.tools[locale]}
          </Link>
          <span className="hidden text-slate-300 sm:inline">|</span>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">
              {locale === 'ko' ? '언어' : 'Language'}:
            </span>
            <button
              type="button"
              onClick={() => setLocale('ko')}
              className={locale === 'ko' ? 'font-medium text-primary' : 'text-slate-600 hover:text-primary'}
            >
              한국어
            </button>
            <span className="text-slate-300">/</span>
            <button
              type="button"
              onClick={() => setLocale('en')}
              className={locale === 'en' ? 'font-medium text-primary' : 'text-slate-600 hover:text-primary'}
            >
              English
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">
              {locale === 'ko' ? '통화' : 'Currency'}:
            </span>
            <button
              type="button"
              onClick={() => setCurrency('krw')}
              className={currency === 'krw' ? 'font-medium text-primary' : 'text-slate-600 hover:text-primary'}
            >
              원
            </button>
            <span className="text-slate-300">/</span>
            <button
              type="button"
              onClick={() => setCurrency('usd')}
              className={currency === 'usd' ? 'font-medium text-primary' : 'text-slate-600 hover:text-primary'}
            >
              USD
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
