import { formatCurrencyKorean, formatCurrencyUSD } from '../utils/formatCurrency'

interface InputFieldProps {
  id: string
  label: string
  type?: 'number' | 'text'
  value: string | number
  onChange: (value: string) => void
  unit?: string
  placeholder?: string
  min?: number
  max?: number
  step?: string
}

export function InputField({
  id,
  label,
  type = 'number',
  value,
  onChange,
  unit,
  placeholder,
  min,
  max,
  step = '1',
}: InputFieldProps) {
  const strVal = String(value)
  const isCurrency = unit === '원' || unit === 'USD'
  const numVal = isCurrency ? Number(strVal.replace(/,/g, '')) : NaN
  const showRead = isCurrency && !Number.isNaN(numVal) && ((unit === '원' && numVal >= 10000) || (unit === 'USD' && numVal >= 100))

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-text">
        {label}
      </label>
      <div className="mt-1 flex rounded-lg border border-slate-300 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className="block w-full rounded-lg border-0 py-2.5 pl-3 pr-2 text-text placeholder:text-slate-400 focus:ring-0 sm:text-sm"
        />
        {unit && (
          <span className="flex items-center pr-3 text-sm text-slate-500">
            {unit}
          </span>
        )}
      </div>
      {showRead && (
        <p className="mt-1 text-xs text-slate-500">
          ≈ {unit === 'USD' ? formatCurrencyUSD(numVal) : formatCurrencyKorean(numVal)}
        </p>
      )}
    </div>
  )
}
