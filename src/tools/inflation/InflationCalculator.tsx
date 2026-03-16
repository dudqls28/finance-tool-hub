import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean, formatCurrencyUSD } from '../../utils/formatCurrency'
import { useLocale } from '../../contexts/LocaleContext'

export function InflationCalculator() {
  const { locale, currency } = useLocale()
  const unit = currency === 'usd' ? 'USD' : '원'
  const format = currency === 'usd' ? formatCurrencyUSD : formatCurrencyKorean
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
        <h2 className="text-lg font-semibold text-text">{locale === 'en' ? 'Input' : '입력'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="amount" label={locale === 'en' ? 'Current amount' : '현재 금액'} value={amount} onChange={setAmount} unit={unit} />
          <InputField id="rate" label={locale === 'en' ? 'Annual inflation rate' : '연 인플레이션율'} value={rate} onChange={setRate} unit="%" step="0.1" />
          <InputField id="years" label={locale === 'en' ? 'Period' : '기간'} value={years} onChange={setYears} unit={locale === 'en' ? 'yrs' : '년'} />
        </div>
      </div>
      <ResultCard
        items={[{ label: locale === 'en' ? 'Future value (same purchasing power)' : '미래 가치 (동일 구매력)', value: format(Math.round(futureValue)), highlight: true }]}
      />
    </div>
  )
}
