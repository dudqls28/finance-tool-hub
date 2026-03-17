import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocale } from '../contexts/LocaleContext'

const labels = {
  home: { ko: '홈', en: 'Home' },
  tools: { ko: '계산기', en: 'Calculators' },
  lang: { ko: '언어', en: 'Language' },
  currency: { ko: '통화', en: 'Currency' },
  krw: '원',
  usd: 'USD',
} as const

const btnClass = 'min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-sm transition-colors'
const btnActive = 'font-medium text-primary'
const btnInactive = 'text-slate-600 hover:text-primary hover:bg-slate-100'

export function Header() {
  const { locale, currency, setLocale, setCurrency } = useLocale()
  const [menuOpen, setMenuOpen] = useState(false)

  const navContent = (
    <>
      <Link
        to="/"
        className={`text-sm hover:text-primary md:min-h-0 md:min-w-0 ${btnClass}`}
        onClick={() => setMenuOpen(false)}
      >
        {labels.home[locale]}
      </Link>
      <Link
        to="/tools"
        className={`text-sm hover:text-primary md:min-h-0 md:min-w-0 ${btnClass}`}
        onClick={() => setMenuOpen(false)}
      >
        {labels.tools[locale]}
      </Link>
      <span className="hidden text-slate-300 md:inline">|</span>
      <div className="flex items-center gap-1">
        <span className="hidden text-sm text-slate-500 md:inline">{labels.lang[locale]}:</span>
        <button
          type="button"
          onClick={() => setLocale('ko')}
          className={`px-2 ${btnClass} ${locale === 'ko' ? btnActive : btnInactive}`}
          aria-pressed={locale === 'ko'}
        >
          한국어
        </button>
        <span className="text-slate-300">/</span>
        <button
          type="button"
          onClick={() => setLocale('en')}
          className={`px-2 ${btnClass} ${locale === 'en' ? btnActive : btnInactive}`}
          aria-pressed={locale === 'en'}
        >
          English
        </button>
      </div>
      <div className="flex items-center gap-1">
        <span className="hidden text-sm text-slate-500 md:inline">{labels.currency[locale]}:</span>
        <button
          type="button"
          onClick={() => setCurrency('krw')}
          className={`px-2 ${btnClass} ${currency === 'krw' ? btnActive : btnInactive}`}
          aria-pressed={currency === 'krw'}
        >
          {labels.krw}
        </button>
        <span className="text-slate-300">/</span>
        <button
          type="button"
          onClick={() => setCurrency('usd')}
          className={`px-2 ${btnClass} ${currency === 'usd' ? btnActive : btnInactive}`}
          aria-pressed={currency === 'usd'}
        >
          {labels.usd}
        </button>
      </div>
    </>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between gap-4">
          <Link to="/" className="shrink-0 text-lg font-semibold text-primary">
            Finance Tool Hub
          </Link>

          {/* Desktop: full nav */}
          <nav className="hidden items-center gap-3 md:flex md:gap-6">
            {navContent}
          </nav>

          {/* Mobile: hamburger */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className={`${btnClass} flex flex-col gap-1.5 rounded-lg px-3 text-slate-600 hover:bg-slate-100 hover:text-text`}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? (locale === 'ko' ? '메뉴 닫기' : 'Close menu') : (locale === 'ko' ? '메뉴 열기' : 'Open menu')}
            >
              <span className="h-0.5 w-5 bg-current" />
              <span className="h-0.5 w-5 bg-current" />
              <span className="h-0.5 w-5 bg-current" />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <nav
            className="flex flex-col gap-1 border-t border-slate-200 py-3 md:hidden"
            aria-label="Mobile menu"
          >
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                className="min-h-[44px] flex items-center px-2 text-sm text-text hover:bg-slate-100 hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                {labels.home[locale]}
              </Link>
              <Link
                to="/tools"
                className="min-h-[44px] flex items-center px-2 text-sm text-text hover:bg-slate-100 hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                {labels.tools[locale]}
              </Link>
            </div>
            <div className="mt-2 border-t border-slate-100 pt-2">
              <p className="px-2 text-xs font-medium text-slate-500">{labels.lang[locale]}</p>
              <div className="flex gap-2 py-1">
                <button
                  type="button"
                  onClick={() => { setLocale('ko'); setMenuOpen(false) }}
                  className={`min-h-[44px] flex-1 rounded-lg px-2 text-sm ${locale === 'ko' ? btnActive : btnInactive}`}
                >
                  한국어
                </button>
                <button
                  type="button"
                  onClick={() => { setLocale('en'); setMenuOpen(false) }}
                  className={`min-h-[44px] flex-1 rounded-lg px-2 text-sm ${locale === 'en' ? btnActive : btnInactive}`}
                >
                  English
                </button>
              </div>
            </div>
            <div className="border-t border-slate-100 pt-2">
              <p className="px-2 text-xs font-medium text-slate-500">{labels.currency[locale]}</p>
              <div className="flex gap-2 py-1">
                <button
                  type="button"
                  onClick={() => { setCurrency('krw'); setMenuOpen(false) }}
                  className={`min-h-[44px] flex-1 rounded-lg px-2 text-sm ${currency === 'krw' ? btnActive : btnInactive}`}
                >
                  {labels.krw}
                </button>
                <button
                  type="button"
                  onClick={() => { setCurrency('usd'); setMenuOpen(false) }}
                  className={`min-h-[44px] flex-1 rounded-lg px-2 text-sm ${currency === 'usd' ? btnActive : btnInactive}`}
                >
                  {labels.usd}
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
