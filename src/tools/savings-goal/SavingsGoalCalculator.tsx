import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { useLocale } from '../../contexts/LocaleContext'

export function SavingsGoalCalculator() {
  const { locale, currency } = useLocale()
  const unit = currency === 'usd' ? 'USD' : '원'
  const [current, setCurrent] = useState('10000000')
  const [monthly, setMonthly] = useState('500000')
  const [target, setTarget] = useState('100000000')
  const [rate, setRate] = useState('4')

  const result = useMemo(() => {
    let balance = Number(current) || 0
    const m = Number(monthly) || 0
    const goal = Number(target) || 0
    const r = Number(rate) / 100 / 12 || 0
    if (goal <= balance) return { years: 0, months: 0 }
    let months = 0
    const maxMonths = 1200
    while (balance < goal && months < maxMonths) {
      balance = balance * (1 + r) + m
      months++
    }
    return { years: Math.floor(months / 12), months: months % 12 }
  }, [current, monthly, target, rate])

  const timeStr = locale === 'en'
    ? (result.years > 0
        ? `${result.years} yrs${result.months > 0 ? ` ${result.months} mo` : ''}`.trim()
        : result.months > 0
          ? `${result.months} mo`
          : 'Goal reached')
    : (result.years > 0
        ? `${result.years}년 ${result.months > 0 ? `${result.months}개월` : ''}`.trim()
        : result.months > 0
          ? `${result.months}개월`
          : '이미 목표 달성')

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">{locale === 'en' ? 'Input' : '입력'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="current" label={locale === 'en' ? 'Current savings' : '현재 저축액'} value={current} onChange={setCurrent} unit={unit} />
          <InputField id="monthly" label={locale === 'en' ? 'Monthly savings' : '월 저축액'} value={monthly} onChange={setMonthly} unit={unit} />
          <InputField id="target" label={locale === 'en' ? 'Target amount' : '목표 금액'} value={target} onChange={setTarget} unit={unit} />
          <InputField id="rate" label={locale === 'en' ? 'Expected annual rate' : '예상 연 이자율'} value={rate} onChange={setRate} unit="%" step="0.1" />
        </div>
      </div>
      <ResultCard
        items={[{ label: locale === 'en' ? 'Time to reach goal' : '목표 도달 예상 기간', value: timeStr, highlight: true }]}
      />
    </div>
  )
}
