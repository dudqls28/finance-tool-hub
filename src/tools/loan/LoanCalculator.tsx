import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean, formatCurrencyUSD } from '../../utils/formatCurrency'
import { useLocale } from '../../contexts/LocaleContext'

export function LoanCalculator() {
  const { locale, currency } = useLocale()
  const unit = currency === 'usd' ? 'USD' : '원'
  const format = currency === 'usd' ? formatCurrencyUSD : formatCurrencyKorean
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
        <h2 className="text-lg font-semibold text-text">{locale === 'en' ? 'Input' : '입력'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="principal" label={locale === 'en' ? 'Loan amount' : '대출 금액'} value={principal} onChange={setPrincipal} unit={unit} />
          <InputField id="rate" label={locale === 'en' ? 'Annual interest rate' : '연 이자율'} value={rate} onChange={setRate} unit="%" step="0.1" />
          <InputField id="term" label={locale === 'en' ? 'Loan term' : '대출 기간'} value={term} onChange={setTerm} unit={locale === 'en' ? 'yrs' : '년'} />
        </div>
      </div>
      <ResultCard
        items={result ? [
          { label: locale === 'en' ? 'Monthly payment' : '월 상환액', value: format(Math.round(result.monthlyPayment)), highlight: true },
          { label: locale === 'en' ? 'Total interest' : '총 이자', value: format(Math.round(result.totalInterest)) },
        ] : []}
      />
    </div>
  )
}
