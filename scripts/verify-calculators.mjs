/**
 * 계산기 공식 직접 검증 스크립트
 * 실행: node scripts/verify-calculators.mjs
 * (프로젝트 루트에서)
 */

const assert = (name, actual, expected, tolerance = 0) => {
  const ok = tolerance ? Math.abs(actual - expected) <= tolerance : actual === expected
  const msg = ok ? '✅' : '❌'
  console.log(`${msg} ${name}: ${actual}${tolerance ? ` (기대: ${expected}, 오차 허용: ${tolerance})` : ''}`)
  if (!ok && !tolerance) throw new Error(`${name} expected ${expected}, got ${actual}`)
}

console.log('=== 1. 평균 단가 ===')
const p_avg = 100000, s_avg = 100, bp_avg = 50000, as_avg = 10023
const totalCost = p_avg * s_avg + bp_avg * as_avg
const totalShares = s_avg + as_avg
const newAvg = totalCost / totalShares
assert('새 평균 단가', Math.round(newAvg), 50495, 1)
console.log(`   입력: ${p_avg}원×${s_avg}주 + ${bp_avg}원×${as_avg}주 → ${Math.round(newAvg)}원\n`)

console.log('=== 2. 배당 ===')
const amount_div = 10_000_000, yieldPct = 3
const annual_div = amount_div * (yieldPct / 100)
const monthly_div = annual_div / 12
assert('연 배당금', Math.round(annual_div), 300_000)
assert('월 배당금', Math.round(monthly_div), 25_000)
console.log(`   입력: ${amount_div}원, ${yieldPct}% → 연 ${annual_div}원, 월 ${monthly_div}원\n`)

console.log('=== 3. 세후 연봉 ===')
const gross = 50_000_000, taxRate = 15
const net = gross * (1 - taxRate / 100)
const monthly_net = net / 12
assert('세후 연봉', Math.round(net), 42_500_000)
assert('세후 월급', Math.round(monthly_net), 3_541_667)
console.log(`   입력: 세전 ${gross}원, 세율 ${taxRate}% → 세후 연봉 ${Math.round(net)}원\n`)

console.log('=== 4. 인플레이션 ===')
const amount_inf = 10_000_000, rate_inf = 2.5, years_inf = 10
const fv_inf = amount_inf * Math.pow(1 + rate_inf / 100, years_inf)
assert('미래 가치', Math.round(fv_inf), 12_800_000, 10000)
console.log(`   입력: ${amount_inf}원, ${rate_inf}%/년, ${years_inf}년 → ${Math.round(fv_inf)}원\n`)

console.log('=== 5. 대출 (원리금 균등) ===')
const principal = 100_000_000, rate_loan = 5, term_loan = 10
const r = rate_loan / 100 / 12
const n = term_loan * 12
const monthly_loan = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
const totalPayment = monthly_loan * n
const totalInterest = totalPayment - principal
assert('월 상환액', Math.round(monthly_loan), 1_060_655, 1)
assert('총 이자', Math.round(totalInterest), 27_278_618, 1)
console.log(`   입력: ${principal}원, ${rate_loan}%, ${term_loan}년 → 월 ${Math.round(monthly_loan)}원, 총 이자 ${Math.round(totalInterest)}원\n`)

console.log('=== 6. 복리 (초기+월납입) ===')
const initial = 10_000_000, monthly_c = 500_000, rate_c = 7, years_c = 10
const r_c = rate_c / 100 / 12
const n_c = years_c * 12
let fv_c = initial * Math.pow(1 + r_c, n_c)
for (let i = 0; i < n_c; i++) fv_c += monthly_c * Math.pow(1 + r_c, n_c - 1 - i)
assert('복리 미래가치', Math.round(fv_c), 106_639_017, 1000)
console.log(`   입력: 초기 ${initial}, 월 ${monthly_c}, ${rate_c}%, ${years_c}년 → ${Math.round(fv_c)}원\n`)

console.log('=== 7. DCA (월 납입만) ===')
const monthly_dca = 500_000, years_dca = 10, rate_dca = 7
const r_dca = rate_dca / 100 / 12
const months_dca = years_dca * 12
let value_dca = 0
for (let i = 0; i < months_dca; i++) value_dca = value_dca * (1 + r_dca) + monthly_dca
const totalInvested_dca = monthly_dca * months_dca
assert('총 투자금', totalInvested_dca, 60_000_000)
assert('DCA 포트폴리오 가치', Math.round(value_dca), 86_542_404, 1000)
console.log(`   입력: 월 ${monthly_dca}, ${years_dca}년, ${rate_dca}% → 투자 ${totalInvested_dca}원, 평가 ${Math.round(value_dca)}원\n`)

console.log('=== 8. FIRE 시뮬레이션 ===')
let balance = 100_000_000
const invest = 12_000_000, rate_fire = 0.07, requiredNetWorth = 30_000_000 * 25
let years_fire = 0
while (balance < requiredNetWorth && years_fire < 80) {
  balance = balance * (1 + rate_fire) + invest
  years_fire++
}
assert('필요 순자산 (25배)', requiredNetWorth, 750_000_000)
assert('FIRE 도달 년수', years_fire, 18, 1)
console.log(`   입력: 저축 1억, 연투자 1200만, 7%, 지출 3000만 → 필요 ${requiredNetWorth}원, ${years_fire}년 후 도달\n`)

console.log('=== 9. 목표 자산 시뮬레이션 ===')
let balance_goal = 10_000_000
const m_goal = 500_000, goal = 100_000_000, r_goal = 4 / 100 / 12
let months_goal = 0
while (balance_goal < goal && months_goal < 1200) {
  balance_goal = balance_goal * (1 + r_goal) + m_goal
  months_goal++
}
const years_goal = Math.floor(months_goal / 12)
const months_rem = months_goal % 12
console.log(`   입력: 현재 1000만, 월 50만, 목표 1억, 4% → ${years_goal}년 ${months_rem}개월 (총 ${months_goal}개월)`)
assert('목표 도달 개월 수', months_goal, 135, 2)
console.log('')

console.log('=== 10. 주담대 (대출과 동일 공식) ===')
const price = 500_000_000, down = 100_000_000
const principal_m = price - down
const rate_m = 4, term_m = 20
const r_m = rate_m / 100 / 12
const n_m = term_m * 12
const monthly_m = (principal_m * r_m * Math.pow(1 + r_m, n_m)) / (Math.pow(1 + r_m, n_m) - 1)
assert('주담대 월 상환액', Math.round(monthly_m), 2_423_921, 1)
console.log(`   입력: 가격 ${price}, 계약금 ${down}, ${rate_m}%, ${term_m}년 → 월 ${Math.round(monthly_m)}원\n`)

console.log('--- 검증 완료 ---')
