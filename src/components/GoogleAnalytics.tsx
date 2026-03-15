import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || ''

export function GoogleAnalytics() {
  const location = useLocation()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    const gtag = (window as unknown as { gtag?: (a: string, b: string, c: object) => void }).gtag
    if (gtag) {
      gtag('config', GA_MEASUREMENT_ID, { page_path: location.pathname + location.search })
    }
  }, [location.pathname, location.search])

  return null
}
