import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

export type Locale = 'ko' | 'en'
export type Currency = 'krw' | 'usd'

const STORAGE_KEY = 'finance-tool-hub-locale'
const CURRENCY_KEY = 'finance-tool-hub-currency'

interface LocaleContextValue {
  locale: Locale
  currency: Currency
  setLocale: (l: Locale) => void
  setCurrency: (c: Currency) => void
}

const Context = createContext<LocaleContextValue | null>(null)

function loadLocale(): Locale {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    if (s === 'ko' || s === 'en') return s
  } catch {}
  return 'ko'
}

function loadCurrency(): Currency {
  try {
    const s = localStorage.getItem(CURRENCY_KEY)
    if (s === 'krw' || s === 'usd') return s
  } catch {}
  return 'krw'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(loadLocale)
  const [currency, setCurrencyState] = useState<Currency>(loadCurrency)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch {}
  }, [locale])

  useEffect(() => {
    try {
      localStorage.setItem(CURRENCY_KEY, currency)
    } catch {}
  }, [currency])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    if (l === 'en') setCurrencyState('usd')
  }, [])

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c)
  }, [])

  return (
    <Context.Provider value={{ locale, currency, setLocale, setCurrency }}>
      {children}
    </Context.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
