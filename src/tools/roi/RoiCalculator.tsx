import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean, formatCurrencyUSD } from '../../utils/formatCurrency'
import { useLocale } from '../../contexts/LocaleContext'

/** ROI: (매도가 - 매수가) × 수량 = 수익금. 수익률 = (매도가 - 매수가) / 매수가 × 100. */
export function RoiCalculator() {
  const { locale, currency } = useLocale()
  const unit = currency === 'usd' ? 'USD' : '원'
  const format = currency === 'usd' ? formatCurrencyUSD : formatCurrencyKorean
  const [buyPrice, setBuyPrice] = useState('50000')
  const [sellPrice, setSellPrice] = useState('60000')
  const [shares, setShares] = useState('100')

  const result = useMemo(() => {
    const buy = Number(buyPrice) || 0
    const sell = Number(sellPrice) || 0
    const qty = Number(shares) || 0
    if (buy <= 0) return null
    const profit = (sell - buy) * qty
    const roiPct = ((sell - buy) / buy) * 100
    const invested = buy * qty
    return { profit, roiPct, invested }
  }, [buyPrice, sellPrice, shares])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">{locale === 'en' ? 'Input' : '입력'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="buy" label={locale === 'en' ? 'Buy price' : '매수가'} value={buyPrice} onChange={setBuyPrice} unit={unit} />
          <InputField id="sell" label={locale === 'en' ? 'Sell price' : '매도가'} value={sellPrice} onChange={setSellPrice} unit={unit} />
          <InputField id="shares" label={locale === 'en' ? 'Quantity' : '수량'} value={shares} onChange={setShares} unit={locale === 'en' ? 'shares' : '주'} />
        </div>
      </div>
      <ResultCard
        items={result ? [
          { label: locale === 'en' ? 'Profit / Loss' : '손익', value: format(Math.round(result.profit)), highlight: true },
          { label: locale === 'en' ? 'ROI' : '수익률', value: `${result.roiPct >= 0 ? '' : ''}${result.roiPct.toFixed(2)}%` },
          { label: locale === 'en' ? 'Invested' : '투자금', value: format(Math.round(result.invested)) },
        ] : []}
      />
    </div>
  )
}
