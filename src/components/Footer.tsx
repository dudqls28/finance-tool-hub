import { useState } from 'react'
import { Link } from 'react-router-dom'

const FEEDBACK_EMAIL = 'been230408@gmail.com'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [copied, setCopied] = useState(false)

  const copyFeedbackEmail = async () => {
    try {
      await navigator.clipboard.writeText(FEEDBACK_EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      window.location.href = `mailto:${FEEDBACK_EMAIL}?subject=Finance Tool Hub 의견`
    }
  }

  return (
    <footer className="border-t border-slate-200 bg-slate-50/50 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="font-semibold text-primary">
            Finance Tool Hub
          </Link>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
            <Link to="/" className="hover:text-primary">홈</Link>
            <Link to="/tools" className="hover:text-primary">계산기</Link>
            <Link to="/privacy" className="hover:text-primary">개인정보처리방침</Link>
            <span className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyFeedbackEmail}
                className="hover:text-primary text-left"
              >
                의견 보내기
              </button>
              {copied && (
                <span className="text-primary text-xs whitespace-nowrap">
                  복사됨! Gmail 등에서 붙여넣어 보내주세요.
                </span>
              )}
            </span>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          © {currentYear} Finance Tool Hub. 투자·재테크 계산기 서비스.
        </p>
      </div>
    </footer>
  )
}
