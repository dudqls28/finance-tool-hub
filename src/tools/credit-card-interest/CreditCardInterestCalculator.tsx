import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean, formatCurrencyUSD } from '../../utils/formatCurrency'
import { useLocale } from '../../contexts/LocaleContext'

/** 신용카드 revolving 이자: 잔액 × 일이자율 × 일수. 일이자율 = 연이자율/365. 간이: 월 잔액 × 월이자율. */
export function CreditCardInterestCalculator() {
  const { locale, currency } = useLocale()
  const unit = currency === 'usd' ? 'USD' : '원'
  const format = currency === 'usd' ? formatCurrencyUSD : formatCurrencyKorean
  const [balance, setBalance] = useState('1000000')
  const [rate, setRate] = useState('18')
  const [minPaymentPct, setMinPaymentPct] = useState('10')

  const result = useMemo(() => {
    const b = Number(balance) || 0
    const r = Number(rate) / 100 / 12 || 0
    const minPct = Number(minPaymentPct) / 100 || 0
    const monthlyInterest = b * r
    const minPayment = b * minPct
    const principalOnly = Math.max(0, minPayment - monthlyInterest)
    return { monthlyInterest, minPayment, principalOnly }
  }, [balance, rate, minPaymentPct])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">{locale === 'en' ? 'Input' : '입력'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="balance" label={locale === 'en' ? 'Revolving balance' : '리볼빙 잔액'} value={balance} onChange={setBalance} unit={unit} />
          <InputField id="rate" label={locale === 'en' ? 'Annual interest rate' : '연 이자율'} value={rate} onChange={setRate} unit="%" step="0.1" />
          <InputField id="min" label={locale === 'en' ? 'Min payment %' : '최소결제비율'} value={minPaymentPct} onChange={setMinPaymentPct} unit="%" step="1" />
        </div>
      </div>
      <ResultCard
        items={[
          { label: locale === 'en' ? 'Monthly interest' : '이번 달 이자', value: format(Math.round(result.monthlyInterest)), highlight: true },
          { label: locale === 'en' ? 'Min payment' : '최소결제액', value: format(Math.round(result.minPayment)) },
          { label: locale === 'en' ? 'Principal in min payment' : '최소결제 중 원금', value: format(Math.round(result.principalOnly)) },
        ]}
      />
    </div>
  )
}
