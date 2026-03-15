import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { formatCurrencyKorean } from '../../utils/formatCurrency'

export function AveragingCalculator() {
  const [avgPrice, setAvgPrice] = useState('50000')
  const [shares, setShares] = useState('100')
  const [buyPrice, setBuyPrice] = useState('40000')
  const [addShares, setAddShares] = useState('50')

  const newAvg = useMemo(() => {
    const p = Number(avgPrice) || 0
    const s = Number(shares) || 0
    const bp = Number(buyPrice) || 0
    const as = Number(addShares) || 0
    const totalCost = p * s + bp * as
    const totalShares = s + as
    if (totalShares <= 0) return null
    return totalCost / totalShares
  }, [avgPrice, shares, buyPrice, addShares])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">입력</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="avg" label="현재 평균 단가" value={avgPrice} onChange={setAvgPrice} unit="원" />
          <InputField id="shares" label="현재 보유 수량" value={shares} onChange={setShares} unit="주" />
          <InputField id="buy" label="추가 매수 단가" value={buyPrice} onChange={setBuyPrice} unit="원" />
          <InputField id="add" label="추가 매수 수량" value={addShares} onChange={setAddShares} unit="주" />
        </div>
      </div>
      {newAvg !== null && (
        <ResultCard
          items={[{ label: '새 평균 단가', value: formatCurrencyKorean(Math.round(newAvg)), highlight: true }]}
        />
      )}
    </div>
  )
}
