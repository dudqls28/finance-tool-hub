import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean, formatCurrencyUSD } from '../../utils/formatCurrency'
import { useLocale } from '../../contexts/LocaleContext'

export function DcaCalculator() {
  const { locale, currency } = useLocale()
  const unit = currency === 'usd' ? 'USD' : '원'
  const format = currency === 'usd' ? formatCurrencyUSD : formatCurrencyKorean
  const [monthly, setMonthly] = useState('500000')
  const [years, setYears] = useState('10')
  const [rate, setRate] = useState('7')

  const result = useMemo(() => {
    const m = Number(monthly) || 0
    const y = Number(years) || 0
    const r = Number(rate) / 100 / 12 || 0
    const months = y * 12
    if (months <= 0) return null
    let value = 0
    for (let i = 0; i < months; i++) {
      value = value * (1 + r) + m
    }
    const totalInvested = m * months
    return { totalInvested, portfolioValue: value }
  }, [monthly, years, rate])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">{locale === 'en' ? 'Input' : '입력'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="monthly" label={locale === 'en' ? 'Monthly investment' : '월 투자금'} value={monthly} onChange={setMonthly} unit={unit} />
          <InputField id="years" label={locale === 'en' ? 'Investment period' : '투자 기간'} value={years} onChange={setYears} unit={locale === 'en' ? 'yrs' : '년'} />
          <InputField id="rate" label={locale === 'en' ? 'Expected annual return' : '예상 연 수익률'} value={rate} onChange={setRate} unit="%" step="0.1" />
        </div>
      </div>
      {result && (
        <ResultCard
          items={[
            { label: locale === 'en' ? 'Total invested' : '총 투자금', value: format(Math.round(result.totalInvested)) },
            { label: locale === 'en' ? 'Expected portfolio value' : '예상 포트폴리오 가치', value: format(Math.round(result.portfolioValue)), highlight: true },
          ]}
        />
      )}
    </div>
  )
}
