import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean } from '../../utils/formatCurrency'

export function DividendCalculator() {
  const [amount, setAmount] = useState('10000000')
  const [yieldPct, setYieldPct] = useState('3')

  const result = useMemo(() => {
    const a = Number(amount) || 0
    const y = Number(yieldPct) / 100 || 0
    const annual = a * y
    const monthly = annual / 12
    return { annual, monthly }
  }, [amount, yieldPct])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">입력</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="amount" label="투자 금액" value={amount} onChange={setAmount} unit="원" />
          <InputField id="yield" label="배당 수익률" value={yieldPct} onChange={setYieldPct} unit="%" step="0.1" />
        </div>
      </div>
      <ResultCard
        items={[
          { label: '연 배당금', value: formatCurrencyKorean(Math.round(result.annual)), highlight: true },
          { label: '월 배당금', value: formatCurrencyKorean(Math.round(result.monthly)) },
        ]}
      />
    </div>
  )
}
