import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean } from '../../utils/formatCurrency'

export function LoanCalculator() {
  const [principal, setPrincipal] = useState('100000000')
  const [rate, setRate] = useState('5')
  const [term, setTerm] = useState('10')

  const result = useMemo(() => {
    const p = Number(principal) || 0
    const r = Number(rate) / 100 / 12 || 0
    const n = Number(term) * 12 || 0
    if (n <= 0 || p <= 0) return null
    const monthly = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalPayment = monthly * n
    const totalInterest = totalPayment - p
    return { monthlyPayment: monthly, totalInterest }
  }, [principal, rate, term])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">입력</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="principal" label="대출 금액" value={principal} onChange={setPrincipal} unit="원" />
          <InputField id="rate" label="연 이자율" value={rate} onChange={setRate} unit="%" step="0.1" />
          <InputField id="term" label="대출 기간" value={term} onChange={setTerm} unit="년" />
        </div>
      </div>
      {result && (
        <ResultCard
          items={[
            { label: '월 상환액', value: formatCurrencyKorean(Math.round(result.monthlyPayment)), highlight: true },
            { label: '총 이자', value: formatCurrencyKorean(Math.round(result.totalInterest)) },
          ]}
        />
      )}
    </div>
  )
}
