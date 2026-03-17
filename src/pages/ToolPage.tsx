import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Seo } from '../components/Seo'
import { AdSlot } from '../components/AdSlot'
import { RelatedTools } from '../components/RelatedTools'
import { toolsConfig } from '../config/tools'
import { ToolContent } from '../tools/ToolContent'
import { trackCalculatorView } from '../utils/analytics'
import { useLocale } from '../contexts/LocaleContext'

const toolPageLabels = {
  home: { ko: '홈', en: 'Home' },
  tools: { ko: '계산기', en: 'Calculators' },
  notFound: { ko: '계산기를 찾을 수 없습니다', en: 'Calculator not found' },
  backHome: { ko: '홈으로 돌아가기', en: 'Back to home' },
  howToUse: { ko: '이 계산기는 어떻게 쓰나요?', en: 'How does this calculator work?' },
  steps: {
    ko: ['입력값을 입력하세요.', '계산을 실행하세요.', '결과를 확인하세요.'],
    en: ['Enter the input values.', 'Run the calculation.', 'Check the results.'],
  },
  formula: { ko: '계산 공식', en: 'Formula' },
  example: { ko: '예시 계산', en: 'Example calculation' },
  faq: { ko: '자주 묻는 질문', en: 'FAQ' },
} as const

export function ToolPage() {
  const { slug } = useParams<{ slug: string }>()
  const { locale } = useLocale()
  const tool = toolsConfig.find((t) => t.slug === slug)

  const isEn = locale === 'en'
  const name = isEn ? tool?.nameEn : tool?.name
  const description = isEn ? tool?.descriptionEn : tool?.description
  const titleSuffix = isEn ? tool?.titleSuffixEn : tool?.titleSuffix
  const seoTitle = name && titleSuffix ? `${name} | ${titleSuffix}` : (name ?? tool?.name ?? '')
  const explanation = isEn ? tool?.explanationEn : tool?.explanation
  const formula = isEn ? tool?.formulaEn : tool?.formula
  const example = isEn ? tool?.exampleEn : tool?.example
  const faqList = isEn ? tool?.faqEn : tool?.faq

  useEffect(() => {
    if (tool) trackCalculatorView(tool.id, tool.name)
  }, [tool])

  if (!tool) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto max-w-2xl flex-1 px-4 py-12 text-center">
          <h1 className="text-xl font-semibold text-text">{toolPageLabels.notFound[locale]}</h1>
          <Link to="/" className="mt-4 inline-block text-primary hover:underline">
            {toolPageLabels.backHome[locale]}
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Seo title={seoTitle || tool.name} description={tool.metaDescription} />
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <nav className="mb-4 text-sm text-slate-600" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary">{toolPageLabels.home[locale]}</Link>
          <span className="mx-2">/</span>
          <Link to="/tools" className="hover:text-primary">{toolPageLabels.tools[locale]}</Link>
          <span className="mx-2">/</span>
          <span className="text-text">{name}</span>
        </nav>
        <h1 className="text-2xl font-bold text-text sm:text-3xl">{name}</h1>
        <p className="mt-2 text-slate-600">{description}</p>

        <div className="mt-8">
          <ToolContent toolId={tool.id} />
        </div>

        <AdSlot slotId={import.meta.env.VITE_ADSENSE_SLOT_RESULT} className="mt-6" />

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-text">{toolPageLabels.howToUse[locale]}</h2>
          <ol className="mt-3 list-decimal list-inside space-y-1 text-slate-700">
            {toolPageLabels.steps[locale].map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <p className="mt-4 text-slate-700 leading-relaxed">{explanation}</p>
        </section>

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-text">{toolPageLabels.formula[locale]}</h2>
          <p className="mt-3 font-mono text-sm text-slate-700 bg-slate-50 p-3 rounded-lg">{formula}</p>
        </section>

        {example && (
          <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-text">{toolPageLabels.example[locale]}</h2>
            <p className="mt-3 text-slate-700 leading-relaxed">{example}</p>
          </section>
        )}

        <AdSlot slotId={import.meta.env.VITE_ADSENSE_SLOT_MID} className="mt-6" />

        {faqList && faqList.length > 0 && (
          <>
            <Helmet>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: faqList.map((item) => ({
                      '@type': 'Question',
                      name: item.q,
                      acceptedAnswer: { '@type': 'Answer', text: item.a },
                    })),
                  }),
                }}
              />
            </Helmet>
            <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-text">{toolPageLabels.faq[locale]}</h2>
              <ul className="mt-4 space-y-4">
                {faqList.map((item, i) => (
                  <li key={i}>
                    <h3 className="font-medium text-text">{item.q}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.a}</p>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        <AdSlot slotId={import.meta.env.VITE_ADSENSE_SLOT_RELATED} className="mt-6" />

        <RelatedTools relatedToolIds={tool.relatedToolIds} currentToolId={tool.id} />
      </main>
      <Footer />
    </div>
  )
}
