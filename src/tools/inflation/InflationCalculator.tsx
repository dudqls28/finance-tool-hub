import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean } from '../../utils/formatCurrency'

export function InflationCalculator() {
  const [amount, setAmount] = useState('10000000')
  const [rate, setRate] = useState('2.5')
  const [years, setYears] = useState('10')

  const futureValue = useMemo(() => {
    const a = Number(amount) || 0
    const r = Number(rate) / 100 || 0
    const y = Number(years) || 0
    return a * Math.pow(1 + r, y)
  }, [amount, rate, years])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">입력</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="amount" label="현재 금액" value={amount} onChange={setAmount} unit="원" />
          <InputField id="rate" label="연 인플레이션율" value={rate} onChange={setRate} unit="%" step="0.1" />
          <InputField id="years" label="기간" value={years} onChange={setYears} unit="년" />
        </div>
      </div>
      <ResultCard
        items={[{ label: '미래 가치 (동일 구매력)', value: formatCurrencyKorean(Math.round(futureValue)), highlight: true }]}
      />
    </div>
  )
}
