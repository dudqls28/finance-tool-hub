import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean, formatCurrencyUSD } from '../../utils/formatCurrency'
import { useLocale } from '../../contexts/LocaleContext'

/** 주휴수당: 주 15시간 이상 근로 시 1주에 1일(4시간 또는 8시간) 유급. 주휴수당 = (주급 + 주휴수당) / (주 소정근로일수 + 1) × 1일 (또는 시급×4). 간이: 주급/주근로일수 = 일급, 주휴 1일 = 일급. So 주휴수당 = 주급 / (근로일수+1). 예: 5일 근로 시 주휴 1일 → 주휴 = 주급/6. */
export function WeeklyRestCalculator() {
  const { locale, currency } = useLocale()
  const unit = currency === 'usd' ? 'USD' : '원'
  const format = currency === 'usd' ? formatCurrencyUSD : formatCurrencyKorean
  const [weeklyWage, setWeeklyWage] = useState('500000')
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState('5')

  const result = useMemo(() => {
    const weekly = Number(weeklyWage) || 0
    const days = Number(workDaysPerWeek) || 0
    if (days < 1 || days > 7) return null
    // 주휴 1일분 = 주급 / (소정근로일수 + 1)
    const restPay = weekly / (days + 1)
    const dailyAvg = weekly / days
    return { restPay, dailyAvg }
  }, [weeklyWage, workDaysPerWeek])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">{locale === 'en' ? 'Input' : '입력'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField
            id="weekly"
            label={locale === 'en' ? 'Weekly wage' : '주급'}
            value={weeklyWage}
            onChange={setWeeklyWage}
            unit={unit}
          />
          <InputField
            id="days"
            label={locale === 'en' ? 'Work days per week' : '주 소정 근로일수'}
            value={workDaysPerWeek}
            onChange={setWorkDaysPerWeek}
            unit={locale === 'en' ? 'days' : '일'}
          />
        </div>
      </div>
      <ResultCard
        items={result ? [
          { label: locale === 'en' ? 'Weekly rest pay (1 day)' : '주휴수당 (1일분)', value: format(Math.round(result.restPay)), highlight: true },
          { label: locale === 'en' ? 'Daily wage (avg)' : '일급 (평균)', value: format(Math.round(result.dailyAvg)) },
        ] : []}
      />
    </div>
  )
}
