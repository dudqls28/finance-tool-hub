/**
 * 금액을 한글 단위(만/억/조)로 읽기 쉽게 표시
 * 예: 100000000 → "1억 원", 35000000 → "3,500만 원"
 */
const MAN = 1e4
const EOK = 1e8
const JO = 1e12

export function formatCurrencyKorean(n: number, suffix = ' 원'): string {
  if (!Number.isFinite(n) || n < 0) return `0${suffix}`
  const round = Math.round(n)
  if (round === 0) return `0${suffix}`

  if (round >= JO) {
    const jo = Math.floor(round / JO)
    const rest = round % JO
    if (rest >= EOK) {
      const eok = Math.floor(rest / EOK)
      return `${jo.toLocaleString()}조 ${eok}억${suffix}`
    }
    if (rest >= MAN) {
      const man = Math.floor(rest / MAN)
      return `${jo.toLocaleString()}조 ${man.toLocaleString()}만${suffix}`
    }
    return `${jo.toLocaleString()}조${suffix}`
  }

  if (round >= EOK) {
    const eok = Math.floor(round / EOK)
    const rest = round % EOK
    if (rest >= MAN) {
      const man = Math.floor(rest / MAN)
      return `${eok}억 ${man.toLocaleString()}만${suffix}`
    }
    return `${eok}억${suffix}`
  }

  if (round >= MAN) {
    const man = Math.floor(round / MAN)
    return `${man.toLocaleString()}만${suffix}`
  }

  return `${round.toLocaleString()}${suffix}`
}

/**
 * USD 금액을 K/M 단위로 읽기 쉽게 표시
 * 예: 1000000 → "$1M", 35000 → "$35K"
 */
export function formatCurrencyUSD(n: number): string {
  if (!Number.isFinite(n) || n < 0) return '$0'
  const round = Math.round(n)
  if (round === 0) return '$0'
  if (round >= 1e6) {
    const m = round / 1e6
    return m % 1 === 0 ? `$${m}M` : `$${m.toFixed(1)}M`
  }
  if (round >= 1e3) {
    const k = round / 1e3
    return k % 1 === 0 ? `$${k}K` : `$${k.toFixed(1)}K`
  }
  return `$${round.toLocaleString()}`
}
