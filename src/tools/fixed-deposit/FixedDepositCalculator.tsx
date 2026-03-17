import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean, formatCurrencyUSD } from '../../utils/formatCurrency'
import { useLocale } from '../../contexts/LocaleContext'

/** 정기예금: 단리 = 원금 × 연이율 × 년수. 복리 = 원금 × (1+r)^n - 원금. 이자소득세 간이 15.4% (비과세 제외). */
export function FixedDepositCalculator() {
  const { locale, currency } = useLocale()
  const unit = currency === 'usd' ? 'USD' : '원'
  const format = currency === 'usd' ? formatCurrencyUSD : formatCurrencyKorean
  const [principal, setPrincipal] = useState('10000000')
  const [rate, setRate] = useState('4')
  const [years, setYears] = useState('1')
  const [compound, setCompound] = useState(false)

  const result = useMemo(() => {
    const p = Number(principal) || 0
    const r = Number(rate) / 100 || 0
    const y = Number(years) || 0
    if (y <= 0) return null
    let interest: number
    if (compound) {
      const total = p * Math.pow(1 + r, y)
      interest = total - p
    } else {
      interest = p * r * y
    }
    const taxRate = 0.154
    const tax = interest * taxRate
    const afterTax = interest - tax
    return { interest, tax, afterTax, maturity: p + afterTax }
  }, [principal, rate, years, compound])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">{locale === 'en' ? 'Input' : '입력'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="principal" label={locale === 'en' ? 'Principal' : '원금'} value={principal} onChange={setPrincipal} unit={unit} />
          <InputField id="rate" label={locale === 'en' ? 'Annual rate' : '연 이자율'} value={rate} onChange={setRate} unit="%" step="0.1" />
          <InputField id="years" label={locale === 'en' ? 'Term' : '기간'} value={years} onChange={setYears} unit={locale === 'en' ? 'yrs' : '년'} />
          <div>
            <label className="block text-sm font-medium text-text">{locale === 'en' ? 'Compound interest' : '복리'}</label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="checkbox"
                checked={compound}
                onChange={(e) => setCompound(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-primary"
              />
              <span className="text-sm text-slate-600">{compound ? (locale === 'en' ? 'Yes' : '예') : (locale === 'en' ? 'No (simple)' : '아니오(단리)')}</span>
            </div>
          </div>
        </div>
      </div>
      <ResultCard
        items={result ? [
          { label: locale === 'en' ? 'Interest (before tax)' : '이자 (세전)', value: format(Math.round(result.interest)), highlight: true },
          { label: locale === 'en' ? 'Tax (15.4%)' : '이자소득세 (15.4%)', value: format(Math.round(result.tax)) },
          { label: locale === 'en' ? 'After tax' : '세후 이자', value: format(Math.round(result.afterTax)) },
          { label: locale === 'en' ? 'Maturity (principal + after tax)' : '만기 수령액', value: format(Math.round(result.maturity)) },
        ] : []}
      />
    </div>
  )
}
