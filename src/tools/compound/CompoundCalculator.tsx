import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean } from '../../utils/formatCurrency'

export function CompoundCalculator() {
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
        <h2 className="text-lg font-semibold text-text">입력</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="initial" label="초기 투자금" value={initial} onChange={setInitial} unit="원" />
          <InputField id="monthly" label="월 납입액" value={monthly} onChange={setMonthly} unit="원" />
          <InputField id="rate" label="연 수익률" value={rate} onChange={setRate} unit="%" step="0.1" />
          <InputField id="years" label="기간" value={years} onChange={setYears} unit="년" />
        </div>
      </div>
      {futureValue !== null && (
        <ResultCard
          items={[{ label: '미래 가치', value: formatCurrencyKorean(Math.round(futureValue)), highlight: true }]}
        />
      )}
    </div>
  )
}
