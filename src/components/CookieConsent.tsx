import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'finance-tool-hub-cookie-consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== 'accepted') setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-4 shadow-lg sm:px-6"
      role="dialog"
      aria-label="쿠키 동의"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          이 사이트는 서비스 개선과 맞춤 광고를 위해 쿠키를 사용합니다. 계속 이용하시면{' '}
          <Link to="/privacy" className="text-primary underline hover:no-underline">
            개인정보처리방침
          </Link>
          에 동의하는 것으로 간주됩니다.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={accept}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            동의
          </button>
        </div>
      </div>
    </div>
  )
}
