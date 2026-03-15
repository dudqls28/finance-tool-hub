import { useEffect } from 'react'

const ADSENSE_CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID || ''

interface AdSlotProps {
  slotId?: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  className?: string
}

export function AdSlot({ slotId, format = 'auto', className = '' }: AdSlotProps) {
  useEffect(() => {
    if (!ADSENSE_CLIENT_ID || !slotId) return
    try {
      ;(window as unknown as { adsbygoogle: unknown[] }).adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []
      ;(window as unknown as { adsbygoogle: unknown[] }).adsbygoogle.push({})
    } catch (e) {
      console.warn('AdSense push error', e)
    }
  }, [slotId])

  if (!ADSENSE_CLIENT_ID) {
    return (
      <div className={`min-h-[90px] rounded border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400 text-sm ${className}`}>
        [광고 영역 - VITE_ADSENSE_CLIENT_ID 설정 후 표시]
      </div>
    )
  }

  if (!slotId) {
    return (
      <div className={`min-h-[90px] rounded border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400 text-sm ${className}`}>
        [광고 슬롯 - slotId 필요]
      </div>
    )
  }

  return (
    <div className={`my-6 ${className}`}>
      <ins
        className="adsbygoogle block"
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
