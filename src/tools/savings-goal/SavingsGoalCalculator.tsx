import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'

export function SavingsGoalCalculator() {
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

  const timeStr = result.years > 0
    ? `${result.years}년 ${result.months > 0 ? `${result.months}개월` : ''}`.trim()
    : result.months > 0
      ? `${result.months}개월`
      : '이미 목표 달성'

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">입력</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="current" label="현재 저축액" value={current} onChange={setCurrent} unit="원" />
          <InputField id="monthly" label="월 저축액" value={monthly} onChange={setMonthly} unit="원" />
          <InputField id="target" label="목표 금액" value={target} onChange={setTarget} unit="원" />
          <InputField id="rate" label="예상 연 이자율" value={rate} onChange={setRate} unit="%" step="0.1" />
        </div>
      </div>
      <ResultCard
        items={[{ label: '목표 도달 예상 기간', value: timeStr, highlight: true }]}
      />
    </div>
  )
}
