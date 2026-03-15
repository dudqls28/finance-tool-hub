import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Seo } from '../components/Seo'
import { AdSlot } from '../components/AdSlot'
import { RelatedTools } from '../components/RelatedTools'
import { toolsConfig } from '../config/tools'
import { ToolContent } from '../tools/ToolContent'
import { trackCalculatorView } from '../utils/analytics'

export function ToolPage() {
  const { slug } = useParams<{ slug: string }>()
  const tool = toolsConfig.find((t) => t.slug === slug)

  useEffect(() => {
    if (tool) trackCalculatorView(tool.id, tool.name)
  }, [tool])

  if (!tool) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto max-w-2xl flex-1 px-4 py-12 text-center">
          <h1 className="text-xl font-semibold text-text">계산기를 찾을 수 없습니다</h1>
          <Link to="/" className="mt-4 inline-block text-primary hover:underline">
            홈으로 돌아가기
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Seo title={tool.name} description={tool.metaDescription} />
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <nav className="mb-4 text-sm text-slate-600" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary">홈</Link>
          <span className="mx-2">/</span>
          <Link to="/tools" className="hover:text-primary">계산기</Link>
          <span className="mx-2">/</span>
          <span className="text-text">{tool.name}</span>
        </nav>
        <h1 className="text-2xl font-bold text-text sm:text-3xl">{tool.name}</h1>
        <p className="mt-2 text-slate-600">{tool.description}</p>

        <div className="mt-8">
          <ToolContent toolId={tool.id} />
        </div>

        <AdSlot slotId={import.meta.env.VITE_ADSENSE_SLOT_RESULT} className="mt-6" />

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-text">이 계산기는 어떻게 쓰나요?</h2>
          <p className="mt-3 text-slate-700 leading-relaxed">{tool.explanation}</p>
        </section>

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-text">계산 공식</h2>
          <p className="mt-3 font-mono text-sm text-slate-700 bg-slate-50 p-3 rounded-lg">{tool.formula}</p>
        </section>

        <AdSlot slotId={import.meta.env.VITE_ADSENSE_SLOT_MID} className="mt-6" />

        {tool.faq.length > 0 && (
          <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-text">자주 묻는 질문</h2>
            <ul className="mt-4 space-y-4">
              {tool.faq.map((item, i) => (
                <li key={i}>
                  <h3 className="font-medium text-text">{item.q}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.a}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <AdSlot slotId={import.meta.env.VITE_ADSENSE_SLOT_RELATED} className="mt-6" />

        <RelatedTools relatedToolIds={tool.relatedToolIds} currentToolId={tool.id} />
      </main>
      <Footer />
    </div>
  )
}
