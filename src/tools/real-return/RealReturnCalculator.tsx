import { useState, useMemo } from 'react'
import { InputField } from '../../components/InputField'
import { ResultCard } from '../../components/ResultCard'
import { useLocale } from '../../contexts/LocaleContext'

/** 실질 수익률 ≈ 명목 수익률 - 인플레이션율 (Fisher 간이). 정확: (1+명목)/(1+인플레이션) - 1 */
export function RealReturnCalculator() {
  const { locale } = useLocale()
  const [nominal, setNominal] = useState('7')
  const [inflation, setInflation] = useState('2.5')

  const result = useMemo(() => {
    const n = Number(nominal) / 100 || 0
    const i = Number(inflation) / 100 || 0
    const realSimple = (n - i) * 100
    const realExact = ((1 + n) / (1 + i) - 1) * 100
    return { realSimple, realExact }
  }, [nominal, inflation])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">{locale === 'en' ? 'Input' : '입력'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField id="nominal" label={locale === 'en' ? 'Nominal return' : '명목 수익률'} value={nominal} onChange={setNominal} unit="%" step="0.1" />
          <InputField id="inflation" label={locale === 'en' ? 'Inflation rate' : '인플레이션율'} value={inflation} onChange={setInflation} unit="%" step="0.1" />
        </div>
      </div>
      <ResultCard
        items={[
          { label: locale === 'en' ? 'Real return (simple)' : '실질 수익률 (간이)', value: `${result.realSimple.toFixed(2)}%`, highlight: true },
          { label: locale === 'en' ? 'Real return (exact)' : '실질 수익률 (정확)', value: `${result.realExact.toFixed(2)}%` },
        ]}
      />
    </div>
  )
}
