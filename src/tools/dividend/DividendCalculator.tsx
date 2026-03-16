import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean, formatCurrencyUSD } from '../../utils/formatCurrency'
import { useLocale } from '../../contexts/LocaleContext'

export function DividendCalculator() {
  const { locale, currency } = useLocale()
  const unit = currency === 'usd' ? 'USD' : '원'
  const format = currency === 'usd' ? formatCurrencyUSD : formatCurrencyKorean
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
        <h2 className="text-lg font-semibold text-text">{locale === 'en' ? 'Input' : '입력'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="amount" label={locale === 'en' ? 'Investment amount' : '투자 금액'} value={amount} onChange={setAmount} unit={unit} />
          <InputField id="yield" label={locale === 'en' ? 'Dividend yield' : '배당 수익률'} value={yieldPct} onChange={setYieldPct} unit="%" step="0.1" />
        </div>
      </div>
      <ResultCard
        items={[
          { label: locale === 'en' ? 'Annual dividend' : '연 배당금', value: format(Math.round(result.annual)), highlight: true },
          { label: locale === 'en' ? 'Monthly dividend' : '월 배당금', value: format(Math.round(result.monthly)) },
        ]}
      />
    </div>
  )
}
