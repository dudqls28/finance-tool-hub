import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean, formatCurrencyUSD } from '../../utils/formatCurrency'
import { useLocale } from '../../contexts/LocaleContext'

/** 퇴직금 = 월 평균 임금 × (재직일수 / 365). 1년에 30일분(≈월급 1개월) 해당 */
export function SeveranceCalculator() {
  const { locale, currency } = useLocale()
  const unit = currency === 'usd' ? 'USD' : '원'
  const format = currency === 'usd' ? formatCurrencyUSD : formatCurrencyKorean
  const [monthlyAvg, setMonthlyAvg] = useState('3000000')
  const [workDays, setWorkDays] = useState('3650')

  const result = useMemo(() => {
    const monthly = Number(monthlyAvg) || 0
    const days = Number(workDays) || 0
    if (days <= 0) return null
    const severance = monthly * (days / 365)
    const years = Math.floor(days / 365)
    return { severance, years }
  }, [monthlyAvg, workDays])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">{locale === 'en' ? 'Input' : '입력'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField
            id="monthly"
            label={locale === 'en' ? 'Average monthly wage' : '월 평균 임금'}
            value={monthlyAvg}
            onChange={setMonthlyAvg}
            unit={unit}
          />
          <InputField
            id="days"
            label={locale === 'en' ? 'Days employed' : '재직일수'}
            value={workDays}
            onChange={setWorkDays}
            unit={locale === 'en' ? 'days' : '일'}
          />
        </div>
      </div>
      <ResultCard
        items={result ? [
          { label: locale === 'en' ? 'Severance pay' : '퇴직금', value: format(Math.round(result.severance)), highlight: true },
          { label: locale === 'en' ? 'Years employed' : '재직 연수', value: `${result.years}${locale === 'en' ? ' yrs' : '년'}` },
        ] : []}
      />
    </div>
  )
}
