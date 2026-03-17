import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean, formatCurrencyUSD } from '../../utils/formatCurrency'
import { useLocale } from '../../contexts/LocaleContext'

/** 예비금: 월 지출 × 3, 6, 12 등. 권장 3~6개월. */
export function EmergencyFundCalculator() {
  const { locale, currency } = useLocale()
  const unit = currency === 'usd' ? 'USD' : '원'
  const format = currency === 'usd' ? formatCurrencyUSD : formatCurrencyKorean
  const [monthlyExpense, setMonthlyExpense] = useState('2000000')
  const [months, setMonths] = useState('6')

  const result = useMemo(() => {
    const m = Number(monthlyExpense) || 0
    const n = Number(months) || 0
    const target = m * n
    const three = m * 3
    const six = m * 6
    const twelve = m * 12
    return { target, three, six, twelve, months: n }
  }, [monthlyExpense, months])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">{locale === 'en' ? 'Input' : '입력'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField
            id="expense"
            label={locale === 'en' ? 'Monthly expenses' : '월 지출액'}
            value={monthlyExpense}
            onChange={setMonthlyExpense}
            unit={unit}
          />
          <InputField
            id="months"
            label={locale === 'en' ? 'Months to cover' : '목표 개월수'}
            value={months}
            onChange={setMonths}
            unit={locale === 'en' ? 'months' : '개월'}
          />
        </div>
      </div>
      <ResultCard
        items={[
          { label: locale === 'en' ? `Target (${result.months} months)` : `목표 (${result.months}개월분)`, value: format(Math.round(result.target)), highlight: true },
          { label: '3 months', value: format(Math.round(result.three)) },
          { label: '6 months', value: format(Math.round(result.six)) },
          { label: '12 months', value: format(Math.round(result.twelve)) },
        ]}
      />
    </div>
  )
}
