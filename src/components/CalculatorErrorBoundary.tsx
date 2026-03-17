import { Component, type ErrorInfo, type ReactNode } from 'react'

const errorLabels = {
  title: { ko: '계산기를 불러올 수 없습니다', en: 'Could not load calculator' },
  retry: { ko: '다시 시도', en: 'Try again' },
} as const

interface Props {
  children: ReactNode
  fallbackLocale?: 'ko' | 'en'
}

interface State {
  hasError: boolean
}

export class CalculatorErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Calculator error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <CalculatorErrorFallback
          locale={this.props.fallbackLocale ?? 'ko'}
          onRetry={() => this.setState({ hasError: false })}
        />
      )
    }
    return this.props.children
  }
}

function CalculatorErrorFallback({
  locale,
  onRetry,
}: {
  locale: 'ko' | 'en'
  onRetry: () => void
}) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-6 text-center">
      <p className="font-medium text-amber-800">{errorLabels.title[locale]}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 min-h-[44px] rounded-lg bg-amber-200 px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-300"
      >
        {errorLabels.retry[locale]}
      </button>
    </div>
  )
}
