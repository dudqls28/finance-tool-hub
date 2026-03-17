import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean, formatCurrencyUSD } from '../../utils/formatCurrency'
import { useLocale } from '../../contexts/LocaleContext'

/** 전세대출: 보증금(대출한도)에 대해 이자만 납부하는 경우. 월 이자 = 대출잔액 × 월이자율. 거치 후 원리금 상환도 있으나, 간이로 이자만 계산. */
export function JeonseLoanCalculator() {
  const { locale, currency } = useLocale()
  const unit = currency === 'usd' ? 'USD' : '원'
  const format = currency === 'usd' ? formatCurrencyUSD : formatCurrencyKorean
  const [principal, setPrincipal] = useState('300000000')
  const [rate, setRate] = useState('4')

  const result = useMemo(() => {
    const p = Number(principal) || 0
    const r = Number(rate) / 100 / 12 || 0
    const monthlyInterest = p * r
    const annualInterest = monthlyInterest * 12
    return { monthlyInterest, annualInterest }
  }, [principal, rate])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">{locale === 'en' ? 'Input' : '입력'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField
            id="principal"
            label={locale === 'en' ? 'Loan amount (deposit)' : '전세자금 대출금(보증금)'}
            value={principal}
            onChange={setPrincipal}
            unit={unit}
          />
          <InputField id="rate" label={locale === 'en' ? 'Annual interest rate' : '연 이자율'} value={rate} onChange={setRate} unit="%" step="0.1" />
        </div>
      </div>
      <ResultCard
        items={[
          { label: locale === 'en' ? 'Monthly interest' : '월 이자', value: format(Math.round(result.monthlyInterest)), highlight: true },
          { label: locale === 'en' ? 'Annual interest' : '연 이자', value: format(Math.round(result.annualInterest)) },
        ]}
      />
    </div>
  )
}
