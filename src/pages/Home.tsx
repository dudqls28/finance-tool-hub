import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { CalculatorCard } from '../components/CalculatorCard'
import { Seo } from '../components/Seo'
import { toolsConfig } from '../config/tools'
import type { ToolConfig } from '../config/tools'

const HOME_TITLE = 'Finance Tool Hub'
const HOME_DESCRIPTION = 'FIRE, 복리, 배당, DCA, 대출 등 10가지 투자·재테크 계산기. 조기 은퇴 시점, 평균 단가, 월 상환액을 무료로 계산하세요.'

const CATEGORY_LABELS: Record<ToolConfig['category'], string> = {
  investment: '투자',
  retirement: '은퇴·FIRE',
  loan: '대출',
  salary: '연봉',
  savings: '저축',
  inflation: '인플레이션',
}

const WHY_USE_ITEMS = [
  {
    title: '무료로 사용',
    description: '회원가입 없이 모든 계산기를 무료로 이용할 수 있습니다.',
  },
  {
    title: '즉시 결과',
    description: '입력만 하면 바로 결과가 나와 빠르게 계획을 세울 수 있습니다.',
  },
  {
    title: '모바일 최적화',
    description: '휴대폰에서도 편하게 사용할 수 있도록 반응형으로 구성했습니다.',
  },
]

const HOME_FAQ = [
  { q: '계산기는 무료인가요?', a: '네. 모든 계산기는 무료이며 회원가입 없이 이용 가능합니다.' },
  { q: '입력한 데이터가 저장되나요?', a: '아니요. 입력값은 브라우저에만 있으며 서버로 전송·저장되지 않습니다.' },
  { q: '광고가 왜 보이나요?', a: '서비스 유지를 위해 Google AdSense 광고를 사용하고 있습니다. 불편을 드려 죄송합니다.' },
  { q: '계산 결과를 신뢰해도 될까요?', a: '참고용이며, 실제 금융 결정 시에는 전문가 상담이나 공식 자료를 확인하시기 바랍니다.' },
]

function groupByCategory(tools: ToolConfig[]) {
  const map = new Map<ToolConfig['category'], ToolConfig[]>()
  for (const tool of tools) {
    const list = map.get(tool.category) ?? []
    list.push(tool)
    map.set(tool.category, list)
  }
  const order: ToolConfig['category'][] = ['investment', 'retirement', 'loan', 'salary', 'savings', 'inflation']
  return order.filter((c) => map.has(c)).map((c) => ({ category: c, label: CATEGORY_LABELS[c], tools: map.get(c)! }))
}

export function Home() {
  const popularTools = toolsConfig.slice(0, 6)
  const featuredTools = [toolsConfig[0], toolsConfig[2], toolsConfig[4], toolsConfig[5]].filter(Boolean)
  const byCategory = groupByCategory(toolsConfig)

  return (
    <div className="flex min-h-screen flex-col">
      <Seo title={HOME_TITLE} description={HOME_DESCRIPTION} />
      <Header />
      <main className="flex-1">
        {/* 1. Hero Section */}
        <section className="border-b border-slate-200 bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
              투자·재테크 계산기
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              FIRE, 복리, 배당, DCA, 대출 등 10가지 금융 계산기로 계획을 세워보세요.
            </p>
          </div>
        </section>

        {/* 2. Popular Tools */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-xl font-semibold text-text">인기 계산기</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {popularTools.map((tool) => (
                <CalculatorCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        {/* 3. Categories */}
        <section className="border-t border-slate-200 bg-slate-50/50 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-xl font-semibold text-text">카테고리별 계산기</h2>
            <div className="mt-6 space-y-8">
              {byCategory.map(({ category, label, tools }) => (
                <div key={category}>
                  <h3 className="text-lg font-medium text-text">{label}</h3>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {tools.map((tool) => (
                      <CalculatorCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Why Use This Site */}
        <section className="border-t border-slate-200 bg-white py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-xl font-semibold text-text">왜 이 사이트를 사용할까요?</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {WHY_USE_ITEMS.map((item, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-slate-50/50 p-5">
                  <h3 className="font-semibold text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Featured Tools */}
        <section className="border-t border-slate-200 bg-slate-50/50 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-xl font-semibold text-text">추천 계산기</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredTools.map((tool) => (
                <CalculatorCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        {/* 6. FAQ */}
        <section className="border-t border-slate-200 bg-white py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-xl font-semibold text-text">자주 묻는 질문</h2>
            <ul className="mt-6 space-y-4">
              {HOME_FAQ.map((item, i) => (
                <li key={i} className="rounded-lg border border-slate-200 bg-slate-50/50 p-4">
                  <h3 className="font-medium text-text">{item.q}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.a}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
