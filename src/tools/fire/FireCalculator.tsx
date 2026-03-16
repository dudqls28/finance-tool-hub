import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean, formatCurrencyUSD } from '../../utils/formatCurrency'
import { useLocale } from '../../contexts/LocaleContext'

const labels = {
  input: { ko: '입력', en: 'Input' },
  age: { ko: '현재 나이', en: 'Current age' },
  savings: { ko: '현재 저축·투자 자산', en: 'Current savings & investments' },
  annual: { ko: '연간 투자 금액', en: 'Annual investment' },
  return: { ko: '예상 수익률', en: 'Expected return' },
  expenses: { ko: '연간 지출', en: 'Annual expenses' },
  fireAge: { ko: 'FIRE 예상 나이', en: 'FIRE age' },
  required: { ko: '필요 순자산 (25배)', en: 'Required net worth (25x)' },
  yearsLeft: { ko: '남은 기간', en: 'Years remaining' },
} as const

export function FireCalculator() {
  const { locale, currency } = useLocale()
  const unit = currency === 'usd' ? 'USD' : '원'
  const format = currency === 'usd' ? formatCurrencyUSD : formatCurrencyKorean
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
        <h2 className="text-lg font-semibold text-text">{labels.input[locale]}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="age" label={labels.age[locale]} value={currentAge} onChange={setCurrentAge} unit={locale === 'en' ? 'yrs' : '세'} />
          <InputField id="savings" label={labels.savings[locale]} value={currentSavings} onChange={setCurrentSavings} unit={unit} />
          <InputField id="annual" label={labels.annual[locale]} value={annualInvestment} onChange={setAnnualInvestment} unit={unit} />
          <InputField id="return" label={labels.return[locale]} value={expectedReturn} onChange={setExpectedReturn} unit="%" step="0.1" />
          <InputField id="expenses" label={labels.expenses[locale]} value={annualExpenses} onChange={setAnnualExpenses} unit={unit} />
        </div>
      </div>
      {result && (
        <ResultCard
          items={[
            { label: labels.fireAge[locale], value: `${result.fireAge}${locale === 'en' ? ' yrs' : '세'}`, highlight: true },
            { label: labels.required[locale], value: format(result.requiredNetWorth) },
            { label: labels.yearsLeft[locale], value: `${result.yearsRemaining}${locale === 'en' ? ' yrs' : '년'}` },
          ]}
        />
      )}
    </div>
  )
}
