import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { CalculatorCard } from '../components/CalculatorCard'
import { Seo } from '../components/Seo'
import { toolsConfig } from '../config/tools'
import type { ToolConfig } from '../config/tools'
import { useLocale } from '../contexts/LocaleContext'

const TOOLS_TITLE = '계산기 목록'
const TOOLS_DESCRIPTION_KO = 'Finance Tool Hub의 전체 계산기 목록입니다. 투자, 대출, 연봉, 저축, 인플레이션 계산기를 카테고리별로 확인하세요.'
const TOOLS_DESCRIPTION_EN = 'Browse all calculators on Finance Tool Hub by category: investment, loan, salary, savings, and inflation.'

const CATEGORY_LABELS_KO: Record<ToolConfig['category'], string> = {
  investment: '투자',
  retirement: '은퇴·FIRE',
  loan: '대출',
  salary: '연봉',
  savings: '저축',
  inflation: '인플레이션',
}

const CATEGORY_LABELS_EN: Record<ToolConfig['category'], string> = {
  investment: 'Investment',
  retirement: 'Retirement',
  loan: 'Loan',
  salary: 'Salary',
  savings: 'Savings',
  inflation: 'Inflation',
}

const labels = {
  heading: { ko: '전체 계산기', en: 'All calculators' },
  subheading: {
    ko: '카테고리별로 원하는 계산기를 빠르게 찾아보세요.',
    en: 'Find the calculator you need by category.',
  },
} as const

function groupByCategory(tools: ToolConfig[], locale: 'ko' | 'en') {
  const labelsMap = locale === 'en' ? CATEGORY_LABELS_EN : CATEGORY_LABELS_KO
  const map = new Map<ToolConfig['category'], ToolConfig[]>()
  for (const tool of tools) {
    const list = map.get(tool.category) ?? []
    list.push(tool)
    map.set(tool.category, list)
  }
  const order: ToolConfig['category'][] = ['investment', 'retirement', 'loan', 'salary', 'savings', 'inflation']
  return order
    .filter((category) => map.has(category))
    .map((category) => ({ category, label: labelsMap[category], tools: map.get(category)! }))
}

export function Tools() {
  const { locale } = useLocale()
  const byCategory = groupByCategory(toolsConfig, locale)
  const description = locale === 'en' ? TOOLS_DESCRIPTION_EN : TOOLS_DESCRIPTION_KO

  return (
    <div className="flex min-h-screen flex-col">
      <Seo title={TOOLS_TITLE} description={description} />
      <Header />
      <main className="flex-1">
        <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">{labels.heading[locale]}</h1>
            <p className="mt-3 text-slate-600">{labels.subheading[locale]}</p>
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="space-y-10">
              {byCategory.map(({ category, label, tools }) => (
                <section key={category}>
                  <h2 className="text-xl font-semibold text-text">{label}</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {tools.map((tool) => (
                      <CalculatorCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
