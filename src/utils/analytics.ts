/**
 * GA4 이벤트 전송
 * - 계산기 카드 클릭, 계산기 페이지 조회 등 사용 행동 추적
 */

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || ''

function gtag(...args: unknown[]): void {
  const w = window as unknown as { gtag?: (...a: unknown[]) => void }
  if (w.gtag) w.gtag(...args)
}

/** 계산기 카드/링크 클릭 (어떤 계산기를 골랐는지) */
export function trackCalculatorClick(toolId: string, toolName: string, fromPage: string): void {
  if (!GA_MEASUREMENT_ID) return
  gtag('event', 'calculator_click', {
    tool_id: toolId,
    tool_name: toolName,
    from_page: fromPage,
  })
}

/** 계산기 페이지 조회 (이미 라우트 변경으로 page_view는 GA가 자동 수집) */
export function trackCalculatorView(toolId: string, toolName: string): void {
  if (!GA_MEASUREMENT_ID) return
  gtag('event', 'calculator_view', {
    tool_id: toolId,
    tool_name: toolName,
  })
}
