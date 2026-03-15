import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean } from '../../utils/formatCurrency'

export function FireCalculator() {
  const [currentAge, setCurrentAge] = useState('35')
  const [currentSavings, setCurrentSavings] = useState('100000000')
  const [annualInvestment, setAnnualInvestment] = useState('12000000')
  const [expectedReturn, setExpectedReturn] = useState('7')
  const [annualExpenses, setAnnualExpenses] = useState('30000000')

  const result = useMemo(() => {
    const age = Number(currentAge) || 0
    const savings = Number(currentSavings) || 0
    const invest = Number(annualInvestment) || 0
    const rate = Number(expectedReturn) / 100 || 0
    const expenses = Number(annualExpenses) || 0
    const requiredNetWorth = expenses * 25
    if (expenses <= 0) return null
    let balance = savings
    let years = 0
    const maxYears = 80
    while (balance < requiredNetWorth && years < maxYears) {
      balance = balance * (1 + rate) + invest
      years++
    }
    const fireAge = age + years
    return {
      fireAge,
      requiredNetWorth,
      yearsRemaining: years,
    }
  }, [currentAge, currentSavings, annualInvestment, expectedReturn, annualExpenses])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">입력</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="age" label="현재 나이" value={currentAge} onChange={setCurrentAge} unit="세" />
          <InputField id="savings" label="현재 저축·투자 자산" value={currentSavings} onChange={setCurrentSavings} unit="원" />
          <InputField id="annual" label="연간 투자 금액" value={annualInvestment} onChange={setAnnualInvestment} unit="원" />
          <InputField id="return" label="예상 수익률" value={expectedReturn} onChange={setExpectedReturn} unit="%" step="0.1" />
          <InputField id="expenses" label="연간 지출" value={annualExpenses} onChange={setAnnualExpenses} unit="원" />
        </div>
      </div>
      {result && (
        <ResultCard
          items={[
            { label: 'FIRE 예상 나이', value: `${result.fireAge}세`, highlight: true },
            { label: '필요 순자산 (25배)', value: formatCurrencyKorean(result.requiredNetWorth) },
            { label: '남은 기간', value: `${result.yearsRemaining}년` },
          ]}
        />
      )}
    </div>
  )
}
