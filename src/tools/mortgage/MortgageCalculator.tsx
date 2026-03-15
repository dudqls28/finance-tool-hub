import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean } from '../../utils/formatCurrency'

export function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState('500000000')
  const [downPayment, setDownPayment] = useState('100000000')
  const [rate, setRate] = useState('4')
  const [term, setTerm] = useState('20')

  const result = useMemo(() => {
    const price = Number(homePrice) || 0
    const down = Number(downPayment) || 0
    const principal = Math.max(0, price - down)
    const r = Number(rate) / 100 / 12 || 0
    const n = Number(term) * 12 || 0
    if (n <= 0 || principal <= 0) return null
    const monthly = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    return { monthlyPayment: monthly }
  }, [homePrice, downPayment, rate, term])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">입력</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="price" label="주택 가격" value={homePrice} onChange={setHomePrice} unit="원" />
          <InputField id="down" label="계약금·중도금" value={downPayment} onChange={setDownPayment} unit="원" />
          <InputField id="rate" label="연 이자율" value={rate} onChange={setRate} unit="%" step="0.1" />
          <InputField id="term" label="대출 기간" value={term} onChange={setTerm} unit="년" />
        </div>
      </div>
      {result && (
        <ResultCard
          items={[{ label: '월 상환액', value: formatCurrencyKorean(Math.round(result.monthlyPayment)), highlight: true }]}
        />
      )}
    </div>
  )
}
