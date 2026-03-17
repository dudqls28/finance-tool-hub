import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean, formatCurrencyUSD } from '../../utils/formatCurrency'
import { useLocale } from '../../contexts/LocaleContext'

export function CompoundCalculator() {
  const { locale, currency } = useLocale()
  const unit = currency === 'usd' ? 'USD' : '원'
  const format = currency === 'usd' ? formatCurrencyUSD : formatCurrencyKorean
  const [initial, setInitial] = useState('10000000')
  const [monthly, setMonthly] = useState('500000')
  const [rate, setRate] = useState('7')
  const [years, setYears] = useState('10')

  const futureValue = useMemo(() => {
    const p = Number(initial) || 0
    const m = Number(monthly) || 0
    const r = Number(rate) / 100 / 12 || 0
    const n = Number(years) * 12 || 0
    if (n <= 0) return null
    let fv = p * Math.pow(1 + r, n)
    for (let i = 0; i < n; i++) {
      fv += m * Math.pow(1 + r, n - 1 - i)
    }
    return fv
  }, [initial, monthly, rate, years])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">{locale === 'en' ? 'Input' : '입력'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="initial" label={locale === 'en' ? 'Initial investment' : '초기 투자금'} value={initial} onChange={setInitial} unit={unit} />
          <InputField id="monthly" label={locale === 'en' ? 'Monthly contribution' : '월 납입액'} value={monthly} onChange={setMonthly} unit={unit} />
          <InputField id="rate" label={locale === 'en' ? 'Annual return' : '연 수익률'} value={rate} onChange={setRate} unit="%" step="0.1" />
          <InputField id="years" label={locale === 'en' ? 'Period' : '기간'} value={years} onChange={setYears} unit={locale === 'en' ? 'yrs' : '년'} />
        </div>
      </div>
      <ResultCard
        items={futureValue !== null ? [{ label: locale === 'en' ? 'Future value' : '미래 가치', value: format(Math.round(futureValue)), highlight: true }] : []}
      />
    </div>
  )
}
