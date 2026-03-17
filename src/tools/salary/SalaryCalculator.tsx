import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean, formatCurrencyUSD } from '../../utils/formatCurrency'
import { useLocale } from '../../contexts/LocaleContext'

export function SalaryCalculator() {
  const { locale, currency } = useLocale()
  const unit = currency === 'usd' ? 'USD' : '원'
  const format = currency === 'usd' ? formatCurrencyUSD : formatCurrencyKorean
  const [gross, setGross] = useState('50000000')
  const [taxRate, setTaxRate] = useState('15')

  const result = useMemo(() => {
    const g = Number(gross) || 0
    const t = Number(taxRate) / 100 || 0
    const net = g * (1 - t)
    const monthly = net / 12
    return { netSalary: net, monthlySalary: monthly }
  }, [gross, taxRate])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">{locale === 'en' ? 'Input' : '입력'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="gross" label={locale === 'en' ? 'Gross annual salary' : '세전 연봉'} value={gross} onChange={setGross} unit={unit} />
          <InputField id="tax" label={locale === 'en' ? 'Assumed deduction rate' : '추정 공제율'} value={taxRate} onChange={setTaxRate} unit="%" step="0.1" />
        </div>
      </div>
      <ResultCard
        items={[
          { label: locale === 'en' ? 'Net annual salary' : '세후 연봉', value: format(Math.round(result.netSalary)), highlight: true },
          { label: locale === 'en' ? 'Net monthly salary' : '세후 월급', value: format(Math.round(result.monthlySalary)) },
        ]}
      />
    </div>
  )
}
