import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocale } from '../contexts/LocaleContext'

const FEEDBACK_EMAIL = 'been230408@gmail.com'

const footerLabels = {
  home: { ko: '홈', en: 'Home' },
  tools: { ko: '계산기', en: 'Calculators' },
  privacy: { ko: '개인정보처리방침', en: 'Privacy' },
  feedback: { ko: '의견 보내기', en: 'Send feedback' },
  copied: { ko: '복사됨! Gmail 등에서 붙여넣어 보내주세요.', en: 'Copied! Paste in Gmail or your email app to send.' },
  copyright: { ko: '투자·재테크 계산기 서비스.', en: 'Investment & finance calculators.' },
} as const

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [copied, setCopied] = useState(false)
  const { locale } = useLocale()

  const copyFeedbackEmail = async () => {
    try {
      await navigator.clipboard.writeText(FEEDBACK_EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      window.location.href = `mailto:${FEEDBACK_EMAIL}?subject=Finance Tool Hub feedback`
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
            <Link to="/" className="hover:text-primary">{footerLabels.home[locale]}</Link>
            <Link to="/tools" className="hover:text-primary">{footerLabels.tools[locale]}</Link>
            <Link to="/privacy" className="hover:text-primary">{footerLabels.privacy[locale]}</Link>
            <span className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyFeedbackEmail}
                className="hover:text-primary text-left"
              >
                {footerLabels.feedback[locale]}
              </button>
              {copied && (
                <span className="text-primary text-xs whitespace-nowrap">
                  {footerLabels.copied[locale]}
                </span>
              )}
            </span>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          © {currentYear} Finance Tool Hub. {footerLabels.copyright[locale]}
        </p>
      </div>
    </footer>
  )
}
