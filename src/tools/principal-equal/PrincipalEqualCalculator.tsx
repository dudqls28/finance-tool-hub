import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean, formatCurrencyUSD } from '../../utils/formatCurrency'
import { useLocale } from '../../contexts/LocaleContext'

/** 원금 균등: 매월 상환 원금 = P/n 고정, 매월 이자 = 잔여원금 × 월이자율. 첫 달 상환액 = P/n + P*r, 둘째 = P/n + (P - P/n)*r, ... */
export function PrincipalEqualCalculator() {
  const { locale, currency } = useLocale()
  const unit = currency === 'usd' ? 'USD' : '원'
  const format = currency === 'usd' ? formatCurrencyUSD : formatCurrencyKorean
  const [principal, setPrincipal] = useState('100000000')
  const [rate, setRate] = useState('5')
  const [term, setTerm] = useState('10')

  const result = useMemo(() => {
    const p = Number(principal) || 0
    const r = Number(rate) / 100 / 12 || 0
    const n = Math.floor(Number(term) * 12) || 0
    if (n <= 0 || p <= 0) return null
    const principalPerMonth = p / n
    let totalInterest = 0
    let balance = p
    for (let i = 0; i < n; i++) {
      const interest = balance * r
      totalInterest += interest
      balance -= principalPerMonth
    }
    const firstPayment = principalPerMonth + p * r
    const lastPayment = principalPerMonth + principalPerMonth * r
    return {
      totalInterest,
      firstPayment,
      lastPayment,
      principalPerMonth,
    }
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
      {result && (
        <ResultCard
          items={[
            { label: locale === 'en' ? 'First month payment' : '첫 달 상환액', value: format(Math.round(result.firstPayment)), highlight: true },
            { label: locale === 'en' ? 'Last month payment' : '마지막 달 상환액', value: format(Math.round(result.lastPayment)) },
            { label: locale === 'en' ? 'Total interest' : '총 이자', value: format(Math.round(result.totalInterest)) },
          ]}
        />
      )}
    </div>
  )
}
