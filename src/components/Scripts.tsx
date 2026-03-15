import { useEffect } from 'react'

const ADSENSE_CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID || ''

export function Scripts() {
  useEffect(() => {
    if (ADSENSE_CLIENT_ID) {
      const script = document.createElement('script')
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADSENSE_CLIENT_ID
      script.async = true
      script.crossOrigin = 'anonymous'
      document.head.appendChild(script)
    }
  }, [])

  return null
}
