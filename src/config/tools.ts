export interface ToolFaq {
  q: string
  a: string
}

export interface ToolConfig {
  id: string
  slug: string
  name: string
  nameEn: string
  description: string
  metaDescription: string
  category: 'investment' | 'retirement' | 'loan' | 'salary' | 'savings' | 'inflation'
  explanation: string
  formula: string
  faq: ToolFaq[]
  relatedToolIds: string[]
}

export const toolsConfig: ToolConfig[] = [
  {
    id: 'fire',
    slug: 'fire-calculator',
    name: 'FIRE 계산기',
    nameEn: 'FIRE Calculator',
    description: '조기 은퇴 시점과 필요 자산을 계산합니다.',
    metaDescription: 'FIRE(조기 은퇴) 계산기로 필요한 순자산, 예상 은퇴 나이, 남은 기간을 무료로 계산하세요.',
    category: 'retirement',
    explanation: 'FIRE(Financial Independence, Retire Early)는 경제적 자유를 누리고 조기 은퇴하는 삶을 목표로 합니다. 4% 법칙에 따르면 연간 지출의 25배 자산이 있으면 그 금액의 4%를 연간 인출해 생활할 수 있다고 가정합니다. 이 계산기는 현재 자산·연 투자액·예상 수익률·연간 지출을 입력하면 FIRE에 도달하는 나이와 필요 순자산을 산출합니다.',
    formula: '필요 순자산 = 연간 지출 × 25 (4% 법칙)',
    faq: [
      { q: 'FIRE 25배 법칙이란?', a: '연간 지출의 25배 자산이 있으면, 연 4% 인출로 원금을 유지하면서 생활할 수 있다는 가정(4% 법칙)에서 유래합니다.' },
      { q: '예상 수익률은 어떻게 넣나요?', a: '주식·채권 등 장기 실질 수익률을 보수적으로 넣는 것이 좋습니다. 보통 5~7%를 많이 사용합니다.' },
    ],
    relatedToolIds: ['compound', 'dca', 'savings-goal'],
  },
  {
    id: 'averaging',
    slug: 'averaging-down-calculator',
    name: '평균 단가 계산기 (물타기 계산기)',
    nameEn: 'Averaging Down Calculator',
    description: '물타기·추가 매수 시 새로운 평균 단가를 계산합니다.',
    metaDescription: '물타기 계산기(평균 단가 계산기)로 추가 매수 후 새 평균 매입가를 무료로 계산하세요.',
    category: 'investment',
    explanation: '물타기(추가 매수·평단 낮추기)를 할 때 기존 보유 수량과 단가, 새로 매수한 수량과 단가를 넣으면 총 매수금액 ÷ 총 수량으로 새로운 평균 단가가 계산됩니다.',
    formula: '새 평균 단가 = (기존 평균가 × 기존 수량 + 추가 매수가 × 추가 수량) ÷ (기존 수량 + 추가 수량)',
    faq: [
      { q: '물타기 계산이란?', a: '물타기는 추가 매수로 평균 매입 단가를 낮추는 전략입니다. 이 계산기로 추가 매수 후 새 평균 단가를 바로 확인할 수 있습니다.' },
      { q: '평균 단가를 낮추는 게 좋을까요?', a: '종목 가치가 유지된다고 판단될 때만 평단을 낮추는 전략을 쓰는 것이 좋습니다. 가치가 나쁜 종목은 추가 매수보다 재평가가 필요할 수 있습니다.' },
    ],
    relatedToolIds: ['compound', 'dca', 'dividend'],
  },
  {
    id: 'compound',
    slug: 'compound-interest-calculator',
    name: '복리 계산기',
    nameEn: 'Compound Interest Calculator',
    description: '원금과 월 납입으로 미래 가치를 계산합니다.',
    metaDescription: '복리 계산기로 원금·월 납입·이자율을 넣어 미래 가치를 무료로 계산하세요.',
    category: 'investment',
    explanation: '복리는 이익이 다시 원금에 붙어 다음 이자를 계산하는 방식입니다. 원금에 매월 일정 금액을 더 넣고, 연 이자율을 적용했을 때 N년 후 얼마가 되는지 계산합니다.',
    formula: '미래가치 = 원금×(1+r)^n + 월납입×[((1+r)^n - 1) / r] (r=월 이자율, n=월 수)',
    faq: [
      { q: '연 이자율을 그대로 넣으면 되나요?', a: '네. 연 수익률을 %로 입력하면 됩니다. 월 단위로 복리 적용해 계산합니다.' },
    ],
    relatedToolIds: ['fire', 'dca', 'savings-goal'],
  },
  {
    id: 'dividend',
    slug: 'dividend-calculator',
    name: '배당 수익 계산기',
    nameEn: 'Dividend Income Calculator',
    description: '투자금과 배당 수익률로 연/월 배당금을 계산합니다.',
    metaDescription: '배당 수익 계산기로 투자금·배당 수익률을 넣어 연간·월간 배당금을 무료로 계산하세요.',
    category: 'investment',
    explanation: '투자 금액과 배당 수익률(연간 배당금 ÷ 주가 또는 시가총액 대비 배당 비율)을 입력하면 연간·월간 예상 배당금을 볼 수 있습니다.',
    formula: '연 배당금 = 투자금 × (배당 수익률 / 100), 월 배당금 = 연 배당금 ÷ 12',
    faq: [
      { q: '배당 수익률은 어디서 확인하나요?', a: '증권 앱이나 네이버 금융 등에서 해당 종목의 배당 수익률(%)을 확인할 수 있습니다.' },
    ],
    relatedToolIds: ['compound', 'averaging', 'dca'],
  },
  {
    id: 'dca',
    slug: 'dca-calculator',
    name: '정기 투자(DCA) 계산기',
    nameEn: 'DCA Calculator',
    description: '매월 정기 투자 시뮬레이션 결과를 확인합니다.',
    metaDescription: 'DCA(정기 투자) 계산기로 월 투자액·기간·예상 수익률을 넣어 시뮬레이션하세요.',
    category: 'investment',
    explanation: 'Dollar Cost Averaging(DCA)는 매월 일정 금액을 꾸준히 투자하는 방식입니다. 시장 등락과 관계없이 정해진 날에 투자해 평균 매입 단가를 분산시키는 효과가 있습니다.',
    formula: '원리합계에 가까운 계산: 총 투자원금 + 복리 수익. 매월 투자액이 동일하고 월 수익률로 복리 적용 시뮬레이션합니다.',
    faq: [
      { q: 'DCA와 랩섬의 차이는?', a: 'DCA는 나눠서 투자하고, 랩섬은 한 번에 투자하는 방식입니다. 장기적으로는 시장 상황에 따라 결과가 달라질 수 있습니다.' },
    ],
    relatedToolIds: ['compound', 'fire', 'averaging'],
  },
  {
    id: 'loan',
    slug: 'loan-calculator',
    name: '대출 이자 계산기',
    nameEn: 'Loan Calculator',
    description: '대출 원리금 상환액과 총 이자를 계산합니다.',
    metaDescription: '대출 이자 계산기로 대출금·이자율·기간을 넣어 월 상환액과 총 이자를 무료로 계산하세요.',
    category: 'loan',
    explanation: '원리금 균등 상환 방식으로, 대출 금액·연 이자율·대출 기간을 입력하면 매월 상환액과 전체 이자 합계를 계산합니다.',
    formula: '월 상환액 = P × [r(1+r)^n] / [(1+r)^n - 1] (P=대출원금, r=월 이자율, n=상환 개월 수)',
    faq: [
      { q: '이자율은 연이율인가요?', a: '네. 연 이자율(%)을 입력하면 월 이자율로 변환해 원리금 균등 상환액을 계산합니다.' },
    ],
    relatedToolIds: ['mortgage', 'savings-goal'],
  },
  {
    id: 'mortgage',
    slug: 'mortgage-calculator',
    name: '주택담보대출 계산기',
    nameEn: 'Mortgage Calculator',
    description: '주택담보대출 월 상환액을 계산합니다.',
    metaDescription: '주택담보대출 계산기로 집값·계약금·이자율·대출 기간을 넣어 월 상환액을 무료로 계산하세요.',
    category: 'loan',
    explanation: '주택 가격에서 계약금(선납)을 뺀 금액을 대출원금으로 하고, 이자율과 대출 기간으로 원리금 균등 상환 월액을 계산합니다.',
    formula: '대출원금 = 주택가격 - 계약금, 월 상환액 = 대출원금에 대한 원리금 균등 상환 공식 적용',
    faq: [
      { q: '중도 상환 수수료는 포함되나요?', a: '아니요. 월 상환액과 총 이자만 계산하며, 중도 상환 조건은 금융기관마다 다르므로 별도 확인이 필요합니다.' },
    ],
    relatedToolIds: ['loan', 'salary'],
  },
  {
    id: 'salary',
    slug: 'salary-calculator',
    name: '세후 연봉 계산기',
    nameEn: 'Salary After Tax Calculator',
    description: '세전 연봉과 세율로 세후 연봉·월급을 계산합니다.',
    metaDescription: '세후 연봉 계산기로 세전 연봉·세율을 넣어 실수령액·월급을 무료로 계산하세요.',
    category: 'salary',
    explanation: '세전 연봉과 적용할 세율(소득세·4대보험 등 통합 비율)을 입력하면 세후 연봉과 월 실수령액을 간단히 계산합니다. 정확한 세금은 국세청 등 공식 도구를 이용하세요.',
    formula: '세후 연봉 = 세전 연봉 × (1 - 세율/100), 월급 = 세후 연봉 ÷ 12',
    faq: [
      { q: '세율은 어떻게 정하나요?', a: '대략적인 평균 세율(예: 15~25%)을 넣거나, 본인 구간 세율을 참고해 입력하면 됩니다. 정확한 계산은 세무 신고/간이세액표를 이용하세요.' },
    ],
    relatedToolIds: ['mortgage', 'savings-goal', 'fire'],
  },
  {
    id: 'savings-goal',
    slug: 'savings-goal-calculator',
    name: '목표 자산 계산기',
    nameEn: 'Savings Goal Calculator',
    description: '목표 자산 도달까지 소요 기간을 계산합니다.',
    metaDescription: '목표 자산 계산기로 현재 자산·월 저축액·목표액·이자율을 넣어 도달 기간을 무료로 계산하세요.',
    category: 'savings',
    explanation: '현재 저축액에 매월 저축액을 더하고 이자(수익률)가 붙는다고 가정할 때, 목표 금액에 도달하는 데 걸리는 기간을 계산합니다.',
    formula: '복리·정기 납입 공식으로 목표금액 도달 시점(월 또는 년) 역산',
    faq: [
      { q: '이자율을 0으로 넣으면?', a: '이자 없이 매월 저축만 할 때 목표까지 걸리는 기간이 계산됩니다.' },
    ],
    relatedToolIds: ['compound', 'fire', 'dca'],
  },
  {
    id: 'inflation',
    slug: 'inflation-calculator',
    name: '인플레이션 계산기',
    nameEn: 'Inflation Calculator',
    description: '인플레이션을 반영한 미래 가치를 계산합니다.',
    metaDescription: '인플레이션 계산기로 현재 금액·인플레이션율·기간을 넣어 미래 가치를 무료로 계산하세요.',
    category: 'inflation',
    explanation: '물가가 매년 일정 비율로 오른다고 가정할 때, 현재 금액이 N년 후에는 얼마의 구매력에 해당하는지(명목 가치)를 계산합니다. 저축·목표 금액 설정 시 참고용으로 쓰세요.',
    formula: 'N년 후 명목 가치 = 현재 금액 × (1 + 인플레이션율/100)^N',
    faq: [
      { q: '인플레이션율은 어디서 참고하나요?', a: '한국은행이나 통계청의 소비자물가 상승률 등 장기 평균을 참고해 보수적으로 2~3%를 넣는 경우가 많습니다.' },
    ],
    relatedToolIds: ['compound', 'savings-goal', 'fire'],
  },
]
