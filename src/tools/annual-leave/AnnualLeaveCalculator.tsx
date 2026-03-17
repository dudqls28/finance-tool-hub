import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean, formatCurrencyUSD } from '../../utils/formatCurrency'
import { useLocale } from '../../contexts/LocaleContext'

/** 연차수당 = 미사용 연차일수 × 1일 평균임금. 1일 평균임금 = (월급 등) / 30 또는 통상시급 등. 간이: 일급 × 미사용 연차일수. 일급 = 월급/30. */
export function AnnualLeaveCalculator() {
  const { locale, currency } = useLocale()
  const unit = currency === 'usd' ? 'USD' : '원'
  const format = currency === 'usd' ? formatCurrencyUSD : formatCurrencyKorean
  const [dailyWage, setDailyWage] = useState('100000')
  const [unusedDays, setUnusedDays] = useState('10')

  const result = useMemo(() => {
    const daily = Number(dailyWage) || 0
    const days = Number(unusedDays) || 0
    const total = daily * days
    return { total, days }
  }, [dailyWage, unusedDays])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">{locale === 'en' ? 'Input' : '입력'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField
            id="daily"
            label={locale === 'en' ? 'Daily wage (1 day avg)' : '1일 평균 임금'}
            value={dailyWage}
            onChange={setDailyWage}
            unit={unit}
          />
          <InputField
            id="days"
            label={locale === 'en' ? 'Unused leave days' : '미사용 연차 일수'}
            value={unusedDays}
            onChange={setUnusedDays}
            unit={locale === 'en' ? 'days' : '일'}
          />
        </div>
      </div>
      <ResultCard
        items={[
          { label: locale === 'en' ? 'Annual leave pay' : '연차수당', value: format(Math.round(result.total)), highlight: true },
          { label: locale === 'en' ? 'Unused days' : '미사용 연차', value: `${result.days}${locale === 'en' ? ' days' : '일'}` },
        ]}
      />
    </div>
  )
}
