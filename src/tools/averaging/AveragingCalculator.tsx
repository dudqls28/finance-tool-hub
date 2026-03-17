import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { useLocale } from '../../contexts/LocaleContext'

/** 평균 단가는 정확한 금액 표시 (만/억 축약 시 50,495원이 "5만 원"으로만 나와 오해 소지 있음) */
function formatExactPrice(value: number, currency: 'krw' | 'usd'): string {
  const n = Math.round(value)
  if (currency === 'usd') return `$${n.toLocaleString()}`
  return `${n.toLocaleString()}원`
}

export function AveragingCalculator() {
  const { locale, currency } = useLocale()
  const unit = currency === 'usd' ? 'USD' : '원'
  const format = (v: number) => formatExactPrice(v, currency)
  const [avgPrice, setAvgPrice] = useState('50000')
  const [shares, setShares] = useState('100')
  const [buyPrice, setBuyPrice] = useState('40000')
  const [addShares, setAddShares] = useState('50')

  const result = useMemo(() => {
    const p = Number(avgPrice) || 0
    const s = Number(shares) || 0
    const bp = Number(buyPrice) || 0
    const as = Number(addShares) || 0
    const totalCost = p * s + bp * as
    const totalShares = s + as
    if (totalShares <= 0) return null
    const newAvg = totalCost / totalShares
    return { newAvg, currentSharesZero: s === 0 }
  }, [avgPrice, shares, buyPrice, addShares])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">{locale === 'en' ? 'Input' : '입력'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="avg" label={locale === 'en' ? 'Current average price' : '현재 평균 단가'} value={avgPrice} onChange={setAvgPrice} unit={unit} />
          <InputField id="shares" label={locale === 'en' ? 'Current shares' : '현재 보유 수량'} value={shares} onChange={setShares} unit={locale === 'en' ? 'shares' : '주'} placeholder={locale === 'en' ? 'e.g. 100' : '예: 100'} min={0} />
          <InputField id="buy" label={locale === 'en' ? 'Additional buy price' : '추가 매수 단가'} value={buyPrice} onChange={setBuyPrice} unit={unit} />
          <InputField id="add" label={locale === 'en' ? 'Additional shares' : '추가 매수 수량'} value={addShares} onChange={setAddShares} unit={locale === 'en' ? 'shares' : '주'} placeholder={locale === 'en' ? 'e.g. 50' : '예: 50'} min={0} />
        </div>
      </div>
      <ResultCard
        items={result !== null ? [{ label: locale === 'en' ? 'New average price' : '새 평균 단가', value: format(Math.round(result.newAvg)), highlight: true }] : []}
      />
      {result?.currentSharesZero && (
        <p className="mt-2 text-sm text-amber-700 dark:text-amber-400">
          {locale === 'en'
            ? 'Current shares is 0, so the new average equals the additional buy price. If you already hold shares, enter the current share count above.'
            : '현재 보유 수량이 0이면 새 평균은 추가 매수 단가와 같습니다. 이미 보유 중인 주식이 있다면 위 "현재 보유 수량"을 입력해 주세요.'}
        </p>
      )}
    </div>
  )
}
